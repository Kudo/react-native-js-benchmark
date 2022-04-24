JS_DISTS = {
    "jsc_250230": {
        "download_url": "https://registry.npmjs.org/jsc-android/-/jsc-android-250230.2.1.tgz",
        "version": "250230.2.1",
        "meta": ("Baseline JIT (but not x86)", "WebKitGTK 2.26.1"),
        "aar_glob": "**/android-jsc/**/*.aar",
        "binary_name": "libjsc.so",
        "maven_dist_path": "package/dist",
        "intl": False,
    },
    "v8_93_jit": {
        "download_url": "https://registry.npmjs.org/v8-android-jit/-/v8-android-jit-9.93.0.tgz",
        "version": "9.93.0",
        "meta": ("JIT", "V8 9.3.345.16"),
        "aar_glob": "**/*.aar",
        "binary_name": "libv8android.so",
        "maven_dist_path": "package/dist",
        "intl": True,
    },
    "hermes_0110": {
        "download_url": "https://registry.npmjs.org/hermes-engine/-/hermes-engine-0.11.0.tgz",
        "version": "0.11.0",
        "meta": ("JIT-less", "bytecode AOT"),
        "aar_glob": "**/android/hermes-release.aar",
        "binary_name": "libhermes.so",
        "maven_dist_path": "package/android",
        "intl": True,
    },
}
