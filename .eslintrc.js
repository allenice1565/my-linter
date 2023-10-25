module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: ['.eslintrc.js', 'rollup.config.mjs', '**/*.ejs'],
    rules: {
        'linebreak-style': ['error', 'unix'], // 强制使用Unix换行符 \n for LF
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
    },
}
