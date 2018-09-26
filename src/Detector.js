const glob = require('glob')
const { readFileSync } = require('fs')

module.exports = class Detector {
  detect (source, ecmaVersion) {}

  detectESVersion (source) {}

  detectCodes (source, ecmaVersion) {}

  detectFile (fileName, ecmaVersion) {}

  detectFiles (pattern, ecmaVersion) {}

  detectModule (moduleName, ecmaVersion) {}

  readSource (fileName) {
    return readFileSync(fileName, 'utf-8')
  }

  searchFiles (pattern) {
    return glob.sync(pattern, { nodir: true })
  }
}
