module.exports = class BaseDetector {
  constructor (options, defaults) {
    this.options = Object.assign({}, defaults, options)
  }

  async detect (context) {
    throw new Error('detect() not implemented!')
  }

  async detectFeatures (ast) {
    throw new Error('detectFeatures() not implemented!')
  }
}
