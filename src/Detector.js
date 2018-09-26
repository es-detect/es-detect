const AcornDetector = require('./detectors/acorn')
const Context = require('./context')

module.exports = class Detector {
  constructor () {
    this.detectors = [
      new AcornDetector()
    ]
  }

  async detect (context) {
    if (typeof context.then === 'function') {
      context = await context
    }

    if (!(context instanceof Context)) {
      throw new Error('first argument is expected to be an instance of Contest')
    }

    for (const detector of this.detectors) {
      await detector.detect(context)
    }

    return context
  }
}
