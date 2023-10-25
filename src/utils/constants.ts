import path from 'node:path'
import fs from 'fs-extra'
import { IEslintType } from '@/types'
import process from 'node:process'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const cwd = process.cwd()

// 读取 package.json
const packageJson: Record<string, any> = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
)

export enum UNICODE {
    success = '\u2714', // ✔
    failure = '\u2716', // ✖
}

/**
 * 包名
 */
export const PKG_NAME: string = packageJson.name

/**
 * 包版本号
 */
export const PKG_VERSION: string = packageJson.version

/**
 * 项目类型
 */
export const PROJECT_TYPES: Array<{
    name: string
    value: string
}> = [
    {
        name: 'nuxt 项目（TypeScript）',
        value: 'nuxt/typescript',
    },
    {
        name: 'nuxt 项目（JavaScript）',
        value: 'nuxt',
    },
    {
        name: 'Vue 项目（TypeScript）',
        value: 'vue/typescript',
    },
    {
        name: 'Vue 项目（JavaScript）',
        value: 'vue',
    },
    {
        name: 'Node.js 项目（TypeScript）',
        value: 'node/typescript',
    },
    {
        name: 'Node.js 项目（JavaScript）',
        value: 'node',
    },
]

/**
 * eslint 扫描文件扩展名
 */
export const ESLINT_FILE_EXT: string[] = ['.js', '.jsx', '.ts', '.tsx', '.vue']

/**
 * eslint 扫描忽略的文件或文件目录
 * 需要同步到 config/.eslintignore.ejs
 */
export const ESLINT_IGNORE_PATTERN: string[] = [
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
    'es/',
    'lib/',
    '**/*.min.js',
    '**/*-min.js',
    '**/*.bundle.js',
]

/**
 * stylelint 扫描文件扩展名
 */
export const STYLELINT_FILE_EXT: string[] = ['.css', '.scss', '.less', '.acss']

/**
 * stylelint 扫描忽略的文件或文件目录
 */
export const STYLELINT_IGNORE_PATTERN: string[] = [
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
    'es/',
    'lib/',
    '**/*.min.css',
    '**/*-min.css',
    '**/*.bundle.css',
]

/**
 * markdownLint 扫描文件扩展名
 */
export const MARKDOWN_LINT_FILE_EXT: string[] = ['.md']

/**
 * markdownLint 扫描忽略的文件或文件目录
 */
export const MARKDOWN_LINT_IGNORE_PATTERN: string[] = [
    'node_modules/',
    'build/',
    'dist/',
    'coverage/',
    'es/',
    'lib/',
]

/**
 * Prettier 扫描文件扩展名
 */
export const PRETTIER_FILE_EXT = [
    ...STYLELINT_FILE_EXT,
    ...ESLINT_FILE_EXT,
    ...MARKDOWN_LINT_FILE_EXT,
]

/**
 * Prettier 扫描忽略的文件或文件目录
 */
export const PRETTIER_IGNORE_PATTERN: string[] = [
    'node_modules/**/*',
    'build/**/*',
    'dist/**/*',
    'lib/**/*',
    'es/**/*',
    'coverage/**/*',
]

/**
 * Eslint 模板配置
 */
export const eslintConfigMap: Record<IEslintType, Record<string, any>> = {
    vue: {
        language: 'javascript',
        env: { browser: true },
        extendsList: [
            'plugin:vue/vue3-essential',
            'plugin:vue/vue3-recommended',
            'prettier',
        ],
        pluginsList: [],
        parser: 'vue-eslint-parser',
        parserOptions: {
            ecmaVersion: 15,
        },
    },
    'vue/typescript': {
        language: 'typescript',
        env: { browser: true },
        extendsList: [
            '@nuxtjs/eslint-config-typescript',
            'plugin:vue/vue3-essential',
            'plugin:vue/vue3-recommended',
            'prettier',
        ],
        pluginsList: [],
        parser: 'vue-eslint-parser',
        parserOptions: {
            ecmaVersion: 15,
        },
    },
    node: {
        language: 'javascript',
        env: { browser: true },
        extendsList: ['prettier'],
        pluginsList: [],
        parser: 'espree',
        parserOptions: {
            ecmaVersion: 15,
        },
    },
    'node/typescript': {
        language: 'javascript',
        env: { browser: true },
        extendsList: ['prettier'],
        pluginsList: [],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 15,
        },
    },
    nuxt: {
        language: 'javascript',
        env: { browser: true },
        extendsList: [
            'plugin:vue/vue3-essential',
            'plugin:vue/vue3-recommended',
            'prettier',
        ],
        pluginsList: [],
        parser: 'vue-eslint-parser',
        parserOptions: {
            ecmaVersion: 15,
        },
    },
    'nuxt/typescript': {
        language: 'javascript',
        env: { browser: true },
        extendsList: [
            '@nuxtjs/eslint-config-typescript',
            'plugin:vue/vue3-essential',
            'plugin:vue/vue3-recommended',
            'prettier',
        ],
        pluginsList: [],
        parser: 'vue-eslint-parser',
        parserOptions: {
            ecmaVersion: 15,
        },
    },
}

/**
 * 依赖包名称和版本
 */
export const dependenciesInfo: Array<Record<'name' | 'version', string>> = [
    { name: 'eslint', version: '8.52.0' },
    { name: 'espree', version: '9.6.1' },
    { name: 'prettier', version: '3.0.3' },
    { name: 'husky', version: '8.0.3' },
    { name: 'lint-staged', version: '15.0.2' },
    { name: 'commitlint', version: '18.0.0' },
    { name: '@commitlint/cli', version: '18.0.0' },
    { name: '@commitlint/config-conventional', version: '18.0.0' },
    { name: 'commitizen', version: '4.3.0' },
    { name: 'eslint-config-prettier', version: '9.0.0' },
    { name: 'vue-eslint-parser', version: '9.3.2' },
    { name: 'eslint-plugin-vue', version: '9.17.0' },
    { name: '@nuxtjs/eslint-config-typescript', version: '12.0.0' },
    { name: '@typescript-eslint/parser', version: '6.9.0' },
]
