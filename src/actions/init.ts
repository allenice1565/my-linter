import fs from 'fs-extra'
import path from 'path'
import log from '@utils/log'
import { PKG_NAME } from '@utils/constants'
import { getConfig } from '@utils/prompts'
import type { IConfig, PKG } from '@/types'
import { generateTemplates } from '@/utils/generate-templates'
import installDependencies from '@/utils/install-dependencies'
export default async () => {
    const cwd = process.cwd()
    const pkgPath = path.resolve(cwd, 'package.json')
    let pkg: PKG
    try {
        pkg = fs.readJSONSync(pkgPath)
    } catch (e) {
        log.error(`读取package.json失败，即将退出脚本！`)
        return
    }
    // 通过终端交互获取项目配置选项
    const configResult = await getConfig()
    const config: IConfig = configResult.config
    let step = configResult.step
    installDependencies(config)
    // 更新 pkg.json
    pkg = fs.readJSONSync(pkgPath)
    // 在 `package.json` 中写入 `scripts`
    if (!pkg.scripts) {
        pkg.scripts = {}
    }
    if (!pkg.scripts[`${PKG_NAME}-scan`]) {
        pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`
    }
    if (!pkg.scripts[`${PKG_NAME}-fix`]) {
        pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`
    }

    // 配置 commit 卡点
    log.info(`Step ${++step}. 配置 git commit 卡点`)
    if (!pkg.husky) pkg.husky = {}
    if (!pkg.husky.hooks) pkg.husky.hooks = {}
    pkg.husky.hooks['pre-commit'] = `${PKG_NAME} commit-file-scan`
    pkg.husky.hooks['commit-msg'] = `${PKG_NAME} commit-msg-scan`
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4))
    log.success(`Step ${step}. 配置 git commit 卡点成功 :D`)

    log.info(`Step ${++step}. 写入配置文件`)
    generateTemplates(config)
    log.success(`Step ${step}. 写入配置文件成功 :D`)
    // 完成信息
    const logs = [`${PKG_NAME} 初始化完成 :D`].join('\r\n')
    log.success(logs)
}
