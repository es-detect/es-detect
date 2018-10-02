const AcornDetector = require('../../src/detectors/acorn')
const { loadFixture } = require('../utils')

describe('Acorn Detector', () => {
  let detector

  it('constructor', () => {
    detector = new AcornDetector()
  })

  it('default ecmaVersions', () => {
    expect(detector.options.ecmaVersions)
      .toEqual([5, 6, 7, 8, 9])
  })

  it('acorn lazy required', () => {
    expect(detector.acorn).toBeDefined()
  })

  it('detect es5', async () => {
    const context = await loadFixture('es5/var.js')
    await detector.detect(context)
    expect(context.ecmaVersion).toEqual(5)
  })

  it('detect es6', async () => {
    const context = await loadFixture('es6/const.js')
    await detector.detect(context)
    expect(context.ecmaVersion).toEqual(6)
  })

  describe('detect es modules', () => {
    it('import', async () => {
      const context = await loadFixture('es6/import.js')
      context.features = true
      await detector.detect(context)
      expect(context.features.esModule).toEqual(true)
    })

    it('export', async () => {
      const context = await loadFixture('es6/export.js')
      context.features = true
      await detector.detect(context)
      expect(context.features.esModule).toEqual(true)
    })
  })

  it('detect es7', async () => {
    const context = await loadFixture('es7/exponentiation.js')
    await detector.detect(context)
    expect(context.ecmaVersion).toEqual(7)
  })

  it('detect es8', async () => {
    const context = await loadFixture('es8/function-comma.js')
    await detector.detect(context)
    expect(context.ecmaVersion).toEqual(8)
  })

  it('detect es9', async () => {
    const context = await loadFixture('es9/private-method.js')
    await detector.detect(context)
    expect(context.ecmaVersion).toEqual(undefined) // TODO
  })
})
