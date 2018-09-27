const { readFile } = require('fs-extra')
const Context = require('./context')

// Resolve from file
async function fromFile (fileName, encoding = 'utf-8') {
  // Create a new context
  const context = new Context()

  // Assign fileName
  context.fileName = fileName

  // Read source
  const source = await readFile(fileName, encoding)
  context.source = source

  // Return context
  return context
}

// Resolve from package
async function fromModule (moduleName, options) {
  // Try to resolve module path
  const resolvedPath = require.resolve(moduleName, options)

  // Use fromFile to create initial context
  const context = fromFile(resolvedPath)

  // Return context
  return context
}

// Resolve from raw source
async function fromSource (source, encoding = 'utf-8') {
  // Create a new context
  const context = new Context()

  // Encode source into string if is buffer
  if (source instanceof Buffer) {
    source = source.toString(encoding)
  }

  // Assign source
  context.source = source

  // Return context
  return context
}

module.exports = {
  fromFile,
  fromModule,
  fromSource
}
