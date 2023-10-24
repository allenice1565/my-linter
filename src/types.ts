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
    | 'nuxt'
    | 'nuxt/typescript'

export interface IConfig {
    eslintType: IEslintType
    npmType: 'npm' | 'yarn' | 'pnpm'
}
