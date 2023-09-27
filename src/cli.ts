import { Command } from 'commander'
import packageJson from '../package.json' assert { type: 'json' }
import inquirer from 'inquirer'
// import ora from 'ora';
// import fs from 'fs-extra';
const InitPrompts = [
    {
        name: 'description',
        message: 'please input description',
        default: '',
    },
    {
        name: 'author',
        message: 'please input author',
        default: '',
    },
]

const program = new Command()

program
    .name(packageJson.name || '')
    .description(packageJson.description || '')
    .version(packageJson.version || '0.0.1')

program
    .command('init <name>')
    .description('初始化项目')
    .action(async (name: string) => {
        console.log('初始化项目:', name)
        const initOptions = await inquirer.prompt(InitPrompts)
        console.log('initOptions', initOptions)
    })

program.parse()
