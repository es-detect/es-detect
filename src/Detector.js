const AcornDetector = require('./detectors/acorn')

module.exports = class Detector {
  constructor () {
    this.detectors = [
      new AcornDetector()
    ]
  }

  detect (context) {
    for (const detector of this.detectors) {
      try {
        detector.detect(context)
      } catch (e) {
        console.error(e)
      }
    }
    return context
  }
}
