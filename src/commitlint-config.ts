import type { UserConfig } from '@commitlint/types'

export const config: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-atom',
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'release',
                'build',
                'update',
                'docs',
                'add',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
                'merge',
            ],
        ],
        'type-case': [2, 'always', 'lowerCase'],
        'subject-case': [0],
        'subject-empty': [2, 'always'],
        'subject-full-stop': [0],
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 100],
        'footer-max-line-length': [2, 'always', 100],
    },
}
