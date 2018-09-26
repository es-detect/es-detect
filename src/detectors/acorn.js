const BaseDetector = require('./base')

module.exports = class AcornDetector extends BaseDetector {
  constructor (options) {
    // Assign options and defaults
    super(options)

    // Ensure ecmaVersions are sorted
    this.options.ecmaVersions = this.options.ecmaVersions.sort().reverse()

    // Lazy-require acorn
    this.acorn = this.options.acorn || require('acorn')
  }

  static get defaults () {
    return {
      ecmaVersions: [10, 9, 8, 7, 6, 5]
    }
  }

  detect (context) {
    // Try to parse and detect ecmaVersion
    const { ecmaVersion } = this._detectEcmaVersion(context.source)

    // Set context.ecmaVersion if detected
    if (ecmaVersion) {
      context.ecmaVersion = ecmaVersion
    }
  }

  _parse (source) {
    for (const ecmaVersion of this.ecmaVersions) {
      try {
        const parsed = this.acorn.parse(source, { ecmaVersion })

        // Parsed and seems is supported!
        return {
          ecmaVersion,
          parsed
        }
      } catch (e) {
        // Not supported!
        continue
      }
    }

    // Nothing detected :( Probably not a valid js code at all
    return {
      ecmaVersion: 0
    }
  }
}
