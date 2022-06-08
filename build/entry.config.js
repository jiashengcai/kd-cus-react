const glob = require('glob')
const customConfigInfo = require('./custom.configInfo.js')

const client = customConfigInfo.client  // PC端或者移动端
const isv = customConfigInfo.isv    // 开发商标识
const moduleId = customConfigInfo.moduleId  // 领域标识

const getEntrys = function(entryPattern){
    let entry = {}
    glob.sync(entryPattern).forEach((path) => { // ./src/web/isv/kingdee/hr/helloworld/index.js, ./src/web/isv/kingdee/hr/helloworld/js/demo.js
      const length = path.split('/').length - 1
      path = path.split('/')[length - 1] // helloworld
      entry[path] = `./src/${client}/isv/${isv}/${moduleId}/${path}/main.js`
    })
    return entry
}

const getEntrysByPatternList = function(entryPatternList) {

}

module.exports = {
    getEntrys,
    getEntrysByPatternList
}