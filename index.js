const acorn = require('acorn')
const glob = require('glob')
const { readFileSync } = require('fs')

const ECMA_VERSIONS = [10, 9, 8, 8, 6, 5]

module.exports = class Detector {
  readSource (fileName) {
    return readFileSync(fileName, 'utf-8')
  }

  detect (source, ecmaVersion = 7) {
    try {
      acorn.parse(source, { ecmaVersion })
    } catch (err) {
      return { esVersion: 0, msg: err.message }
    }
    return { esVersion: ecmaVersion }
  }

  detectESVersion (source) {
    for (const version of ECMA_VERSIONS) {
      const result = this.detect(source, version)
      if (result.esVersion !== 0) {
        return result
      }
    }
    return { esVersion: 0, msg: 'No ecmaScript version is found in given resource' }
  }

  detectCodes (source, ecmaVersion) {
    if (ecmaVersion === undefined) {
      return this.detectESVersion(source)
    }
    return this.detect(source, ecmaVersion)
  }

  detectFile (fileName, ecmaVersion) {
    const source = this.readSource(fileName)
    return this.detectCodes(source, ecmaVersion)
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
