#!/usr/bin/env python
import argparse
import glob
import io
import os
import re
import subprocess
import tempfile
from lib.colorful import colorful
from lib.logger import (get_logger, setup_logger)
from lib.section import (h1, h2)

ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

logger = get_logger(__name__)


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

    @classmethod
    def start_with_link(cls, app_id, path_with_query):
        os.system(
            'adb shell am start -a android.intent.action.VIEW -d "rnbench://{}{}"' \
' > /dev/null'
            .format(app_id, path_with_query))


class ApkTool:
    @classmethod
    def reinstall(cls, app_id, maven_repo_prop, abi=None):
        os.chdir('android')
        gradle_prop = '--project-prop ' + maven_repo_prop
        gradle_prop += ' --project-prop ABI={}'.format(abi) if abi else ''
        cmd = './gradlew {gradle_prop} \
:{app}:clean :{app}:uninstallRelease :{app}:installRelease'.format(
            gradle_prop=gradle_prop, app=app_id)
        logger.debug('reinstall - cmd: {}'.format(cmd))
        os.system(cmd)
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


class JSDistManager:
    STORE_DIST_DIR = os.path.join(ROOT_DIR, 'js_dist')
    DISTS = {
        'jsc_official_245459': {
            'download_url':
            'https://registry.npmjs.org/jsc-android/-/jsc-android-245459.0.0.tgz',
            'version':
            '245459.0.0',
            'meta': ('Baseline JIT (but not x86)', 'WebKitGTK 2.24.2',
                     'Support Intl'),
            'aar_glob':
            '**/android-jsc-intl/**/*.aar',
            'binary_name':
            'libjsc.so',
        },
        'v8_751': {
            'download_url':
            'https://registry.npmjs.org/v8-android/-/v8-android-7.5.1.tgz',
            'version':
            '7.5.1',
            'meta': ('JIT-less (but not arm64-v8a)', 'V8 7.5.288.23',
                     'Support Intl'),
            'aar_glob':
            '**/*.aar',
            'binary_name':
            'libv8.so',
        },
        'v8_751_jit': {
            'download_url':
            'https://registry.npmjs.org/v8-android/-/v8-android-7.5.1-jit.tgz',
            'version':
            '7.5.1',
            'meta': ('JIT', 'V8 7.5.288.23', 'Support Intl'),
            'aar_glob':
            '**/*.aar',
            'binary_name':
            'libv8.so',
        },
    }

    def __init__(self, dist_id):
        self._dist_id = dist_id
        self._dist_info = self.DISTS[dist_id]

    def prepare(self):
        js_dist_path = os.path.join(self.STORE_DIST_DIR, self._dist_id)
        maven_dist_path = os.path.join(js_dist_path, 'package', 'dist')
        if not os.path.isdir(maven_dist_path):
            logger.info('JSDistManager::prepare() - Download and extract\n')
            os.system('mkdir -p {}'.format(js_dist_path))
            self._download_dist(self._dist_info['download_url'], js_dist_path)
        return maven_dist_path

    def get_binary_size(self, abi=None):
        js_dist_path = os.path.join(self.STORE_DIST_DIR, self._dist_id)
        if not os.path.exists(js_dist_path):
            raise RuntimeError('js_dist_path is not existed - ' + js_dist_path)
        aar_paths = glob.glob(
            os.path.join(js_dist_path, self._dist_info['aar_glob']),
            recursive=True)
        if len(aar_paths) < 1:
            return -1
        aar_path = aar_paths[0]
        _abi = abi or 'armeabi-v7a'
        binary_path = os.path.join('jni', _abi, self._dist_info['binary_name'])
        output_file = tempfile.NamedTemporaryFile(delete=False)
        output_path = output_file.name
        output_file.close()
        cmd = 'unzip -p {aar_path} {binary_path} > {output_path}'.format(
            aar_path=aar_path,
            binary_path=binary_path,
            output_path=output_path)
        logger.debug('get_binary_size - cmd: {}'.format(cmd))
        os.system(cmd)
        size = os.path.getsize(output_path)
        self._strip_binary(output_path, _abi)
        size = os.path.getsize(output_path)
        os.unlink(output_path)
        return size

    @property
    def info(self):
        return self._dist_info

    @classmethod
    def _download_dist(cls, url, output_path):
        cmd = 'wget -O- "{url}" | tar x - -C "{output_path}"'.format(
            url=url, output_path=output_path)
        logger.debug('download_dist - cmd: {}'.format(cmd))
        os.system(cmd)

    @classmethod
    def _strip_binary(cls, file_path, abi):
        ndk_path = os.environ['NDK_PATH']
        if not ndk_path:
            raise RuntimeError('NDK_PATH environment variable is not defined.')

        mappings = {
            'armeabi-v7a': 'arm-linux-androideabi-*',
            'arm64-v8a': 'aarch64-linux-android-*',
            'x86': 'x86-*',
            'x86_64': 'x86_64-*',
        }
        strip_tool_paths = glob.glob(
            os.path.join(ndk_path, 'toolchains', mappings[abi], '**',
                         '*-strip'),
            recursive=True)
        if len(strip_tool_paths) < 1:
            raise RuntimeError('Unable to find strip from NDK toolchains')
        strip_tool_path = strip_tool_paths[0]
        cmd = strip_tool_path + ' ' + file_path
        logger.debug('strip_binary - cmd: {}'.format(cmd))
        os.system(cmd)


def show_configs(abi, jsc_dist_manager, v8_dist_manager):
    logger.info('ABI: ' + abi or 'default')
    logger.info('\n')

    logger.info('JSC version: {}\nJSC meta: {}\nJSC binary size: {}'.format(
        jsc_dist_manager.info['version'],
        ', '.join(jsc_dist_manager.info['meta']),
        jsc_dist_manager.get_binary_size(abi)))
    logger.info('\n')
    logger.info('V8 version: {}\nV8 meta: {}\nV8 binary size: {}'.format(
        v8_dist_manager.info['version'],
        ', '.join(v8_dist_manager.info['meta']),
        v8_dist_manager.get_binary_size(abi)))
    logger.info('\n\n')


def parse_args():
    arg_parser = argparse.ArgumentParser()

    arg_parser.add_argument(
        '--verbose', '-v', action='store_true', help='Enable verbose log')

    return arg_parser.parse_args()


def main():
    args = parse_args()
    setup_logger(logger, args.verbose)

    abi = 'armeabi-v7a'

    jsc_dist_manager = JSDistManager('jsc_official_245459')
    jsc_dist_manager.prepare()

    v8_dist_manager = JSDistManager('v8_751_jit')
    v8_dist_manager.prepare()

    logger.info(h1('Config'))
    show_configs(abi, jsc_dist_manager, v8_dist_manager)

    logger.info(h2('Install apps'))
    ApkTool.reinstall(
        'jsc', 'JSC_DIST_REPO=' + jsc_dist_manager.prepare(), abi=abi)
    ApkTool.reinstall(
        'v8', 'V8_DIST_REPO=' + v8_dist_manager.prepare(), abi=abi)

    logger.info(h2('RenderComponentThroughput 10s'))
    logger.info('jsc {}'.format(
        RenderComponentThroughput('jsc', 10000).run_with_average(3)))
    logger.info('v8 {}'.format(
        RenderComponentThroughput('v8', 10000).run_with_average(3)))

    logger.info(h2('RenderComponentThroughput 60s'))
    logger.info('jsc {}'.format(
        RenderComponentThroughput('jsc', 60000).run_with_average(3)))
    logger.info('v8 {}'.format(
        RenderComponentThroughput('v8', 60000).run_with_average(3)))

    logger.info(h2('RenderComponentThroughput 180s'))
    logger.info('jsc {}'.format(
        RenderComponentThroughput('jsc', 180000).run_with_average(3)))
    logger.info('v8 {}'.format(
        RenderComponentThroughput('v8', 180000).run_with_average(3)))

    return 0


if __name__ == '__main__':
    os.chdir(ROOT_DIR)
    main()
