#!/usr/bin/env python
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
    def reinstall(cls, app_id):
        os.chdir('android')
        os.system( \
'./gradlew :{app}:clean :{app}:uninstallRelease :{app}:installRelease'
.format(app=app_id))
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
        return result


def main():
    ApkTool.reinstall('jsc')
    ApkTool.reinstall('v8')

    for _ in range(3):
        print('=========== RenderComponentThroughput 10s ===========')
        print('jsc', RenderComponentThroughput('jsc', 10000).run())
        print('v8', RenderComponentThroughput('v8', 10000).run())

        print('=========== RenderComponentThroughput 60s ===========')
        print('jsc', RenderComponentThroughput('jsc', 60000).run())
        print('v8', RenderComponentThroughput('v8', 60000).run())

        print('=========== RenderComponentThroughput 180s ===========')
        print('jsc', RenderComponentThroughput('jsc', 180000).run())
        print('v8', RenderComponentThroughput('v8', 180000).run())

    return 0

if __name__ == '__main__':
    root_dir = os.path.dirname(os.path.realpath(__file__))
    os.chdir(root_dir)
    main()
