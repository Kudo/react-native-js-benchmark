#!/usr/bin/env python
import argparse
import glob
import json
import os
import sys
import tempfile
from js_dists import JS_DISTS
from lib.colorful import colorful
from lib.logger import (get_logger, setup_logger)
from lib.section import (h1, h2)
from lib.tools import (AdbTool, ApkTool)

ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

logger = get_logger(__name__)


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


class TTI:
    def __init__(self, app_id, size):
        self._app_id = app_id
        self._size = size

    def run(self, apk_install_kwargs):
        data_file_path = os.path.join(ROOT_DIR, 'src', 'TTI', 'data.json')
        with self.PatchBundleContext(data_file_path, self._size):
            ApkTool.reinstall(**apk_install_kwargs)
            result = self._run_batch_with_average(3)
            logger.info('{app} {result}'.format(
                app=self._app_id, result=result))

    class PatchBundleContext:
        def __init__(self, data_file_path, size):
            self._data_file_path = data_file_path
            self._size = size

        def __enter__(self):
            os.rename(self._data_file_path, self._data_file_path + '.bak')
            with open(self._data_file_path, 'w') as f:
                f.write(self._generate_json_string(self._size))

        def _generate_json_string(self, size):
            data = {
                'description': 'GENERATE_FAKE_DATA',
                'size': size,
                'data': 'a' * size,
            }
            return json.dumps(data)

        def __exit__(self, type, value, traceback):
            os.rename(self._data_file_path + '.bak', self._data_file_path)

    @classmethod
    def _wait_for_tti_log(cls):
        return int(AdbTool.wait_for_log(r'TTI=(\d+)', 'MeasureTTI').group(1))

    @classmethod
    def _start(cls, app_id):
        os.system(
            'adb shell am start -a android.intent.action.VIEW -d "rnbench://{}/TTI" > /dev/null'
            .format(app_id))

    def _run_batch(self):
        AdbTool.stop_apps()
        AdbTool.clear_log()
        self._start(self._app_id)
        return self._wait_for_tti_log()

    def _run_batch_with_average(self, times):
        result = 0
        for _ in range(times):
            result += self._run_batch()
        result = int(result / times)
        return result


class JSDistManager:
    STORE_DIST_DIR = os.path.join(ROOT_DIR, 'js_dist')

    def __init__(self, dist_id):
        self._dist_id = dist_id
        self._dist_info = JS_DISTS[dist_id]

    def prepare(self):
        js_dist_path = os.path.join(self.STORE_DIST_DIR, self._dist_id)
        maven_dist_path = os.path.join(js_dist_path,
                                       self._dist_info['maven_dist_path'])
        if not os.path.isdir(maven_dist_path):
            logger.info('JSDistManager::prepare() - Download and extract\n')
            os.system('mkdir -p {}'.format(js_dist_path))
            self._download_dist(self._dist_info['download_url'], js_dist_path)
        return maven_dist_path

    def get_binary_size(self, abi):
        js_dist_path = os.path.join(self.STORE_DIST_DIR, self._dist_id)
        if not os.path.exists(js_dist_path):
            raise RuntimeError('js_dist_path is not existed - ' + js_dist_path)
        aar_paths = glob.glob(
            os.path.join(js_dist_path, self._dist_info['aar_glob']),
            recursive=True)
        if len(aar_paths) < 1:
            return -1
        aar_path = aar_paths[0]
        binary_path = os.path.join('jni', abi, self._dist_info['binary_name'])
        output_file = tempfile.NamedTemporaryFile(delete=False)
        output_path = output_file.name
        output_file.close()
        cmd = 'unzip -p {aar_path} {binary_path} > {output_path}'.format(
            aar_path=aar_path,
            binary_path=binary_path,
            output_path=output_path)
        logger.debug('get_binary_size - cmd: {}'.format(cmd))
        os.system(cmd)
        self._strip_binary(output_path, abi)
        size = round(float(os.path.getsize(output_path)) / 1024 / 1024, 2)
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


def show_configs(abis, jsc_dist_manager, v8_dist_manager, hermes_dist_manager):
    logger.info(h2('ABIs: {}'.format(', '.join(abis))))

    logger.info('JSC version: {}\nMeta: {}'.format(
        jsc_dist_manager.info['version'],
        ', '.join(jsc_dist_manager.info['meta'])))
    logger.info('Intl: {}'.format(jsc_dist_manager.info['intl']))
    logger.info('JSC binary size:')
    for abi in abis:
        logger.info('\t{}: {} MiB'.format(
            abi, jsc_dist_manager.get_binary_size(abi)))
    logger.info('\n')

    logger.info('V8 version: {}\nMeta: {}'.format(
        v8_dist_manager.info['version'],
        ', '.join(v8_dist_manager.info['meta'])))
    logger.info('Intl: {}'.format(v8_dist_manager.info['intl']))
    logger.info('V8 binary size:')
    for abi in abis:
        logger.info('\t{}: {} MiB'.format(
            abi, v8_dist_manager.get_binary_size(abi)))
    logger.info('\n')

    logger.info('Hermes version: {}\nMeta: {}'.format(
        hermes_dist_manager.info['version'],
        ', '.join(hermes_dist_manager.info['meta'])))
    logger.info('Intl: {}'.format(hermes_dist_manager.info['intl']))
    logger.info('Hermes binary size:')
    for abi in abis:
        logger.info('\t{}: {} MiB'.format(
            abi, hermes_dist_manager.get_binary_size(abi)))
    logger.info('\n')


def parse_args():
    arg_parser = argparse.ArgumentParser()

    arg_parser.add_argument(
        '--verbose', '-v', action='store_true', help='Enable verbose log')
    arg_parser.add_argument(
        '--all', '-a', action='store_true', help='Run all benchmarks')
    arg_parser.add_argument(
        '--config-only', action='store_true', help='Show JS dist config only')
    arg_parser.add_argument(
        'suites',
        nargs='*',
        help=
        'Benchmark suites to run - supported arguments: RenderComponentThroughput, TTI, ApkSize'
    )

    args = arg_parser.parse_args()
    if not any((args.all, args.config_only)) and len(args.suites) == 0:
        arg_parser.print_help()
        sys.exit(1)
    return args


class RenderComponentThroughputSuite:
    def run(self, jsc_apk_install_kwargs, v8_apk_install_kwargs,
            hermes_apk_install_kwargs):
        logger.info(h1('RenderComponentThroughput Suite'))
        ApkTool.reinstall(**jsc_apk_install_kwargs)
        ApkTool.reinstall(**v8_apk_install_kwargs)
        ApkTool.reinstall(**hermes_apk_install_kwargs)

        logger.info(h2('RenderComponentThroughput 10s'))
        logger.info('jsc {}'.format(
            RenderComponentThroughput('jsc', 10000).run_with_average(3)))
        logger.info('v8 {}'.format(
            RenderComponentThroughput('v8', 10000).run_with_average(3)))
        logger.info('hermes {}'.format(
            RenderComponentThroughput('hermes', 10000).run_with_average(3)))

        logger.info(h2('RenderComponentThroughput 60s'))
        logger.info('jsc {}'.format(
            RenderComponentThroughput('jsc', 60000).run_with_average(3)))
        logger.info('v8 {}'.format(
            RenderComponentThroughput('v8', 60000).run_with_average(3)))
        logger.info('hermes {}'.format(
            RenderComponentThroughput('hermes', 60000).run_with_average(3)))

        logger.info(h2('RenderComponentThroughput 180s'))
        logger.info('jsc {}'.format(
            RenderComponentThroughput('jsc', 180000).run_with_average(3)))
        logger.info('v8 {}'.format(
            RenderComponentThroughput('v8', 180000).run_with_average(3)))
        logger.info('hermes {}'.format(
            RenderComponentThroughput('hermes', 180000).run_with_average(3)))


class TTISuite:
    def run(self, jsc_apk_install_kwargs, v8_apk_install_kwargs,
            hermes_apk_install_kwargs):
        logger.info(h1('TTI Suite'))

        logger.info(h2('TTI 3MiB'))
        size = 1024 * 1024 * 3
        TTI('jsc', size).run(jsc_apk_install_kwargs)
        TTI('v8', size).run(v8_apk_install_kwargs)
        TTI('hermes', size).run(hermes_apk_install_kwargs)

        logger.info(h2('TTI 10MiB'))
        size = 1024 * 1024 * 10
        TTI('jsc', size).run(jsc_apk_install_kwargs)
        TTI('v8', size).run(v8_apk_install_kwargs)
        TTI('hermes', size).run(hermes_apk_install_kwargs)

        logger.info(h2('TTI 15MiB'))
        size = 1024 * 1024 * 15
        TTI('jsc', size).run(jsc_apk_install_kwargs)
        TTI('v8', size).run(v8_apk_install_kwargs)
        TTI('hermes', size).run(hermes_apk_install_kwargs)


class ApkSize:
    def run(self, jsc_apk_install_kwargs, v8_apk_install_kwargs,
            hermes_apk_install_kwargs):
        logger.info(h1('APK Size Suite'))

        apk_file = ApkTool.build(**jsc_apk_install_kwargs)
        size = round(float(os.path.getsize(apk_file)) / 1024 / 1024, 2)
        logger.info('jsc {} MiB'.format(size))

        apk_file = ApkTool.build(**v8_apk_install_kwargs)
        size = round(float(os.path.getsize(apk_file)) / 1024 / 1024, 2)
        logger.info('v8 {} MiB'.format(size))

        apk_file = ApkTool.build(**hermes_apk_install_kwargs)
        size = round(float(os.path.getsize(apk_file)) / 1024 / 1024, 2)
        logger.info('hermes {} MiB'.format(size))


def main():
    args = parse_args()
    setup_logger(args.verbose)

    suites = []
    if args.all or 'RenderComponentThroughput' in args.suites:
        suites.append(RenderComponentThroughputSuite())
    if args.all or 'TTI' in args.suites:
        suites.append(TTISuite())
    if args.all or 'ApkSize' in args.suites:
        suites.append(ApkSize())

    #  abis = ('armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64')
    abis = ('armeabi-v7a', )
    apk_abi = abis[0] if len(abis) == 1 else None

    jsc_dist_manager = JSDistManager('jsc_official_245459')
    jsc_dist_manager.prepare()

    v8_dist_manager = JSDistManager('v8_751')
    v8_dist_manager.prepare()

    hermes_dist_manager = JSDistManager('hermes_010')
    hermes_dist_manager.prepare()

    logger.info(h1('Config'))
    show_configs(abis, jsc_dist_manager, v8_dist_manager, hermes_dist_manager)

    jsc_apk_install_kwargs = {
        'app_id':
        'jsc',
        'maven_repo_prop':
        'MAVEN_REPO=' + jsc_dist_manager.prepare(),
        'abi':
        apk_abi,
        'verbose':
        args.verbose,
        'extra_gradle_props':
        ('INTL=true', ) if jsc_dist_manager.info.get('intl') else None,
    }

    v8_apk_install_kwargs = {
        'app_id': 'v8',
        'maven_repo_prop': 'MAVEN_REPO=' + v8_dist_manager.prepare(),
        'abi': apk_abi,
        'verbose': args.verbose,
    }

    hermes_apk_install_kwargs = {
        'app_id': 'hermes',
        'maven_repo_prop': 'MAVEN_REPO=' + hermes_dist_manager.prepare(),
        'abi': apk_abi,
        'verbose': args.verbose,
    }

    for suite in suites:
        suite.run(jsc_apk_install_kwargs, v8_apk_install_kwargs,
                  hermes_apk_install_kwargs)

    return 0


if __name__ == '__main__':
    os.chdir(ROOT_DIR)
    main()
