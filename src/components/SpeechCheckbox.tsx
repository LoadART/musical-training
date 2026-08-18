import React from 'react';
import { useTranslation } from 'react-i18next';

interface SpeechCheckboxProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

const SpeechCheckbox: React.FC<SpeechCheckboxProps> = ({ enabled, setEnabled }) => {
  const { t } = useTranslation();

  return (
    <label className={`checkbox-label speech-checkbox ${enabled ? 'selected' : ''}`}>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <span>{t('speech.label')}</span>
    </label>
  );
};

export default SpeechCheckbox;