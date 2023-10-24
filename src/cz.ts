import temp from 'temp'
import fse from 'fs-extra'
import type { QuestionCollection } from 'inquirer'

const log = console
const config = {
    alias: {
        fd: 'docs: :memo: 文档更新',
        uv: 'release: :bookmark: update version',
    },
    messages: {
        type: '选择你要提交的类型 :',
        scope: '选择一个提交范围（可选）:',
        customScope: '请输入自定义的提交范围 :',
        subject: '填写简短精炼的变更描述 :\n',
        release: '是否发布？',
        body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
        breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
        footerPrefixsSelect: '选择关联issue前缀（可选）:',
        customFooterPrefixs: '输入自定义issue前缀 :',
        footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
        confirmCommit: '是否提交或修改commit ?',
    },
    types: [
        {
            value: 'update',
            name: 'update:   🚀  更新',
            emoji: ':rocket:',
        },
        {
            value: 'fix',
            name: 'fix:      🐛  修复缺陷',
            emoji: ':bug:',
        },
        {
            value: 'add',
            name: 'add:      ✨  新增功能',
            emoji: ':sparkles:',
        },
        {
            value: 'release',
            name: 'release:  🔖  发布新版本',
            emoji: ':bookmark:',
        },
        {
            value: 'style',
            name: 'style:    💄  代码格式 (不影响功能，例如空格、分号等格式修正）',
            emoji: ':lipstick:',
        },
        {
            value: 'refactor',
            name: 'refactor: ♻️   代码重构 （不包括 bug 修复、功能新增）',
            emoji: ':recycle:',
        },
        {
            value: 'perf',
            name: 'perf:     ⚡️  性能优化',
            emoji: ':zap:',
        },
        {
            value: 'test',
            name: 'test:     ✅  添加疏漏测试或已有测试改动',
            emoji: ':white_check_mark:',
        },
        {
            value: 'build',
            name: 'build:    📦️  构建相关 （构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
            emoji: ':package:',
        },
        {
            value: 'docs',
            name: 'docs:     📝  文档更新',
            emoji: ':memo:',
        },
        {
            value: 'revert',
            name: 'revert:   ⏪️  回滚 commit',
            emoji: ':rewind:',
        },
    ],
}
const questions: QuestionCollection = [
    {
        type: 'list',
        name: 'type',
        message: config.messages.type,
        choices: config.types,
    },
    {
        type: 'editor',
        name: 'subject',
        message: config.messages.subject,
        default: (answers) => {
            if (answers.type === 'release') return '更新版本'
        },
        validate(value) {
            if (value.length == 0) return '描述不能为空'
            if (value.length > 100) return `Exceed limit: ${100}`
            return true
        },
    },
    {
        type: 'list',
        name: 'release',
        message: config.messages.release,
        choices: [
            { key: 'n', name: 'No', value: false },
            { key: 'y', name: 'Yes', value: true },
        ],
    },
    {
        type: 'expand',
        name: 'confirmCommit',
        choices: [
            { key: 'y', name: '确认', value: 'yes' },
            { key: 'n', name: '中断提交', value: 'no' },
            { key: 'e', name: '编辑提交信息', value: 'edit' },
        ],
        default: 'yes',
        message(answers) {
            const emoji = config.types.find((e) => {
                return answers.type === e.value
            }).emoji
            const SEP =
                '###--------------------------------------------------------###'
            log.info(
                `
                ${SEP}
                ${emoji} ${answers.subject}${answers.release && ' #release#'}
                ${SEP}
                `
            )
            return config.messages.confirmCommit
        },
    },
]

export default {
    prompter(cz, commit) {
        cz.prompt(questions).then((answers) => {
            const emoji = config.types.find((e) => {
                return answers.type === e.value
            }).emoji
            let message = `${emoji} ${answers.subject}`
            if (answers.release) {
                message += ' #release#'
            }
            if (answers.confirmCommit === 'yes') {
                commit(message)
            }
            if (answers.confirmCommit === 'no')
                return log.info('已经取消Commit。')
            temp.open(null, (err: any, info) => {
                if (err) return
                fse.writeSync(info.fd, message)
                fse.close(info.fd, () => {
                    editor(info.path, (code) => {
                        if (code === 0) {
                            const commitStr = fse.readFileSync(info.path, {
                                encoding: 'utf8',
                            })
                            return commit(commitStr)
                        }
                        log.info(`你的Commit信息是：\n${message}`)
                    })
                })
            })
        })
    },
}
