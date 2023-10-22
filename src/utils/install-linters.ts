import { IConfig } from 'src/types'
export const installLinters = (config: IConfig) => {
    const dependenciesInfo: Array<Record<'name' | 'version', string>> = [
        { name: 'eslint', version: '8.50.0' },
        { name: 'prettier', version: '3.0.3' },
    ]
    const lintersMap = {
        eslint() {},
        prettier() {},
        stylelint() {},
        typescript() {},
        nuxt() {},
    }
    const typeMap = {
        vue: function () {
            /**
             * 1. 安装依赖
             * 2. 写配置
             */
        },
        'vue/typescript': function () {},
        node: function () {},
        'node/typescript': function () {},
        react: function () {},
        'react/typescript': function () {},
        nuxt: function () {},
        'nuxt/typescript': function () {},
    }
}
