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
 * 选择项目语言和框架
 */
const chooseNpmType = async (step: number): Promise<string> => {
    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: `Step ${step}. 请选择项目的语言（JS/TS）和框架（React/Vue）类型：`,
        choices: [
            { name: 'pnpm', value: 'pnpm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'npm', value: 'npm' },
        ],
    })
    return type
}

/** 通过终端交互获取项目配置选项 */
export const getConfig = async () => {
    let step = 0
    const config: IConfig = {
        // 选择项目类型
        eslintType: (await chooseEslintType(++step)) as IEslintType,
        npmType: (await chooseNpmType(++step)) as 'npm' | 'yarn' | 'pnpm',
    }
    return { config, step }
}
