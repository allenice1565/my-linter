import { IConfig } from 'src/types'
import ejs from 'ejs'
import path from 'path'
import fs from 'fs-extra'
import url from 'url'
import { cwd } from 'node:process'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// const dependenciesInfo: Array<Record<'name' | 'version', string>> = [
//     { name: 'eslint', version: '8.50.0' },
//     { name: 'espree', version: '9.6.1' },
//     { name: 'prettier', version: '3.0.3' },
//     { name: 'husky', version: '8.0.3' },
//     { name: 'lint-staged', version: '15.0.2' },
//     { name: 'commitlint', version: '3.0.3' },
//     { name: 'commitizen', version: '4.3.0' },
//     { name: 'stylelint', version: '15.11.0' },
// ]
const eslintTypeMap = {
    vue: function () {
        const templatePath = path.resolve(
            __dirname,
            '../templates/.eslintrc.js.ejs'
        )
        const outputPath = path.resolve(cwd(), './.eslintrc.js')
        generateTemplates(templatePath, outputPath, {
            language: 'javascript',
            env: { browser: true },
            extendsList: [
                '@nuxtjs/eslint-config-typescript',
                'plugin:vue/vue3-essential',
                'plugin:vue/vue3-recommended',
                'prettier',
            ],
            pluginsList: [],
            parser: 'vue-eslint-parser',
            parserOptions: {
                ecmaVersion: 15,
            },
        })
    },
    'vue/typescript': function () {},
    node: function () {},
    'node/typescript': function () {},
    react: function () {},
    'react/typescript': function () {},
    nuxt: function () {},
    'nuxt/typescript': function () {},
}
export const installLinters = ({
    eslintType,
    enablePrettier,
    enableStylelint,
    enableMarkdownlint,
}: IConfig) => {
    eslintTypeMap[eslintType]()
    const lintersMap = {
        prettier() {},
        stylelint() {},
        markdownlint() {},
    }
    if (enablePrettier) {
        lintersMap.prettier()
    }
    if (enableStylelint) {
        lintersMap.stylelint()
    }
    if (enableMarkdownlint) {
        lintersMap.markdownlint()
    }
}

function generateTemplates(
    templatePath: string,
    outputPath: string,
    ejsData: Record<string, any>
) {
    const template = fs.readFileSync(templatePath, 'utf8')
    fs.writeFileSync(
        outputPath,
        ejs.render(template, ejsData, {
            escape: (str: string) => str,
        })
    )
}
