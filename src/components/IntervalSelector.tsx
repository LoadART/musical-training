import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Interval } from '../types';

interface IntervalSelectorProps {
  intervals: Interval[];
  selectedIntervals: string[];
  setSelectedIntervals: (intervals: string[]) => void;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ 
  intervals, 
  selectedIntervals, 
  setSelectedIntervals 
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (intervalId: string) => {
    if (selectedIntervals.includes(intervalId)) {
      setSelectedIntervals(selectedIntervals.filter(id => id !== intervalId));
    } else {
      setSelectedIntervals([...selectedIntervals, intervalId]);
    }
  };

  return (
    <div className="selector">
      <h3>{t('intervals.title')}</h3>
      <div className="checkbox-grid">
        {intervals.map(interval => (
          <label 
            key={interval.id} 
            className={`checkbox-label ${selectedIntervals.includes(interval.id) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedIntervals.includes(interval.id)}
              onChange={() => handleCheckboxChange(interval.id)}
            />
            <span>{t(interval.translationKey)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default IntervalSelector;