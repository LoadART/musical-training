import React from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Dropdown component for switching the application language.
 * Persists the selected language in localStorage and updates the i18n instance.
 */
export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="language-switcher">
      <select 
        value={i18n.language} 
        onChange={handleChange}
        className="language-select"
        aria-label={t('language.switcher_label')}
      >
        <option value="ru">{t('language.ru')}</option>
        <option value="en">{t('language.en')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;