const fs = require('fs')
const path = require('path')

const fileName = process.argv[2]
const indexTep = `import * as React from 'react'
import {IProps} from './type'
import './style.scss'; 
class ${fileName} extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 数据挂载之后 可以操作数据和dom 
  }
  componentWillUnmount() {
    // 数据挂载之前 可以操作数据 不可以操作dom
  }
  render() {
    return (
      <div className="${fileName}-page">
        ${fileName}
      </div>
    )
  }
}
export default ${fileName}
`
// scss文件模版
const cssTep = ``;

const typeTep = `export interface IProps {}
export interface IState {}
`

console.log('fileName', fileName)
fs.mkdirSync(path.join(process.cwd(), `${fileName}`)) // mkdir $1 创建文件夹
process.chdir(path.join(process.cwd(), `${fileName}`)) // cd $1 进入该目录

fs.writeFileSync('index.tsx', indexTep)
fs.writeFileSync('index.css', cssTep)
fs.writeFileSync('type.ts', typeTep)

console.log(`模版${fileName}已创建`)

process.exit(0)