#!/usr/bin/env python
import argparse
from gettext import install
import glob
import json
import os
import sys
import tempfile
import typing
from js_dists import JS_DISTS
from lib.colorful import colorful
from lib.logger import get_logger, setup_logger
from lib.section import h1, h2
from lib.tools import AdbTool, ApkTool
from lib.types import InstallProps


ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

logger = get_logger(__name__)


class RenderComponentThroughput:
    def __init__(self, name, app_id, interval):
        self._name = name
        self._app_id = app_id
        self._interval = interval

    def run(self):
        AdbTool.stop_apps()
        AdbTool.clear_log()
        AdbTool.start_with_link(
            self._app_id,
            "/RenderComponentThroughput?interval={}".format(self._interval),
        )
        result = AdbTool.wait_for_console_log(r"count=(\d+)").group(1)
        memory = AdbTool.get_memory(self._app_id)
        return (int(result), int(memory))

    def run_with_average(self, times):
        ret = {
            "result": 0,
            "memory": 0,
        }
        for _ in range(times):
            (result, memory) = self.run()
            ret["result"] += result
            ret["memory"] += memory

        # NOTE(kudo): Keeps thing simpler to trim as integer
        ret["result"] = int(ret["result"] / times)
        ret["memory"] = int(ret["memory"] / times)
        return ret


class RenderComponentMemory:
    def __init__(self, name, app_id, total_count):
        self._name = name
        self._app_id = app_id
        self._total_count = total_count

    def run(self):
        AdbTool.stop_apps()
        AdbTool.clear_log()
        AdbTool.start_with_link(
            self._app_id,
            "/RenderComponentMemory?totalCount={}".format(self._total_count),
        )
        result = AdbTool.wait_for_console_log(r"count=(\d+)").group(1)
        memory = AdbTool.get_memory(self._app_id)
        return (int(result), int(memory))

    def run_with_average(self, times):
        ret = {
            "result": 0,
            "memory": 0,
        }
        for _ in range(times):
            (result, memory) = self.run()
            ret["result"] += result
            ret["memory"] += memory

        # NOTE(kudo): Keeps thing simpler to trim as integer
        ret["result"] = int(ret["result"] / times)
        ret["memory"] = int(ret["memory"] / times)
        return ret


class TTI:
    def __init__(self, name, app_id, size):
        self._name = name
        self._app_id = app_id
        self._size = size

    def run(self, apk_install_kwargs):
        data_file_path = os.path.join(ROOT_DIR, "src", "TTI", "data.json")
        with self.PatchBundleContext(data_file_path, self._size):
            ApkTool.reinstall(**apk_install_kwargs)
            result = self._run_batch_with_average(3)
            logger.info(
                "{app} tti={tti}, assets_size={assets_size} MiB".format(
                    app=self._name,
                    tti=result["tti"],
                    assets_size=result["assets_size"],
                )
            )

    class PatchBundleContext:
        def __init__(self, data_file_path, size):
            self._data_file_path = data_file_path
            self._size = size

        def __enter__(self):
            os.rename(self._data_file_path, self._data_file_path + ".bak")
            with open(self._data_file_path, "w") as f:
                f.write(self._generate_json_string(self._size))

        def _generate_json_string(self, size):
            data = {
                "description": "GENERATE_FAKE_DATA",
                "size": size,
                "data": "a" * size,
            }
            return json.dumps(data)

        def __exit__(self, type, value, traceback):
            os.rename(self._data_file_path + ".bak", self._data_file_path)

    @classmethod
    def _wait_for_tti_log(cls):
        return int(AdbTool.wait_for_log(r"TTI=(\d+)", "MeasureTTI").group(1))

    @classmethod
    def _start(cls, app_id):
        os.system(
            'adb shell am start -a android.intent.action.VIEW -d "rnbench://{}/TTI" > /dev/null'.format(
                app_id
            )
        )

    def _run_batch(self):
        AdbTool.stop_apps()
        AdbTool.clear_log()
        self._start(self._app_id)
        return self._wait_for_tti_log()

    def _run_batch_with_average(self, times):
        result = {
            "tti": 0,
            "assets_size": 0,
        }
        for _ in range(times):
            result["tti"] += self._run_batch()
            result["assets_size"] += ApkTool.get_assets_size(self._app_id)
        result["tti"] = int(result["tti"] / times)
        result["assets_size"] = round((result["assets_size"] / times) / 1024 / 1024, 2)
        return result


class JSDistManager:
    STORE_DIST_DIR = os.path.join(ROOT_DIR, "js_dist")

    def __init__(self, **kwargs):
        self.name = kwargs["name"]
        self.app_id = kwargs["app_id"]
        self._dist_id = kwargs["dist_id"]
        self._dist_info = JS_DISTS[self._dist_id]
        self._extra_gradle_props = kwargs.get("extra_gradle_props", [])
        self.install_props: typing.Optional[InstallProps] = None

    def prepare(self):
        js_dist_path = os.path.join(self.STORE_DIST_DIR, self._dist_id)
        maven_dist_path = os.path.join(js_dist_path, self._dist_info["maven_dist_path"])
        if not os.path.isdir(maven_dist_path):
            logger.info("JSDistManager::prepare() - Download and extract\n")
            os.system("mkdir -p {}".format(js_dist_path))
            self._download_dist(self._dist_info["download_url"], js_dist_path)
        return maven_dist_path

    def create_install_props(self, abi: str, verbose: bool) -> InstallProps:
        if self.install_props is not None:
            return self.install_props

        extra_gradle_props: list[str] = self._extra_gradle_props
        if self.app_id == "v8":
            extra_gradle_props.append(
                "v8.android.dir={}".format(os.path.dirname(self.prepare()))
            )
        if self.info.get("intl"):
            extra_gradle_props.append("INTL=true")

        self.install_props = {
            "app_id": self.app_id,
            "abi": abi,
            "verbose": verbose,
            "maven_repo_prop": "MAVEN_REPO=" + self.prepare(),
            "extra_gradle_props": extra_gradle_props,
        }
        return self.install_props

    def get_binary_size(self, abi):
        js_dist_path = os.path.join(self.STORE_DIST_DIR, self._dist_id)
        if not os.path.exists(js_dist_path):
            raise RuntimeError("js_dist_path is not existed - " + js_dist_path)
        aar_paths = glob.glob(
            os.path.join(js_dist_path, self._dist_info["aar_glob"]), recursive=True
        )
        if len(aar_paths) < 1:
            return -1
        aar_path = aar_paths[0]
        binary_path = os.path.join("jni", abi, self._dist_info["binary_name"])
        output_file = tempfile.NamedTemporaryFile(delete=False)
        output_path = output_file.name
        output_file.close()
        cmd = "unzip -p {aar_path} {binary_path} > {output_path}".format(
            aar_path=aar_path, binary_path=binary_path, output_path=output_path
        )
        logger.debug("get_binary_size - cmd: {}".format(cmd))
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
            url=url, output_path=output_path
        )
        logger.debug("download_dist - cmd: {}".format(cmd))
        os.system(cmd)

    @classmethod
    def _strip_binary(cls, file_path, abi):
        ndk_path = os.environ["ANDROID_NDK_HOME"]
        if not ndk_path:
            raise RuntimeError("ANDROID_NDK_HOME environment variable is not defined.")

        mappings = {
            "armeabi-v7a": "arm-linux-androideabi-*",
            "arm64-v8a": "aarch64-linux-android-*",
            "x86": "x86-*",
            "x86_64": "x86_64-*",
        }
        strip_tool_paths = glob.glob(
            os.path.join(ndk_path, "toolchains", mappings[abi], "**", "*-strip"),
            recursive=True,
        )
        if len(strip_tool_paths) < 1:
            raise RuntimeError("Unable to find strip from NDK toolchains")
        strip_tool_path = strip_tool_paths[0]
        cmd = strip_tool_path + " " + file_path
        logger.debug("strip_binary - cmd: {}".format(cmd))
        os.system(cmd)


def show_configs(abis, js_dist_managers: list[JSDistManager]):
    logger.info(h2("ABIs: {}".format(", ".join(abis))))

    for dist in js_dist_managers:
        logger.info("# {}\n".format(dist.name))
        logger.info(
            "version: {}\nmeta: {}".format(
                dist.info["version"], ", ".join(dist.info["meta"])
            )
        )
        logger.info("Intl: {}".format(dist.info["intl"]))
        logger.info("binary size:")
        for abi in abis:
            logger.info("\t{}: {} MiB".format(abi, dist.get_binary_size(abi)))
        logger.info("\n")


def parse_args():
    arg_parser = argparse.ArgumentParser()

    arg_parser.add_argument(
        "--verbose", "-v", action="store_true", help="Enable verbose log"
    )
    arg_parser.add_argument(
        "--all", "-a", action="store_true", help="Run all benchmarks"
    )
    arg_parser.add_argument(
        "--config-only", action="store_true", help="Show JS dist config only"
    )
    arg_parser.add_argument(
        "suites",
        nargs="*",
        help="Benchmark suites to run - supported arguments: RenderComponentThroughput, RenderComponentMemory, TTI, ApkSize",
    )

    args = arg_parser.parse_args()
    if not any((args.all, args.config_only)) and len(args.suites) == 0:
        arg_parser.print_help()
        sys.exit(1)
    return args


class RenderComponentThroughputSuite:
    def run(self, js_dist_managers: list[JSDistManager]):
        logger.info(h1("RenderComponentThroughput Suite"))

        logger.info(h2("RenderComponentThroughput 10s"))
        for dist in js_dist_managers:
            ApkTool.reinstall(**dist.install_props)
            logger.info(
                "{} {}".format(
                    dist.name,
                    RenderComponentThroughput(
                        dist.name, dist.app_id, 10000
                    ).run_with_average(3),
                )
            )

        logger.info(h2("RenderComponentThroughput 60s"))
        for dist in js_dist_managers:
            ApkTool.reinstall(**dist.install_props)
            logger.info(
                "{} {}".format(
                    dist.name,
                    RenderComponentThroughput(
                        dist.name, dist.app_id, 60000
                    ).run_with_average(3),
                )
            )

        logger.info(h2("RenderComponentThroughput 180s"))
        for dist in js_dist_managers:
            ApkTool.reinstall(**dist.install_props)
            logger.info(
                "{} {}".format(
                    dist.name,
                    RenderComponentThroughput(
                        dist.name, dist.app_id, 180000
                    ).run_with_average(3),
                )
            )


class RenderComponentMemorySuite:
    def run(self, js_dist_managers: list[JSDistManager]):
        logger.info(h1("RenderComponentMemory Suite"))

        logger.info(h2("RenderComponentMemory 100 items"))
        for dist in js_dist_managers:
            ApkTool.reinstall(**dist.install_props)
            logger.info(
                "{} {}".format(
                    dist.name,
                    RenderComponentMemory(dist.name, dist.app_id, 100).run_with_average(
                        3
                    ),
                )
            )
        logger.info(h2("RenderComponentMemory 1000 items"))
        for dist in js_dist_managers:
            ApkTool.reinstall(**dist.install_props)
            logger.info(
                "{} {}".format(
                    dist.name,
                    RenderComponentMemory(
                        dist.name, dist.app_id, 1000
                    ).run_with_average(3),
                )
            )
        logger.info(h2("RenderComponentMemory 3000 items"))
        for dist in js_dist_managers:
            ApkTool.reinstall(**dist.install_props)
            logger.info(
                "{} {}".format(
                    dist.name,
                    RenderComponentMemory(
                        dist.name, dist.app_id, 3000
                    ).run_with_average(3),
                )
            )


class TTISuite:
    def run(self, js_dist_managers: list[JSDistManager]):
        logger.info(h1("TTI Suite"))

        logger.info(h2("TTI 3MiB"))
        size = 1024 * 1024 * 3
        for dist in js_dist_managers:
            TTI(dist.name, dist.app_id, size).run(dist.install_props)

        logger.info(h2("TTI 10MiB"))
        size = 1024 * 1024 * 10
        for dist in js_dist_managers:
            TTI(dist.name, dist.app_id, size).run(dist.install_props)

        logger.info(h2("TTI 15MiB"))
        size = 1024 * 1024 * 15
        for dist in js_dist_managers:
            TTI(dist.name, dist.app_id, size).run(dist.install_props)


class ApkSize:
    def run(self, js_dist_managers: list[JSDistManager]):
        logger.info(h1("APK Size Suite"))

        for dist in js_dist_managers:
            install_props = dist.install_props
            apk_file = ApkTool.build(**install_props)
            size = round(float(os.path.getsize(apk_file)) / 1024 / 1024, 2)
            logger.info("{} {} MiB".format(dist.name, size))


def main():
    args = parse_args()
    setup_logger(args.verbose)

    suites = []
    if args.all or "RenderComponentThroughput" in args.suites:
        suites.append(RenderComponentThroughputSuite())
    if args.all or "RenderComponentMemory" in args.suites:
        suites.append(RenderComponentMemorySuite())
    if args.all or "TTI" in args.suites:
        suites.append(TTISuite())
    if args.all or "ApkSize" in args.suites:
        suites.append(ApkSize())

    abis = ("armeabi-v7a", "arm64-v8a", "x86", "x86_64")
    # abis = ("arm64-v8a",)
    apk_abi = abis[0] if len(abis) == 1 else None

    js_dist_managers = [
        JSDistManager(name="jsc", app_id="jsc", dist_id="jsc_250230"),
        JSDistManager(name="v8-android-jit", app_id="v8", dist_id="v8_100_jit"),
        JSDistManager(name="v8-android-nointl", app_id="v8", dist_id="v8_100_nointl"),
        # JSDistManager(
        #     name="v8-android-jit + normal codecache",
        #     app_id="v8",
        #     dist_id="v8_100_jit",
        #     extra_gradle_props=[
        #         "v8.cacheMode=normal",
        #     ],
        # ),
        # JSDistManager(
        #     name="v8-android-jit + prebuilt cache",
        #     app_id="v8",
        #     dist_id="v8_100_jit",
        #     extra_gradle_props=[
        #         "v8.cacheMode=prebuilt",
        #         # TODO: tools should be in js_dists for versioning
        #         "v8.android.tools.dir={}".format(
        #             os.path.join(
        #                 ROOT_DIR,
        #                 "node_modules",
        #                 "v8-android-tools-macos",
        #                 "v8-android-jit",
        #             )
        #         ),
        #     ],
        # ),
        # JSDistManager(
        #     name="v8-android-jit + cache with stub bundle",
        #     app_id="v8",
        #     dist_id="v8_100_jit",
        #     extra_gradle_props=[
        #         "v8.cacheMode=normalWithStubBundle",
        #     ],
        # ),
        JSDistManager(name="hermes", app_id="hermes", dist_id="hermes_0110"),
    ]
    for dist in js_dist_managers:
        dist.prepare()
        dist.create_install_props(abi=apk_abi, verbose=args.verbose)

    logger.info(h1("Config"))
    show_configs(abis, js_dist_managers)

    for suite in suites:
        suite.run(js_dist_managers)

    return 0


if __name__ == "__main__":
    os.chdir(ROOT_DIR)
    main()
