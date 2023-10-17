import path from 'path'
import fs from 'fs-extra'
import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// 读取 package.json
const packageJson: Record<string, any> = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
)

export const cwd = process.cwd()

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
    index: number
}> = [
    {
        index: 0,
        name: 'Vue 项目（JavaScript）',
        value: 'vue',
    },
    {
        index: 1,
        name: 'Vue 项目（TypeScript）',
        value: 'typescript/vue',
    },
    {
        index: 2,
        name: 'Node.js 项目（JavaScript）',
        value: 'node',
    },
    {
        index: 3,
        name: 'Node.js 项目（TypeScript）',
        value: 'typescript/node',
    },
    {
        index: 4,
        name: 'React 项目（JavaScript）',
        value: 'react',
    },
    {
        index: 5,
        name: 'React 项目（TypeScript）',
        value: 'typescript/react',
    },
    {
        index: 6,
        name: 'React 项目（JavaScript）',
        value: 'nuxt',
    },
    {
        index: 7,
        name: 'React 项目（TypeScript）',
        value: 'typescript/nuxt',
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
