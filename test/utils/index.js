const path = require('path')
const { Resolve } = require('../../src')

const FIXTURES_DIR = path.resolve(__dirname, '../fixtures')

function resolveFixture (name) {
  return path.resolve(FIXTURES_DIR, name)
}

async function loadFixture (name) {
  return Resolve.fromFile(resolveFixture(name))
}

module.exports = {
  FIXTURES_DIR,

  loadFixture,
  resolveFixture
}
