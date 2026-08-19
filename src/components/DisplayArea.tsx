import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the DisplayArea component.
 */
export interface DisplayAreaProps {
  /** Array of items to display. Typically contains exactly one item during playback. */
  items: string[];
}

/**
 * Displays the current musical item (note or interval) being played.
 * Includes accessibility attributes to announce changes to screen readers.
 * 
 * @param items - Array of localized item names to display.
 */
export const DisplayArea: React.FC<DisplayAreaProps> = ({ items }) => {
  const { t } = useTranslation();
  const currentItem = items.length > 0 ? items[0] : null;

  return (
    <div 
      className="display-area" 
      aria-live="polite" 
      aria-atomic="true"
      role="status"
    >
      {currentItem ? (
        // The 'key' prop forces React to re-mount this element when the item changes,
        // which reliably restarts the CSS 'fadeIn' animation.
        <div className="display-item" key={currentItem}>
          {currentItem}
        </div>
      ) : (
        <div className="display-placeholder">
          {t('display.placeholder')}
        </div>
      )}
    </div>
  );
};

export default DisplayArea;