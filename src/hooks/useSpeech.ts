// src/hooks/useSpeech.ts

import { useEffect, useRef, useCallback } from 'react';

/**
 * Return type for the useSpeech hook.
 */
export interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
}

/**
 * Custom hook for managing Web Speech API (SpeechSynthesis).
 * Handles asynchronous voice loading (crucial for Chromium-based browsers) 
 * and provides methods to speak text in the specified language or stop playback.
 * 
 * @param language - The target language code ('ru' or 'en').
 * @returns An object containing `speak` and `stop` functions.
 */
export const useSpeech = (language: string): UseSpeechReturn => {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Voices are loaded asynchronously in some browsers (especially Chrome).
    // We must listen to the 'onvoiceschanged' event to ensure the voices array is populated.
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    // Initial load attempt
    loadVoices();
    
    // Listen for changes
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Cleanup function to prevent memory leaks
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  /**
   * Speaks the provided text using the Web Speech API.
   * Automatically cancels any ongoing speech before starting a new utterance.
   * 
   * @param text - The text to be spoken.
   */
  const speak = useCallback((text: string) => {
    // Guard clause: ensure speech synthesis is available and text is not empty
    if (!window.speechSynthesis || !text) return;

    // Cancel any ongoing speech to prevent queue buildup
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure utterance properties
    utterance.lang = language === 'ru' ? 'ru-RU' : 'en-US';
    utterance.rate = 0.9;   // Slightly slower for better clarity in music training
    utterance.pitch = 1;    // Normal pitch
    utterance.volume = 1;   // Maximum volume

    // Attempt to find a voice that matches the target language
    const voices = voicesRef.current;
    const targetLang = language === 'ru' ? 'ru' : 'en';
    const matchingVoice = voices.find(
      (voice) => voice.lang.toLowerCase().startsWith(targetLang)
    );
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [language]);

  /**
   * Immediately stops any ongoing speech synthesis.
   */
  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop };
};