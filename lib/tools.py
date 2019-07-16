import io
import os
import re
import shlex
import subprocess
from .logger import get_logger

logger = get_logger(__name__)


class AdbTool:
    @classmethod
    def wait_for_log(cls, regex, tag):
        pattern = re.compile(tag + r': ' + regex)
        cmd = ['adb', 'logcat']
        with subprocess.Popen(cmd, stdout=subprocess.PIPE) as proc:
            for line_in_bytes in iter(proc.stdout.readline, ''):
                line = line_in_bytes.decode('utf8')
                search = pattern.search(line)
                if search is not None:
                    proc.terminate()
                    return search

    @classmethod
    def wait_for_console_log(cls, regex):
        return cls.wait_for_log(regex, 'ReactNativeJS')

    @classmethod
    def clear_log(cls):
        os.system('adb logcat -c')

    @classmethod
    def get_memory(cls, app_id):
        output = subprocess.check_output([
            'adb', 'shell', 'dumpsys', 'meminfo',
            'com.rnbenchmark.{}'.format(app_id)
        ]).decode('utf8')

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
        cls.stop_app('hermes')

    @classmethod
    def start_with_link(cls, app_id, path_with_query):
        os.system(
            'adb shell am start -a android.intent.action.VIEW -d "rnbench://{}{}"' \
' > /dev/null'
            .format(app_id, path_with_query))


class ApkTool:
    @classmethod
    def reinstall(cls,
                  app_id=None,
                  maven_repo_prop=None,
                  abi=None,
                  verbose=False):
        assert app_id
        assert maven_repo_prop

        os.chdir('android')
        gradle_prop = ''
        if verbose:
            gradle_prop += '-q '
        gradle_prop += '--project-prop ' + maven_repo_prop
        gradle_prop += ' --project-prop ABI={}'.format(abi) if abi else ''
        cmd = './gradlew {gradle_prop} \
:{app}:clean :{app}:uninstallRelease :{app}:installRelease'.format(
            gradle_prop=gradle_prop, app=app_id)
        logger.debug('reinstall - cmd: {}'.format(cmd))
        stdout = subprocess.DEVNULL if not verbose else None
        stderr = subprocess.DEVNULL if not verbose else None
        subprocess.run(shlex.split(cmd), stdout=stdout, stderr=stderr)
        os.chdir('../')
