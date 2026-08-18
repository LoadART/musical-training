import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DelayInput from './components/DelayInput';
import NoteSelector from './components/NoteSelector';
import IntervalSelector from './components/IntervalSelector';
import DisplayArea from './components/DisplayArea';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import SpeechCheckbox from './components/SpeechCheckbox';
import { useSpeech } from './hooks/useSpeech';
import type { Note, Interval } from './types';
import './index.css';

const notes: Note[] = [
  { id: 'C', translationKey: 'notes.C' },
  { id: 'C#', translationKey: 'notes.C#' },
  { id: 'Db', translationKey: 'notes.Db' },
  { id: 'D', translationKey: 'notes.D' },
  { id: 'D#', translationKey: 'notes.D#' },
  { id: 'Eb', translationKey: 'notes.Eb' },
  { id: 'E', translationKey: 'notes.E' },
  { id: 'F', translationKey: 'notes.F' },
  { id: 'F#', translationKey: 'notes.F#' },
  { id: 'Gb', translationKey: 'notes.Gb' },
  { id: 'G', translationKey: 'notes.G' },
  { id: 'G#', translationKey: 'notes.G#' },
  { id: 'Ab', translationKey: 'notes.Ab' },
  { id: 'A', translationKey: 'notes.A' },
  { id: 'A#', translationKey: 'notes.A#' },
  { id: 'Bb', translationKey: 'notes.Bb' },
  { id: 'B', translationKey: 'notes.B' }
];

const intervals: Interval[] = [
  { id: 'prime', translationKey: 'intervals.prime' },
  { id: 'minor_second', translationKey: 'intervals.minor_second' },
  { id: 'major_second', translationKey: 'intervals.major_second' },
  { id: 'minor_third', translationKey: 'intervals.minor_third' },
  { id: 'major_third', translationKey: 'intervals.major_third' },
  { id: 'perfect_fourth', translationKey: 'intervals.perfect_fourth' },
  { id: 'tritone', translationKey: 'intervals.tritone' },
  { id: 'perfect_fifth', translationKey: 'intervals.perfect_fifth' },
  { id: 'minor_sixth', translationKey: 'intervals.minor_sixth' },
  { id: 'major_sixth', translationKey: 'intervals.major_sixth' },
  { id: 'minor_seventh', translationKey: 'intervals.minor_seventh' },
  { id: 'major_seventh', translationKey: 'intervals.major_seventh' },
  { id: 'octave', translationKey: 'intervals.octave' }
];

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { speak, stop: stopSpeech } = useSpeech(i18n.language);
  
  const [delay, setDelay] = useState<number>(() => {
    const saved = localStorage.getItem('delay');
    return saved ? parseInt(saved, 10) : 1;
  });
  
  const [selectedNotes, setSelectedNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedNotes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedIntervals, setSelectedIntervals] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedIntervals');
    return saved ? JSON.parse(saved) : [];
  });

  const [speechEnabled, setSpeechEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('speechEnabled');
    return saved === 'true';
  });
  
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Сохраняем настройки в localStorage
  useEffect(() => {
    localStorage.setItem('delay', delay.toString());
  }, [delay]);

  useEffect(() => {
    localStorage.setItem('selectedNotes', JSON.stringify(selectedNotes));
  }, [selectedNotes]);

  useEffect(() => {
    localStorage.setItem('selectedIntervals', JSON.stringify(selectedIntervals));
  }, [selectedIntervals]);

  useEffect(() => {
    localStorage.setItem('speechEnabled', speechEnabled.toString());
  }, [speechEnabled]);

  const allSelectedItems = useMemo(() => {
    const items = [
      ...selectedNotes.map(id => {
        const note = notes.find(n => n.id === id);
        return note ? t(note.translationKey) : '';
      }),
      ...selectedIntervals.map(id => {
        const interval = intervals.find(i => i.id === id);
        return interval ? t(interval.translationKey) : '';
      })
    ].filter(item => item !== '');
    
    return items;
  }, [selectedNotes, selectedIntervals, t]);

  const itemsKey = allSelectedItems.join(',');

  // Озвучиваем текущий элемент, если включено
  useEffect(() => {
    if (speechEnabled && currentItems.length > 0 && isPlaying) {
      speak(currentItems[0]);
    }
  }, [currentItems, speechEnabled, isPlaying, speak]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying && allSelectedItems.length > 0) {
      const getRandomItem = () => {
        const randomIndex = Math.floor(Math.random() * allSelectedItems.length);
        return allSelectedItems[randomIndex];
      };

      setCurrentItems([getRandomItem()]);
      
      const delayMs = delay * 1000;
      
      intervalRef.current = setInterval(() => {
        setCurrentItems([getRandomItem()]);
      }, delayMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, delay, itemsKey]);

  const handleStart = () => {
    if (allSelectedItems.length > 0) {
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentItems([]);
    stopSpeech(); // Останавливаем речь при остановке
  };

  return (
    <div className="app">
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
        notes={notes}
        selectedNotes={selectedNotes}
        setSelectedNotes={setSelectedNotes}
      />
      
      <IntervalSelector 
        intervals={intervals}
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