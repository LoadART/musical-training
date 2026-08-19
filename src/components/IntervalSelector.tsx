import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Interval } from '../types';

/**
 * Props for the IntervalSelector component.
 */
export interface IntervalSelectorProps {
  intervals: Interval[];
  selectedIntervals: string[];
  setSelectedIntervals: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Renders a grid of checkboxes for selecting musical intervals to include in the training.
 * 
 * @param intervals - List of all available intervals.
 * @param selectedIntervals - Array of currently selected interval IDs.
 * @param setSelectedIntervals - Function to update the selected intervals state.
 */
export const IntervalSelector: React.FC<IntervalSelectorProps> = ({ 
  intervals, 
  selectedIntervals, 
  setSelectedIntervals 
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (intervalId: string) => {
    // Functional update ensures we always work with the latest state
    setSelectedIntervals((prev) =>
      prev.includes(intervalId)
        ? prev.filter((id) => id !== intervalId) // Remove if already selected
        : [...prev, intervalId]                  // Add if not selected
    );
  };

  return (
    <div className="selector">
      <h3>{t('intervals.title')}</h3>
      <div className="checkbox-grid" role="group" aria-label={t('intervals.title')}>
        {intervals.map((interval) => {
          const isSelected = selectedIntervals.includes(interval.id);
          
          return (
            <label 
              key={interval.id} 
              className={`checkbox-label ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleCheckboxChange(interval.id)}
                aria-checked={isSelected}
              />
              <span>{t(interval.translationKey)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default IntervalSelector;