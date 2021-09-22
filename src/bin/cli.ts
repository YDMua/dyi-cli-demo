#! /usr/bin/env node
import chalk from 'chalk'
import { Command } from 'commander'
import figlet from 'figlet'
import pkg from '../../package.json'
import create from '../create'
const program = new Command()

// 创建文件
program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f --force', 'if it exist, overwrite directory')
  .action((name: string, options: any) => {
    create(name, options)
  })

// 配置版本号信息
program.version(pkg.version).usage('<command> [option]')

// 配置帮助信息
program.on('--help', () => {
  console.log(
    '\r\n' +
      figlet.textSync('dong.yi', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
  )
  console.log(
    `\r\n Run ${chalk.green(
      `dyi <command> --help`,
    )} to understand the details \r\n `,
  )
})
program.parse(process.argv)
