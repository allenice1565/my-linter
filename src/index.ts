import { Command } from 'commander'
import inquirer from 'inquirer'
// import ora from 'ora';
// import fs from 'fs-extra';
import { PKG_NAME, PKG_VERSION } from './utils/constants'
// const PKG_NAME = '1'

// const PKG_VERSION = '2'

const InitPrompts = [
    {
        name: 'description',
        message: 'please input description',
        default: '',
    },
    {
        name: 'author',
        message: 'please input author',
        default: '',
    },
]

const program = new Command()

program
    .name(PKG_NAME)
    .description(
        `${PKG_NAME} 是一套代码规范工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复，并为项目配置 git commit 卡点，降低项目实施规约的成本`
    )
    .version(PKG_VERSION)

program
    .command('init')
    .description(
        '一键接入：为项目初始化规约工具和配置，可以根据项目类型和需求进行定制'
    )
    .action(async () => {
        const initOptions = await inquirer.prompt(InitPrompts)
        console.log('initOptions', initOptions)
    })

program.parse()
console.log('完成')
