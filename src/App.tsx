import React from 'react';
import { useTranslation } from 'react-i18next';

// Components
import DelayInput from './components/DelayInput';
import NoteSelector from './components/NoteSelector';
import IntervalSelector from './components/IntervalSelector';
import DisplayArea from './components/DisplayArea';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import SpeechCheckbox from './components/SpeechCheckbox';

// Hooks & Constants
import { useTrainer } from './hooks/useTrainer';
import { NOTES, INTERVALS } from './constants/music';

import './index.css';

/**
 * Main application component for the Musical Training PWA.
 * 
 * Acts as a presentation layer, wiring together the UI components 
 * with the business logic encapsulated in the useTrainer hook.
 */
const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  // Delegate all state, effects, and playback logic to the custom hook
  const {
    delay,
    setDelay,
    selectedNotes,
    setSelectedNotes,
    selectedIntervals,
    setSelectedIntervals,
    speechEnabled,
    setSpeechEnabled,
    currentItems,
    isPlaying,
    handleStart,
    handleStop,
  } = useTrainer(t, i18n.language);

  return (
     <div className="app">
      {/* Original header structure with inline styles to ensure proper alignment */}
      <div className="header">
        <h1>{t('app.title')}</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      
      <div className="delay-row">
        <div className="delay-input-wrapper">
          <DelayInput delay={delay} setDelay={setDelay} />
        </div>
        <SpeechCheckbox enabled={speechEnabled} setEnabled={setSpeechEnabled} />
      </div>
      
      <NoteSelector 
        notes={NOTES}
        selectedNotes={selectedNotes}
        setSelectedNotes={setSelectedNotes}
      />
      
      <IntervalSelector 
        intervals={INTERVALS}
        selectedIntervals={selectedIntervals}
        setSelectedIntervals={setSelectedIntervals}
      />
      
      <div className="controls">
        {!isPlaying ? (
          <button onClick={handleStart} className="btn btn-start">
            {t('controls.start')}
          </button>
        ) : (
          <button onClick={handleStop} className="btn btn-stop">
            {t('controls.stop')}
          </button>
        )}
      </div>
      {isPlaying && (
        <div className="delay-indicator">
          Интервал: {delay} сек
        </div>
      )}
      
      <DisplayArea items={currentItems} />
    </div>
  );
};

export default App;