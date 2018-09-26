const { Detector, Context } = require('../../src')

describe('Detector', () => {
  const detector = new Detector()

  it('detect called with invalid context instance', async () => {
    await expect(detector.detect({ foo: 'bar' })).rejects.toThrow()
  })

  it('resolve promise', async () => {
    const context = new Context()
    await expect(detector.detect(Promise.resolve(context)))
      .resolves.toEqual(context)
  })
})
