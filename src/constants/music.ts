import type { Note, Interval } from '../types';

/**
 * Complete list of musical notes available for selection.
 * Includes both sharps and flats for comprehensive ear training.
 */
export const NOTES: Note[] = [
  { id: 'C', translationKey: 'notes.C' },
  { id: 'C#', translationKey: 'notes.C#' },
  { id: 'Db', translationKey: 'notes.Db' },
  { id: 'D', translationKey: 'notes.D' },
  { id: 'D#', translationKey: 'notes.D#' },
  { id: 'Eb', translationKey: 'notes.Eb' },
  { id: 'E', translationKey: 'notes.E' },
  { id: 'F', translationKey: 'notes.F' },
  { id: 'F#', translationKey: 'notes.F#' },
  { id: 'Gb', translationKey: 'notes.Gb' },
  { id: 'G', translationKey: 'notes.G' },
  { id: 'G#', translationKey: 'notes.G#' },
  { id: 'Ab', translationKey: 'notes.Ab' },
  { id: 'A', translationKey: 'notes.A' },
  { id: 'A#', translationKey: 'notes.A#' },
  { id: 'Bb', translationKey: 'notes.Bb' },
  { id: 'B', translationKey: 'notes.B' }
];

/**
 * Complete list of musical intervals available for selection.
 * Ranges from unison (prime) to a full octave.
 */
export const INTERVALS: Interval[] = [
  { id: 'prime', translationKey: 'intervals.prime' },
  { id: 'minor_second', translationKey: 'intervals.minor_second' },
  { id: 'major_second', translationKey: 'intervals.major_second' },
  { id: 'minor_third', translationKey: 'intervals.minor_third' },
  { id: 'major_third', translationKey: 'intervals.major_third' },
  { id: 'perfect_fourth', translationKey: 'intervals.perfect_fourth' },
  { id: 'tritone', translationKey: 'intervals.tritone' },
  { id: 'perfect_fifth', translationKey: 'intervals.perfect_fifth' },
  { id: 'minor_sixth', translationKey: 'intervals.minor_sixth' },
  { id: 'major_sixth', translationKey: 'intervals.major_sixth' },
  { id: 'minor_seventh', translationKey: 'intervals.minor_seventh' },
  { id: 'major_seventh', translationKey: 'intervals.major_seventh' },
  { id: 'octave', translationKey: 'intervals.octave' }
];