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
    'jsc_official_245459_intl': {
        'download_url':
        'https://registry.npmjs.org/jsc-android/-/jsc-android-245459.0.0.tgz',
        'version':
        '245459.0.0',
        'meta': ('Baseline JIT (but not x86)', 'WebKitGTK 2.24.2'),
        'aar_glob':
        '**/android-jsc-intl/**/*.aar',
        'binary_name':
        'libjsc.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        True,
    },
    'jsc_245459_no_jit': {
        'download_url':
        'https://registry.npmjs.org/@kudo-ci/jsc-android/-/jsc-android-245459.0.0-no-jit.tgz',
        'version':
        '245459.0.0-no-jit',
        'meta': ('JIT-less', 'WebKitGTK 2.24.2'),
        'aar_glob':
        '**/android-jsc/**/*.aar',
        'binary_name':
        'libjsc.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        False,
    },
    'v8_751': {
        'download_url':
        'https://registry.npmjs.org/v8-android/-/v8-android-7.5.1.tgz',
        'version':
        '7.5.1',
        'meta': ('JIT-less (but not arm64-v8a)', 'V8 7.5.288.23'),
        'aar_glob':
        '**/*.aar',
        'binary_name':
        'libv8.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        True,
    },
    'v8_751_nointl': {
        'download_url':
        'https://registry.npmjs.org/v8-android-nointl/-/v8-android-nointl-7.5.1.tgz',
        'version':
        '7.5.1',
        'meta': ('JIT-less (but not arm64-v8a)', 'V8 7.5.288.23'),
        'aar_glob':
        '**/*.aar',
        'binary_name':
        'libv8.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        False,
    },
    'v8_751_jit': {
        'download_url':
        'https://registry.npmjs.org/v8-android/-/v8-android-7.5.1-jit.tgz',
        'version':
        '7.5.1',
        'meta': ('JIT', 'V8 7.5.288.23'),
        'aar_glob':
        '**/*.aar',
        'binary_name':
        'libv8.so',
        'maven_dist_path':
        'package/dist',
        'intl':
        True,
    },
    'hermes_010': {
        'download_url':
        'https://registry.npmjs.org/hermesvm/-/hermesvm-0.1.0.tgz',
        'version':
        '0.1.0',
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
    'hermes_011': {
        'download_url':
        'https://registry.npmjs.org/hermesvm/-/hermesvm-0.1.1.tgz',
        'version':
        '0.1.1',
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
