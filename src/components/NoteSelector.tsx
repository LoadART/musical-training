import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Note } from '../types';

interface NoteSelectorProps {
  notes: Note[];
  selectedNotes: string[];
  setSelectedNotes: (notes: string[]) => void;
}

const NoteSelector: React.FC<NoteSelectorProps> = ({ 
  notes, 
  selectedNotes, 
  setSelectedNotes 
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (noteId: string) => {
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter(id => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const naturalNotes = notes.filter(note => !note.id.includes('#') && !note.id.includes('b'));
  const sharpNotes = notes.filter(note => note.id.includes('#'));
  const flatNotes = notes.filter(note => note.id.includes('b'));

  return (
    <div className="selector">
      <h3>{t('notes.title')}</h3>
      
      <div className="note-group">
        <h4>{t('notes.natural')}</h4>
        <div className="checkbox-grid">
          {naturalNotes.map(note => (
            <label 
              key={note.id} 
              className={`checkbox-label ${selectedNotes.includes(note.id) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedNotes.includes(note.id)}
                onChange={() => handleCheckboxChange(note.id)}
              />
              <span>{t(note.translationKey)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="note-group">
        <h4>{t('notes.sharp')}</h4>
        <div className="checkbox-grid">
          {sharpNotes.map(note => (
            <label 
              key={note.id} 
              className={`checkbox-label ${selectedNotes.includes(note.id) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedNotes.includes(note.id)}
                onChange={() => handleCheckboxChange(note.id)}
              />
              <span>{t(note.translationKey)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="note-group">
        <h4>{t('notes.flat')}</h4>
        <div className="checkbox-grid">
          {flatNotes.map(note => (
            <label 
              key={note.id} 
              className={`checkbox-label ${selectedNotes.includes(note.id) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedNotes.includes(note.id)}
                onChange={() => handleCheckboxChange(note.id)}
              />
              <span>{t(note.translationKey)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteSelector;