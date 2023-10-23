export interface PKG {
    eslintConfig?: any
    eslintIgnore?: string[]
    stylelint?: any
    peerDependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    dependencies?: Record<string, string>

    [key: string]: any
}
export type IEslintType =
    | 'vue'
    | 'vue/typescript'
    | 'node'
    | 'node/typescript'
    | 'react'
    | 'react/typescript'
    | 'nuxt'
    | 'nuxt/typescript'

export interface IConfig {
    eslintType: IEslintType
    // 是否启用 prettier
    enablePrettier: boolean
    // 是否启用 stylelint
    enableStylelint: boolean
    // 是否启用 markdown lint
    enableMarkdownlint: boolean
}
