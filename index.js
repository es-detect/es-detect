const acorn = require('acorn')
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
}
