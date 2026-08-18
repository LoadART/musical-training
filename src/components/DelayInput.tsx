import React from 'react';
import { useTranslation } from 'react-i18next';

interface DelayInputProps {
  delay: number;
  setDelay: (delay: number) => void;
}

const DelayInput: React.FC<DelayInputProps> = ({ delay, setDelay }) => {
  const { t } = useTranslation();

  return (
    <div className="delay-input">
      <label htmlFor="delay">
        {t('delay.label')}
      </label>
      <input
        id="delay"
        type="number"
        min="1"
        step="1"
        value={delay}
        onChange={(e) => {
          const value = e.target.value;
          // Если поле пустое, просто очищаем, не ставим 1 сразу
          if (value === '') {
            setDelay(1);
            return;
          }
          const num = parseInt(value, 10);
          if (!isNaN(num) && num >= 1) {
            setDelay(num);
          }
        }}
      />
    </div>
  );
};

export default DelayInput;