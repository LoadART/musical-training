/**
 * Represents a musical note available for ear training.
 */
export interface Note {
  /** 
   * Unique identifier for the note (e.g., 'C', 'C#', 'Db'). 
   * Used for logic and state management.
   */
  id: string;
  
  /** 
   * The i18n translation key used to display the note's localized name in the UI 
   * (e.g., 'notes.C', 'notes.C#').
   */
  translationKey: string;
}

/**
 * Represents a musical interval available for ear training.
 */
export interface Interval {
  /** 
   * Unique identifier for the interval (e.g., 'major_third', 'perfect_fifth'). 
   * Used for logic and state management.
   */
  id: string;
  
  /** 
   * The i18n translation key used to display the interval's localized name in the UI 
   * (e.g., 'intervals.major_third').
   */
  translationKey: string;
}