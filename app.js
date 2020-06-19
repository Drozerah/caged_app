/**
 * Style Scss
 */
import './main.scss'
/**
 * NPM modules
 */
import { Key } from '@tonaljs/tonal'
/**
 * App modules
 */
import { instrumentStrings } from './config/guitare_strings'
import { InstrumentGetNotesRangeByStrings } from './app_modules/notes_ranges'

const draw = () => {
  console.log('draw canvas') // !DEBUG
  const res = Key.majorKey('C')
  console.log(res) // !DEBUG
  const instrumentNotesByStrings = new InstrumentGetNotesRangeByStrings(instrumentStrings)
  const ranges = instrumentNotesByStrings.Data()
  console.log(ranges.length) // !DEBUG
}

window.addEventListener('load', draw, false)
