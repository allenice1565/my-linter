import inquirer from 'inquirer'
import { PROJECT_TYPES } from '@utils/constants'
import type { InitOptions } from '@/types'

/**
 * 选择项目语言和框架
 */
const chooseEslintType = async (step: number): Promise<string> => {
    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: `Step ${step}. 请选择项目的语言（JS/TS）和框架（React/Vue）类型：`,
        choices: PROJECT_TYPES,
    })

    return type
}

/**
 * 选择是否启用 stylelint
 * @param defaultValue
 */
const chooseEnableStylelint = async ({
    defaultValue,
    step,
}: {
    defaultValue: boolean
    step: number
}): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${step}. 是否需要使用 stylelint（若没有样式文件则不需要）：`,
        default: defaultValue,
    })

    return enable
}

/**
 * 选择是否启用 markdownlint
 */
const chooseEnableMarkdownLint = async (step: number): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${step}. 是否需要使用 markdownlint（若没有 Markdown 文件则不需要）：`,
        default: true,
    })

    return enable
}

/**
 * 选择是否启用 prettier
 */
const chooseEnablePrettier = async (step: number): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${step}. 是否需要使用 Prettier 格式化代码：`,
        default: true,
    })

    return enable
}

/** 通过终端交互获取项目配置选项 */
export const getConfig = async (options: InitOptions = {}) => {
    let step = 0
    const config: Record<string, any> = {}
    // 初始化 `enableESLint`，默认为 true，无需让用户选择
    if (typeof options.enableESLint === 'boolean') {
        config.enableESLint = options.enableESLint
    } else {
        config.enableESLint = true
    }

    // 初始化 `eslintType`
    if (
        options.eslintType &&
        PROJECT_TYPES.find((choice) => choice.value === options.eslintType)
    ) {
        config.eslintType = options.eslintType
    } else {
        config.eslintType = await chooseEslintType(++step)
    }

    // 初始化 `enableStylelint`
    if (typeof options.enableStylelint === 'boolean') {
        config.enableESLint = options.enableStylelint
    } else {
        config.enableStylelint = await chooseEnableStylelint({
            defaultValue: !/node/.test(config.eslintType),
            step: ++step,
        })
    }

    // 初始化 `enableMarkdownlint`
    if (typeof options.enableMarkdownlint === 'boolean') {
        config.enableMarkdownlint = options.enableMarkdownlint
    } else {
        config.enableMarkdownlint = await chooseEnableMarkdownLint(++step)
    }

    // 初始化 `enablePrettier`
    if (typeof options.enablePrettier === 'boolean') {
        config.enablePrettier = options.enablePrettier
    } else {
        config.enablePrettier = await chooseEnablePrettier(++step)
    }

    return { config, step }
}
