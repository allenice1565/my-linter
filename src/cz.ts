import fse from 'fs-extra'
import type { QuestionCollection, Answers } from 'inquirer'
import path from 'path'
import os from 'os'
import cnst from 'node:constants'
import { rimraf } from 'rimraf'
import { spawn } from 'node:child_process'

const dir = path.resolve(os.tmpdir())
const RDWR_EXCL = cnst.O_CREAT | cnst.O_TRUNC | cnst.O_RDWR | cnst.O_EXCL
const tracking = false
let exitListenerAttached = false
const rimrafSync = rimraf.sync
const filesToDelete: string[] = []
const dirsToDelete: string[] = []
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
        default: (answers: Answers) => {
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
                ${emoji} ${answers.subject}${
                    answers.release ? ' #release#' : ''
                }
                ${SEP}
                `
            )
            return config.messages.confirmCommit
        },
    },
]

interface AffixOptions {
    prefix?: string | null | undefined
    suffix?: string | null | undefined
    dir?: string | undefined
}
const parseAffixes = function (
    rawAffixes: string | AffixOptions | undefined,
    defaultPrefix: string
) {
    let affixes: AffixOptions = { prefix: null, suffix: null }
    if (rawAffixes) {
        switch (typeof rawAffixes) {
            case 'string':
                affixes.prefix = rawAffixes
                break
            case 'object':
                affixes = rawAffixes
                break
            default:
                throw new Error(`Unknown affix declaration: ${affixes}`)
        }
    } else {
        affixes.prefix = defaultPrefix
    }
    return affixes
}
const generateName = function (
    rawAffixes: string | AffixOptions | undefined,
    defaultPrefix: string
) {
    const affixes: AffixOptions = parseAffixes(rawAffixes, defaultPrefix)
    const now = new Date()
    const name = [
        affixes.prefix,
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        '-',
        process.pid,
        '-',
        (Math.random() * 0x100000000 + 1).toString(36),
        affixes.suffix,
    ].join('')
    return path.join(affixes.dir || dir, name)
}

const promisify = function (callback: any, ...arges: any[]) {
    if (typeof callback === 'function') return [undefined, callback]

    let promiseCallback
    const promise = new Promise((resolve, reject) => {
        promiseCallback = function () {
            const args = Array.from(arges)
            const err = args.shift()

            process.nextTick(() => {
                if (err) reject(err)
                else if (args.length === 1) resolve(args[0])
                else resolve(args)
            })
        }
    })

    return [promise, promiseCallback]
}
interface OpenFile {
    path: string
    fd: number
}
function cleanupFilesSync() {
    if (!tracking) return false

    let count = 0
    let toDelete
    // eslint-disable-next-line no-cond-assign
    while ((toDelete = filesToDelete.shift()) !== undefined) {
        rimrafSync(toDelete, { maxBusyTries: 6 })
        count++
    }
    return count
}

function cleanupDirsSync() {
    if (!tracking) return false

    let count = 0
    let toDelete
    // eslint-disable-next-line no-cond-assign
    while ((toDelete = dirsToDelete.shift()) !== undefined) {
        rimrafSync(toDelete, { maxBusyTries: 6 })
        count++
    }
    return count
}
function cleanupSync() {
    if (!tracking) return false

    const fileCount = cleanupFilesSync()
    const dirCount = cleanupDirsSync()
    return { files: fileCount, dirs: dirCount }
}
function attachExitListener() {
    if (!tracking) return false
    if (!exitListenerAttached) {
        process.addListener('exit', () => {
            try {
                cleanupSync()
            } catch (err) {
                console.warn('Fail to clean temporary files on exit : ', err)
                throw err
            }
        })
        exitListenerAttached = true
    }
}
function deleteFileOnExit(filePath: string) {
    if (!tracking) return false
    attachExitListener()
    filesToDelete.push(filePath)
}
function tempOpen(
    affixes: string | AffixOptions | undefined,
    callback: (err: any, result: OpenFile) => void
) {
    const p = promisify(callback)
    const promise = p[0]
    callback = p[1]

    const path = generateName(affixes, 'f-')
    fse.open(path, RDWR_EXCL, 0o600, (err, fd) => {
        if (!err) deleteFileOnExit(path)

        callback(err, { path, fd })
    })
    return promise
}
function editor(file?: string, opts?: any | object, cb?: any) {
    if (typeof opts === 'function') {
        cb = opts
        opts = {}
    }
    if (!opts) opts = {}

    const ed = process.platform.startsWith('win') ? 'notepad' : 'vim'
    const editor = opts.editor || process.env.VISUAL || process.env.EDITOR || ed
    const args = editor.split(/\s+/)
    const bin = args.shift()

    const ps = spawn(bin, args.concat([file]), { stdio: 'inherit' })

    ps.on('exit', (code: number, sig: any) => {
        if (typeof cb === 'function') cb(code, sig)
    })
}
export default {
    prompter(
        cz: { prompt: (questions: QuestionCollection) => Promise<Answers> },
        commit: (msg: string) => any
    ) {
        cz.prompt(questions).then((answers: Answers) => {
            const emoji = config.types.find((e) => {
                return answers.type === e.value
            }).emoji
            const message = `${emoji} ${answers.subject}${
                answers.release ? ' #release#' : ''
            }`
            if (answers.confirmCommit === 'yes') return commit(message)
            if (answers.confirmCommit === 'no')
                return log.info('已经取消Commit')
            tempOpen(null, (err: any, info: { fd: number; path: string }) => {
                if (err) return
                fse.writeSync(info.fd, message)
                fse.close(info.fd, () => {
                    editor(info.path, (code: number) => {
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
