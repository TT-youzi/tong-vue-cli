//拉取项目模版地址 “平台：用户/项目名”
const repo = 'github:TT-youzi/vue-project'
const {
  clone
} = require('./download')
const program = require('commander')
//指令图标工具 成功前面的小✅
const symbols = require('log-symbols')
const chalk = require('chalk')


//init命令
module.exports.init = async name => {
  console.log('🔥创建项目：' + name)
  //远程拉取项目模版
  await clone(repo, name)
}


var fs = require('fs');

const handlebars = require('handlebars')

//动态生成路由
module.exports.refesh = async () => {

  //读取页面列表
  const list = fs.readdirSync('./src/views')
    //除去默认的Home文件
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      componentName: v.replace('.vue', ''),
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }))

  //生成路由定义
  compile({
    list
  }, './src/router/index.js', './template/router.js.hbs')

  //生成菜单
  compile({
    list
  }, './src/App.vue', './template/App.vue.hbs')
}

//文件写入
function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
  }
  console.log(symbols.success, chalk.green(`🚀!${filePath} 创建成功`))
}