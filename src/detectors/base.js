module.exports = class BaseDetector {
  constructor (options) {
    this.options = Object.assign({}, this.defaults, options)
  }

  static get defaults () {
    return {}
  }

  detect (context) {
    throw new Error('detect() not implemented!')
  }
}
