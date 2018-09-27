const BaseDetector = require('../../src/detectors/base')

describe('Base Detector', () => {
  let detector

  it('constructor', () => {
    detector = new BaseDetector()
  })

  it('detect() should throw error', async () => {
    await expect(detector.detect()).rejects.toThrow()
  })
})
