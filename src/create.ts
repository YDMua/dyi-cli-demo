import chalk from 'chalk'
import { copyDir } from 'dyi-tool'
import { existsSync, remove } from 'fs-extra'
import { prompt } from 'inquirer'
import ora from 'ora'
import path from 'path'

const Create = async (name: string, options: any) => {
  // 获取当前位置
  const cwd = process.cwd()

  // 需要创建的文件
  const targetPath = path.join(cwd, name)

  const { projectName } = await prompt({
    name: 'projectName',
    type: 'list',
    choices: [
      { name: 'react-tmp', value: 'react-tmp' },
      { name: 'vue-tmp', value: 'vue-tmp' },
      { name: 'taro-tmp', value: 'taro-tmp' },
    ],
    message: '请选择一个项目模版进行创建',
  })

  // 判断目录是否已存在
  if (existsSync(targetPath)) {
    // 强制替换
    if (options.force) {
      await remove(targetPath)
    } else {
      const { replace } = await prompt([
        {
          name: 'replace',
          type: 'list',
          message: `项目已存在、是否确认覆盖? ${chalk.grey(
            '覆盖后原项目无法恢复',
          )}`,
          choices: [
            { name: '确认覆盖', value: true },
            { name: '再考虑下，暂不覆盖', value: false },
          ],
        },
      ])
      if (!replace) {
        return
      }
      await remove(targetPath)
    }
  }

  // 复制项目模版
  console.log(`\n`)
  const spinner = ora('downloading template...')
  spinner.start()
  const res = await copyDir(`./src/template/${projectName}`, `./${name}`)
  if (res === false) {
    console.log(chalk.red(`downloading failed ...`))
    spinner.fail('downloading failed ...')
    return false
  }
  spinner.succeed()
  console.log(
    `${chalk.green('\n Successfully created project')}  ${chalk.cyan(name)}`,
  )
  console.log(`\n cd ${chalk.cyan(name)}`)
  console.log('\n npm install')
  console.log('\n npm run dev \n')
}

export default Create
