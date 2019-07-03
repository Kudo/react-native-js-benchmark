#!/usr/bin/env python
import io
import os
import re
import subprocess

class AdbTool:
    @classmethod
    def wait_for_console_log(cls, regex):
        pattern = re.compile(r'ReactNativeJS: ' + regex)
        cmd = ['adb', 'logcat']
        with subprocess.Popen(cmd, stdout=subprocess.PIPE) as proc:
            for line_in_bytes in iter(proc.stdout.readline, ''):
                line = line_in_bytes.decode('utf8')
                search = pattern.search(line)
                if search is not None:
                    proc.terminate()
                    return search

    @classmethod
    def clear_log(cls):
        os.system('adb logcat -c')

    @classmethod
    def get_memory(cls, app_id):
        output = subprocess.check_output([
            'adb', 'shell', 'dumpsys', 'meminfo',
            'com.rnbenchmark.{}'.format(app_id)]).decode('utf8')

        with io.StringIO(output) as f:
            for line in f:
                if line.find('TOTAL') != -1:
                    columns = line.split()
                    if len(columns) >= 8:
                        return columns[1]
        return -1

    @classmethod
    def stop_app(cls, app_id):
        os.system('adb shell am force-stop com.rnbenchmark.{}'.format(app_id))
        os.system('adb shell am kill com.rnbenchmark.{}'.format(app_id))

    @classmethod
    def stop_apps(cls):
        cls.stop_app('jsc')
        cls.stop_app('v8')

    @classmethod
    def start_with_link(cls, app_id, path_with_query):
        os.system( \
'adb shell am start -a android.intent.action.VIEW -d "rnbench://{}{}"' \
' > /dev/null'
.format(app_id, path_with_query))

class ApkTool:
    @classmethod
    def reinstall(cls, app_id, abi=None):
        os.chdir('android')
        abi_prop = '--project-prop ABI={}'.format(abi) if abi else ''
        os.system( \
'./gradlew {abi_prop} :{app}:clean :{app}:uninstallRelease :{app}:installRelease'
.format(abi_prop=abi_prop, app=app_id))
        os.chdir('../')


class RenderComponentThroughput:
    def __init__(self, app_id, interval):
        self._app_id = app_id
        self._interval = interval

    def run(self):
        AdbTool.stop_apps()
        AdbTool.clear_log()
        AdbTool.start_with_link(
            self._app_id,
            '/RenderComponentThroughput?interval={}'.format(self._interval))
        result = AdbTool.wait_for_console_log(r'count=(\d+)').group(1)
        memory = AdbTool.get_memory(self._app_id)
        return (int(result), int(memory))

    def run_with_average(self, times):
        ret = {
            'result': 0,
            'memory': 0,
        }
        for _ in range(times):
            (result, memory) = self.run()
            ret['result'] += result
            ret['memory'] += memory

        # NOTE(kudo): Keeps thing simpler to trim as integer
        ret['result'] = int(ret['result'] / times)
        ret['memory'] = int(ret['memory'] / times)
        return ret


def main():
    abi='armeabi-v7a'
    ApkTool.reinstall('jsc', abi=abi)
    ApkTool.reinstall('v8', abi=abi)

    print('----------- Benchmark configs -----------')
    print('ABI: ' + abi or 'default')
    print('JSC version: ' + '245459.0.0')
    print('V8 version: ' + '7.5.1')
    print('\n\n')

    print('=========== RenderComponentThroughput 10s ===========')
    print('jsc', RenderComponentThroughput('jsc', 10000).run_with_average(3))
    print('v8', RenderComponentThroughput('v8', 10000).run_with_average(3))

    print('=========== RenderComponentThroughput 60s ===========')
    print('jsc', RenderComponentThroughput('jsc', 60000).run_with_average(3))
    print('v8', RenderComponentThroughput('v8', 60000).run_with_average(3))

    print('=========== RenderComponentThroughput 180s ===========')
    print('jsc', RenderComponentThroughput('jsc', 180000).run_with_average(3))
    print('v8', RenderComponentThroughput('v8', 180000).run_with_average(3))

    return 0

if __name__ == '__main__':
    root_dir = os.path.dirname(os.path.realpath(__file__))
    os.chdir(root_dir)
    main()
