// src/hooks/useSpeech.ts

import { useEffect, useRef, useCallback } from 'react';

export interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
}

/**
 * Custom hook for managing Web Speech API (SpeechSynthesis).
 * Handles cross-platform text normalization for consistent pronunciation.
 */
export const useSpeech = (language: string): UseSpeechReturn => {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  /**
   * Normalizes musical notation text for consistent cross-platform pronunciation.
   * Replaces symbols with spoken words to avoid iOS/macOS quirks.
   */
const normalizeText = useCallback((text: string): string => {
  let normalized = text;

  if (language === 'en') {
    // Handle notes with sharps/flats FIRST (before replacing symbols)
    normalized = normalized
      .replace(/^C#/i, 'see sharp')
      .replace(/^D#/i, 'dee sharp')
      .replace(/^F#/i, 'f sharp')
      .replace(/^G#/i, 'jee sharp')
      .replace(/^A#/i, 'ay sharp')
      .replace(/^Db/i, 'dee flat')
      .replace(/^Eb/i, 'ee flat')
      .replace(/^Gb/i, 'jee flat')
      .replace(/^Ab/i, 'ay flat')
      .replace(/^Bb/i, 'bee flat')
      // Then handle natural notes
      .replace(/^C\b/i, 'see')
      .replace(/^D\b/i, 'dee')
      .replace(/^E\b/i, 'ee')
      .replace(/^F\b/i, 'f')
      .replace(/^G\b/i, 'jee')
      .replace(/^A\b/i, 'ay')
      .replace(/^B\b/i, 'bee');
  } else {
    // For Russian, just replace symbols
    normalized = normalized
      .replace(/#/g, ' sharp')
      .replace(/b/g, ' flat')
      .replace(/♯/g, ' sharp')
      .replace(/♭/g, ' flat');
  }

  return normalized.trim();
}, [language]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text) return;

    window.speechSynthesis.cancel();

    // Normalize text for cross-platform consistency
    const normalizedText = normalizeText(text);

    const utterance = new SpeechSynthesisUtterance(normalizedText);
    
    utterance.lang = language === 'ru' ? 'ru-RU' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = voicesRef.current;
    const targetLang = language === 'ru' ? 'ru' : 'en';
    const matchingVoice = voices.find(
      (voice) => voice.lang.toLowerCase().startsWith(targetLang)
    );
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [language, normalizeText]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop };
};