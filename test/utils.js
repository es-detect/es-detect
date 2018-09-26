const path = require('path')
const { Resolve } = require('..')

const FIXTURES_DIR = path.resolve(__dirname, 'fixtures')

async function loadFixture (name) {
  return Resolve.fromFile(path.resolve(FIXTURES_DIR, name))
}

module.exports = {
  loadFixture
}
