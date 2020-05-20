JS_DISTS = {
    'jsc_official_245459': {
        'download_url':
        'https://registry.npmjs.org/jsc-android/-/jsc-android-245459.0.0.tgz',
        'version':
        '245459.0.0',
        'meta': ('Baseline JIT (but not x86)', 'WebKitGTK 2.24.2'),
        'aar_glob':
        '**/android-jsc/**/*.aar',
        'binary_name':
        'libjsc.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        False,
    },
    'jsc_250230': {
        'download_url':
        'https://registry.npmjs.org/@kudo-ci/jsc-android/-/jsc-android-250230.2.1.tgz',
        'version':
        '250230.2.0',
        'meta': ('Baseline JIT (but not x86)', 'WebKitGTK 2.26.1'),
        'aar_glob':
        '**/android-jsc/**/*.aar',
        'binary_name':
        'libjsc.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        False,
    },
    'v8_80_nointl': {
        'download_url':
        'https://registry.npmjs.org/v8-android-nointl/-/v8-android-nointl-8.80.1.tgz',
        'version':
        '8.80.1',
        'meta': ('JIT-less', 'V8 8.0.426.16'),
        'aar_glob':
        '**/*.aar',
        'binary_name':
        'libv8android.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        False,
    },
    'hermes_041': {
        'download_url':
        'https://registry.npmjs.org/hermes-engine/-/hermes-engine-0.4.1.tgz',
        'version':
        '0.4.1',
        'meta': ('JIT-less', 'bytecode precompile'),
        'aar_glob':
        '**/android/hermes-release.aar',
        'binary_name':
        'libhermes.so',
        'maven_dist_path':
        'package/android',
        'intl':
        False,
    },
}
