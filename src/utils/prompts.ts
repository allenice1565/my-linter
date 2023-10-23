import inquirer from 'inquirer'
import { PROJECT_TYPES } from '@utils/constants'
import type { IConfig, IEslintType } from '@/types'

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
const chooseEnableStylelint = async (step: number): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${step}. 是否需要使用 stylelint（若没有样式文件则不需要）：`,
        default: false,
    })
    return enable
}

/**
 * 选择是否启用 markdownlint
 */
const chooseEnableMarkdownlint = async (step: number): Promise<boolean> => {
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
export const getConfig = async () => {
    let step = 0
    const config: IConfig = {
        // 选择项目类型
        eslintType: (await chooseEslintType(++step)) as IEslintType,
        // 是否添加prettier
        enablePrettier: await chooseEnablePrettier(++step),
        // 是否添加stylelint
        enableStylelint: await chooseEnableStylelint(++step),
        // 是否添加markdownlint
        enableMarkdownlint: await chooseEnableMarkdownlint(++step),
    }
    return { config, step }
}
