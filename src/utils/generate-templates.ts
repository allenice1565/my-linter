import { IConfig } from 'src/types'
import ejs from 'ejs'
import path from 'path'
import fse from 'fs-extra'
import url from 'url'
import { eslintConfigMap, cwd } from './constants'
import { PKG_NAME } from './constants'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const generateTemplates = ({ eslintType }: IConfig) => {
    // 生成 .eslintrc.js
    renderTemplate(
        path.resolve(__dirname, './templates/.eslintrc.js.ejs'),
        path.resolve(cwd, '.eslintrc.js'),
        eslintConfigMap[eslintType]
    )

    // 生成 .prettierrc.js
    renderTemplate(
        path.resolve(__dirname, './templates/.prettierrc.ejs'),
        path.resolve(cwd, '.prettierrc')
    )
    // 添加编辑器配置
    renderTemplate(
        path.resolve(__dirname, './templates/.editorconfig.ejs'),
        path.resolve(cwd, '.editorconfig')
    )
    renderTemplate(
        path.resolve(__dirname, './templates/.vscode/settings.json.ejs'),
        path.resolve(cwd, '.vscode/settings.json')
    )
    renderTemplate(
        path.resolve(__dirname, './templates/commitlint.config.js.ejs'),
        path.resolve(cwd, 'commitlint.config.js'),
        { pkgName: PKG_NAME }
    )
}

function renderTemplate(
    templatePath: string,
    outputPath: string,
    ejsData: Record<string, any> = {}
) {
    const template = fse.readFileSync(templatePath, 'utf8')
    fse.outputFileSync(
        outputPath,
        ejs.render(template, ejsData, {
            escape: (str: string) => str,
        })
    )
}
