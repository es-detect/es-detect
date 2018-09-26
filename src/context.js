module.exports = class Context {
  constructor () {
    // Current module name
    this.fileName = null

    // Format of the source
    this.type = null

    // Source contents
    this.source = null

    // Array of detected features
    this.features = []
  }
}
