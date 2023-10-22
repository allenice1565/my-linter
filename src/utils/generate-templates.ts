import { globSync } from 'glob'

const strategyObj = {
    vue: function () {
        /**
         * 
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

type IStrategyType = keyof typeof strategyObj

export const generateTemplates = (type: IStrategyType) => {
    // const files = globSync('**/*.ejs', { cwd: templatePath })
    strategyObj[type]()
}
