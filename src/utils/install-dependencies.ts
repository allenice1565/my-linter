import { IConfig } from '@/types'
import { dependenciesInfo } from './constants'
import { execSync } from 'child_process'

export default function installDependencies({ eslintType, npmType }: IConfig) {
    const commonDep = [
        'eslint',
        'prettier',
        'husky',
        'lint-staged',
        'eslint-plugin-prettier',
        'eslint-config-prettier',
    ]
    const depMap: { [keyof in typeof eslintType]: string[] } = {
        vue: [...commonDep, 'eslint-plugin-vue', 'vue-eslint-parser'],
        'vue/typescript': [
            ...commonDep,
            'eslint-plugin-vue',
            'vue-eslint-parser',
            '@typescript-eslint/parser',
        ],
        node: [...commonDep, 'espree'],
        'node/typescript': [...commonDep, '@typescript-eslint/parser'],
        nuxt: [...commonDep],
        'nuxt/typescript': [...commonDep, '@nuxtjs/eslint-config-typescript'],
    }
    const depString: string[] = []
    dependenciesInfo.forEach((dep) => {
        const matchItem = depMap[eslintType].find((item) => item === dep.name)
        if (!matchItem) return
        depString.push(`${dep.name}@^${dep.version}`)
    })
    const npmCommandMap = {
        npm: `npm install --save-dev ${depString.join(' ')}`,
        yarn: `yarn add -D ${depString.join(' ')}`,
        pnpm: `pnpm add -D ${depString.join(' ')}`,
    }
    execSync(npmCommandMap[npmType], { stdio: 'inherit' })
}
