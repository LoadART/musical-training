import React from 'react';
import { useTranslation } from 'react-i18next';

interface DisplayAreaProps {
  items: string[];
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className="display-area">
      {items.length > 0 ? (
        <div className="display-item">
          {items[0]}
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