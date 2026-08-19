import React from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the SpeechCheckbox component.
 */
export interface SpeechCheckboxProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

/**
 * Checkbox component to toggle speech synthesis (text-to-speech) during training.
 */
export const SpeechCheckbox: React.FC<SpeechCheckboxProps> = ({ enabled, setEnabled }) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked);
  };

  return (
    <label 
      htmlFor="speech-toggle" 
      className={`checkbox-label speech-checkbox ${enabled ? 'selected' : ''}`}
    >
      <input
        id="speech-toggle"
        type="checkbox"
        checked={enabled}
        onChange={handleChange}
        aria-checked={enabled}
      />
      <span>{t('speech.label')}</span>
    </label>
  );
};

export default SpeechCheckbox;