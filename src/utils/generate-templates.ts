import { globSync } from 'glob'

const strategyObj = {
    vue: function () {},
    'typescript/vue': function () {},
    node: function () {},
    'typescript/node': function () {},
    react: function () {},
    'typescript/react': function () {},
    nuxt: function () {},
    'typescript/nuxt': function () {},
}

export const generateTemplates = (type: string, templatePath: string) => {
    const files = globSync('**/*.ejs', { cwd: templatePath })
    strategyObj[type]()
    return files
}
