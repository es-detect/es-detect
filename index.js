const acorn = require('acorn')
const glob = require('glob')
const { readFileSync } = require('fs')

module.exports = class Detector {
  readSource (fileName) {
    return readFileSync(fileName, 'utf-8')
  }

  detect (source, ecmaVersion = 7) {
    try {
      acorn.parse(source, { ecmaVersion })
    } catch (err) {
      return { compatible: false, msg: err.message }
    }
    return { compatible: true }
  }

  detectFile (fileName, ecmaVersion) {
    const source = this.readSource(fileName)
    return this.detect(source, ecmaVersion)
  }

  detectFiles (pattern, ecmaVersion) {
    const files = glob.sync(pattern, { nodir: true })
    const compTable = {}
    for (const file of files) {
      compTable[file] = this.detectFile(file, ecmaVersion)
    }
    return compTable
  }

  detectModule (moduleName, ecmaVersion) {
    const file = require.resolve(moduleName)
    return this.detectFile(file, ecmaVersion)
  }
}
