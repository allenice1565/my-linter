import { ESLint } from 'eslint'
import stylelint from 'stylelint'
import markdownlint from 'markdownlint'

export interface PKG {
    eslintConfig?: any
    eslintIgnore?: string[]
    stylelint?: any
    peerDependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    dependencies?: Record<string, string>

    [key: string]: any
}
export type IEslintType = 'vue' | 'vue/typescript' | 'node' | 'node/typescript' | 'react' | 'react/typescript' | 'nuxt' | 'nuxt/typescript'
export interface IConfig  {
    eslintType: IEslintType
    // 是否启用 prettier
    enablePrettier: boolean
    // 是否启用 stylelint
    enableStylelint: boolean
    // 是否启用 markdown lint
    enableMarkdownlint: boolean
}
export interface ScanOptions {
    // lint 运行的工程目录
    cwd: string
    // 进行规约扫描的目录
    include: string
    // 进行规约扫描的文件列表
    files?: string[]
    // 仅报告错误信息
    quiet?: boolean
    // 忽略 eslint 的 ignore 配置文件和 ignore 规则
    ignore?: boolean
    // 自动修复
    fix?: boolean
    // 生成报告文件
    outputReport?: boolean
    // scan 时指定 f2elint config，优先级高于 f2elint.config.js
    config?: Config
}

export interface ScanResult {
    filePath: string
    errorCount: number
    warningCount: number
    fixableErrorCount: number
    fixableWarningCount: number
    messages: Array<{
        line: number
        column: number
        rule: string
        url: string
        message: string
        errored: boolean
    }>
}

export interface ScanReport {
    results: ScanResult[]
    errorCount: number
    warningCount: number
    runErrors: Error[]
}

export interface IGetLintConfig {
    (options: ScanOptions, pkg: PKG, config: Config): ESLint.Options

    (options: ScanOptions, pkg: PKG, config: Config): stylelint.LinterOptions

    (options: ScanOptions, pkg: PKG, config: Config): markdownlint.Options
}

export interface IFormatResults {
    (results: ESLint.LintResult[], quiet: boolean): ScanResult[]
    (results: stylelint.LintResult[], quiet: boolean): ScanResult[]
    (results: markdownlint.LintResults, quiet: boolean): ScanResult[]
}
