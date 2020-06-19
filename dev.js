// import { Range } from '@tonaljs/tonal'
const { Range } = require('@tonaljs/tonal')
const { instrumentStrings } = require('./config/guitare_strings')
const util = require('util')

class InstrumentGetNotesRangeByStrings {
  constructor (strings) {
    this.strings = strings
    this.data = []
  }

  CreateNotesRanges () {
    this.strings.forEach(string => {
      const rangeFrom = `${string.note}${string.range.from}`
      const rangeTo = `${string.note}${string.range.to}`
      let sharpRange = Range.chromatic([rangeFrom, rangeTo], { sharps: true })
      sharpRange = sharpRange.map(note => InstrumentGetNotesRangeByStrings.ToMusicalAlterationSymbols(note))
      sharpRange = sharpRange.map(note => InstrumentGetNotesRangeByStrings.ToSimpleAbcNotation(note))
      let flatRange = Range.chromatic([rangeFrom, rangeTo], { sharps: false })
      flatRange = flatRange.map(note => InstrumentGetNotesRangeByStrings.ToMusicalAlterationSymbols(note))
      flatRange = flatRange.map(note => InstrumentGetNotesRangeByStrings.ToSimpleAbcNotation(note))
      const object = {
        string: `${string.note}${string.range.from}`,
        range: {
          sharp: sharpRange,
          flat: flatRange
        }
      }
      this.data.push(object)
    })
    return this
  }

  Data () {
    this.CreateNotesRanges()
    return this.data
  }

  /**
   * Format a note String to musical ateration symbols '♯' or '♭'
   * @example ToMusicalAlterationSymbols('F#') // returns F♯
   * @param  {String} String the string to apply symbols replacement
   * @returns {String} the string with symbols replacement
   */
  static ToMusicalAlterationSymbols (string) {
    const symbols = {
      sharp: '♯',
      flat: '♭'
    }
    const regex = /b/g
    const regex2 = /#/g
    return string.replace(regex, symbols.flat).replace(regex2, symbols.sharp)
  }

  /**
   * Format a note String to simple abc notation by removing any number
   * @example ToSimpleAbcNotation('A4') // returns A
   * @param  {String} string the String to apply Number removing
   * @returns {String} the string without the number
   */
  static ToSimpleAbcNotation (string) {
    return string.replace(/[0-9]/g, '')
  }
}

const instrumentNotesByStrings = new InstrumentGetNotesRangeByStrings(instrumentStrings)
const ranges = instrumentNotesByStrings.Data()
console.log(util.inspect(ranges, { depth: 4 })) // !DEBUG
