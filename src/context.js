module.exports = class Context {
  constructor () {
    // Current module name
    this.fileName = null

    // Detector name
    this.detector = 'acorn'

    // Format of the source
    this.type = null

    // Source contents
    this.source = null

    // Array of detected features
    this.features = []
  }
}
