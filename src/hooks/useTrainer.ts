import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSpeech } from './useSpeech';
import { NOTES, INTERVALS } from '../constants/music'; 

/**
 * Return type for the useTrainer hook, providing both state and actions.
 */
export interface UseTrainerReturn {
  delay: number;
  setDelay: (delay: number) => void;
  selectedNotes: string[];
  setSelectedNotes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIntervals: string[];
  setSelectedIntervals: React.Dispatch<React.SetStateAction<string[]>>;
  speechEnabled: boolean;
  setSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  currentItems: string[];
  isPlaying: boolean;
  handleStart: () => void;
  handleStop: () => void;
}

/**
 * Custom hook that encapsulates the core business logic of the music trainer.
 * Manages persistent settings, playback state, interval timing, and speech synthesis.
 * Implements a "deck" shuffling mechanism to prevent immediate repetition of items.
 * 
 * @param t - Translation function from react-i18next
 * @param language - Current language code (e.g., 'ru' or 'en') for speech synthesis
 * @returns Object containing trainer state and control functions.
 */
export const useTrainer = (t: (key: string) => string, language: string): UseTrainerReturn => {
  const { speak, stop: stopSpeech } = useSpeech(language);

  // --- State Initialization with LocalStorage fallback ---
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

  // --- Deck Management for Non-Repeating Random Selection ---
  const deckRef = useRef<string[]>([]);
  const deckIndexRef = useRef<number>(0);
  const lastPlayedRef = useRef<string | null>(null);
  /**
   * Fisher-Yates shuffle algorithm to randomize array order in place.
   * Ensures a truly uniform distribution of items.
   */
  const shuffleArray = useCallback((array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

    /**
   * Retrieves the next item from the shuffled deck.
   * Automatically reshuffles the deck when all items have been exhausted.
   * Includes a strict check to prevent the same item from playing twice in a row across deck boundaries.
   */
  const getNextItem = useCallback((): string => {
    if (deckRef.current.length === 0) return '';
    
    // Reshuffle if we've reached the end of the current deck
    if (deckIndexRef.current >= deckRef.current.length) {
      deckRef.current = shuffleArray(deckRef.current);
      deckIndexRef.current = 0;

      // STRICT NO-REPEAT CHECK:
      // If the new first item is the same as the last played item, swap it with the last item in the deck.
      if (
        deckRef.current.length > 1 && 
        deckRef.current[0] === lastPlayedRef.current
      ) {
        const lastIndex = deckRef.current.length - 1;
        // Swap first and last elements
        [deckRef.current[0], deckRef.current[lastIndex]] = [
          deckRef.current[lastIndex],
          deckRef.current[0]
        ];
      }
    }
    
    const item = deckRef.current[deckIndexRef.current];
    lastPlayedRef.current = item; // Remember what we are about to play
    deckIndexRef.current += 1;
    
    return item;
  }, [shuffleArray]);

  // --- Persistence Effects ---
  useEffect(() => { localStorage.setItem('delay', delay.toString()); }, [delay]);
  useEffect(() => { localStorage.setItem('selectedNotes', JSON.stringify(selectedNotes)); }, [selectedNotes]);
  useEffect(() => { localStorage.setItem('selectedIntervals', JSON.stringify(selectedIntervals)); }, [selectedIntervals]);
  useEffect(() => { localStorage.setItem('speechEnabled', speechEnabled.toString()); }, [speechEnabled]);

  // --- Memoized Pool of Items to Play ---
  const allSelectedItems = useMemo(() => {
    const items = [
      ...selectedNotes.map(id => {
        const note = NOTES.find(n => n.id === id);
        return note ? t(note.translationKey) : '';
      }),
      ...selectedIntervals.map(id => {
        const interval = INTERVALS.find(i => i.id === id);
        return interval ? t(interval.translationKey) : '';
      })
    ].filter(item => item !== '');
    
    return items;
  }, [selectedNotes, selectedIntervals, t]);

  // Re-initialize the deck whenever the pool of selected items changes
  useEffect(() => {
    if (allSelectedItems.length > 0) {
      deckRef.current = shuffleArray(allSelectedItems);
      deckIndexRef.current = 0;
    } else {
      deckRef.current = [];
      deckIndexRef.current = 0;
    }
  }, [allSelectedItems, shuffleArray]);

  // Using a stringified key to trigger the interval effect when the pool of items changes
  const itemsKey = allSelectedItems.join(',');

  // --- Speech Trigger Effect ---
  useEffect(() => {
    if (speechEnabled && currentItems.length > 0 && isPlaying) {
      speak(currentItems[0]);
    }
  }, [currentItems, speechEnabled, isPlaying, speak]);

  // --- Playback Interval Effect ---
  useEffect(() => {
    // Clear existing interval to prevent multiple timers running simultaneously
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying && allSelectedItems.length > 0) {
      // Play the first item immediately
      setCurrentItems([getNextItem()]);
      
      const delayMs = delay * 1000;
      
      // Set up the interval for subsequent items
      intervalRef.current = setInterval(() => {
        setCurrentItems([getNextItem()]);
      }, delayMs);
    }

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, delay, itemsKey, getNextItem]);

  // --- Control Handlers ---
  const handleStart = useCallback(() => {
    if (allSelectedItems.length > 0) {
      setIsPlaying(true);
    }
  }, [allSelectedItems.length]);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setCurrentItems([]);
    stopSpeech();
  }, [stopSpeech]);

  return {
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
  };
};