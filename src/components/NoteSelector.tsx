import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Note } from '../types';

/**
 * Props for the NoteSelector component.
 */
export interface NoteSelectorProps {
  notes: Note[];
  selectedNotes: string[];
  setSelectedNotes: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Renders grouped checkboxes for selecting musical notes (natural, sharp, flat).
 * 
 * @param notes - List of all available notes.
 * @param selectedNotes - Array of currently selected note IDs.
 * @param setSelectedNotes - Function to update the selected notes state.
 */
export const NoteSelector: React.FC<NoteSelectorProps> = ({ 
  notes, 
  selectedNotes, 
  setSelectedNotes 
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (noteId: string) => {
    setSelectedNotes((prev) =>
      prev.includes(noteId)
        ? prev.filter((id) => id !== noteId)
        : [...prev, noteId]
    );
  };

  // Logically group notes for better UX
  const naturalNotes = notes.filter(note => !note.id.includes('#') && !note.id.includes('b'));
  const sharpNotes = notes.filter(note => note.id.includes('#'));
  const flatNotes = notes.filter(note => note.id.includes('b'));

  // Helper to render a group of checkboxes to avoid code duplication
  const renderNoteGroup = (groupNotes: Note[], groupTitleKey: string) => (
    <div className="note-group">
      <h4>{t(groupTitleKey)}</h4>
      <div className="checkbox-grid" role="group" aria-label={t(groupTitleKey)}>
        {groupNotes.map(note => {
          const isSelected = selectedNotes.includes(note.id);
          return (
            <label 
              key={note.id} 
              className={`checkbox-label ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleCheckboxChange(note.id)}
                aria-checked={isSelected}
              />
              <span>{t(note.translationKey)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="selector">
      <h3>{t('notes.title')}</h3>
      {renderNoteGroup(naturalNotes, 'notes.natural')}
      {renderNoteGroup(sharpNotes, 'notes.sharp')}
      {renderNoteGroup(flatNotes, 'notes.flat')}
    </div>
  );
};

export default NoteSelector;