const { Resolve } = require('../../src')

describe('Resolve', () => {
  it('fromFile', async () => {
    const context = await Resolve.fromFile(__filename)
    expect(context.source).toContain('fromFile')
  })

  it('fromModule', async () => {
    const context = await Resolve.fromModule('lodash')
    expect(context.source).toContain('lodash.truncate')
  })

  it('fromSource', async () => {
    const context = await Resolve.fromSource('const test = 123')
    expect(context.source).toContain('const test')
  })

  it('fromSource (buffer)', async () => {
    const context = await Resolve.fromSource(Buffer.from('const test = 123'))
    expect(context.source).toContain('const test')
  })
})
