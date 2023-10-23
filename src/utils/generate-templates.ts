import { IConfig } from 'src/types'
import ejs from 'ejs'
import path from 'path'
import fse from 'fs-extra'
import url from 'url'
import { cwd } from 'node:process'
import { eslintConfigMap } from './constants'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const generateTemplates = ({
    eslintType,
    enablePrettier,
    enableStylelint,
    enableMarkdownlint,
}: IConfig) => {
    // 生成 .eslintrc.js
    renderTemplate(
        path.resolve(__dirname, '../templates/.eslintrc.js.ejs'),
        path.resolve(cwd(), './.eslintrc.js'),
        eslintConfigMap[eslintType]
    )

    if (enablePrettier) {
        // 生成 .prettierrc.js
        renderTemplate(
            path.resolve(__dirname, '../templates/.prettierrc.ejs'),
            path.resolve(cwd(), './.prettierrc'),
            eslintConfigMap[eslintType]
        )
    }
    if (enableStylelint) {
        // renderTemplate(
        //     path.resolve(__dirname, '../templates/.eslintrc.js.ejs'),
        //     path.resolve(cwd(), './.eslintrc.js'),
        // )
    }
    if (enableMarkdownlint) {
        // renderTemplate(
        //     path.resolve(__dirname, '../templates/.eslintrc.js.ejs'),
        //     path.resolve(cwd(), './.eslintrc.js'),
        // )
    }
    // 添加编辑器配置
    renderTemplate(
        path.resolve(__dirname, '../templates/.editorconfig.ejs'),
        path.resolve(cwd(), './.editorconfig')
    )
    renderTemplate(
        path.resolve(__dirname, '../templates/.vscode/settings.json.ejs'),
        path.resolve(cwd(), './.vscode/settings.json')
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
