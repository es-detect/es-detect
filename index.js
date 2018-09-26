const acorn = require('acorn')
const { readFileSync } = require('fs')

module.exports = class Detector {
  detect (fileName, ecmaVersion = 7) {
    const source = readFileSync(fileName, 'utf-8')
    try {
      acorn.parse(source, { ecmaVersion })
    } catch (err) {
      return { compatible: false, msg: err.message }
    }
    return { compatible: true }
  }
}
