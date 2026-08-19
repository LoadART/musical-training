import React, {useState, useEffect} from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the DelayInput component.
 */
export interface DelayInputProps {
  delay: number;
  setDelay: (delay: number) => void;
}

/**
 * Input component for setting the delay (in seconds) between played items.
 * Ensures the value is always a valid integer >= 1.
 * 
 * @param delay - Current delay value in seconds.
 * @param setDelay - Function to update the delay value.
 */
export const DelayInput: React.FC<DelayInputProps> = ({ delay, setDelay }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(delay.toString());

  useEffect(() => {
    setInputValue(delay.toString());
  }, [delay]);

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  setInputValue(val); // Позволяем свободно вводить или стирать символы

  const num = parseInt(val, 10);
  // Обновляем глобальное состояние только если введено корректное число >= 1
  if (!isNaN(num) && num >= 1) {
    setDelay(num);
  }
};
const handleBlur = () => {
  const num = parseInt(inputValue, 10);
  if (isNaN(num) || num < 1) {
    setInputValue('1');
    setDelay(1);
  }
};
return (
    <div className="delay-input">
      <label htmlFor="delay-input-field">
        {t('delay.label')}
      </label>
      <input
        id="delay-input-field"
        type="number"
        min="1"
        step="1"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label={t('delay.label')}
      />
    </div>
  );
};

export default DelayInput;