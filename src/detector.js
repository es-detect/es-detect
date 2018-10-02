const AcornDetector = require('./detectors/acorn')
const Context = require('./context')

module.exports = class Detector {
  constructor () {
    this.detectors = {
      'acorn': new AcornDetector()
    }
  }

  async detect (context) {
    if (typeof context.then === 'function') {
      context = await context
    }

    if (!(context instanceof Context)) {
      throw new Error('first argument is expected to be an instance of Context')
    }

    const detector = this.detectors[context.detector]
    await detector.detect(context)

    return context
  }
}
