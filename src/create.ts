import chalk from 'chalk'
import { copyDir } from 'dyi-tool'
import { existsSync, remove } from 'fs-extra'
import { prompt } from 'inquirer'
import path from 'path'

const Create = async (name: string, options: any) => {
  // 获取当前位置
  const cwd = process.cwd()
  // 需要创建的文件
  const targetDir = path.join(cwd, name)

  // 判断目录是否已存在
  if (existsSync(targetDir)) {
    // 强制替换 -f
    if (options.force) {
      await remove(targetDir)
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
      await remove(targetDir)
    }
  }
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
  // 复制项目模版
  copyDir(`./src/template/${projectName}`, `./${name}`)
}

export default Create
