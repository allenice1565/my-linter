module.exports = {
    root: true,
    ignorePatterns: [
        'cdn/*',
        'node_modules/*',
    ],
    env: {
        browser: true,
        es2021: true,
        node: true,
        commonjs: true
    },
    extends: ['prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 15,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true
        },
    },
    plugins: [],
    rules: {
        'linebreak-style': ['error', 'unix'],  // 强制使用Unix换行符 \n for LF
        'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    }
}
