import { Command } from 'commander'
import { PKG_NAME, PKG_VERSION } from './utils/constants'
import init from '@/actions/init'

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
    .option('--vscode', '写入.vscode/setting.json配置')
    .action(async () => {
        init()
    })

program.parse()
