import { useEffect, useRef } from 'react';

export const useSpeech = (language: string) => {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Загружаем голоса (в некоторых браузерах они загружаются асинхронно)
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    // Отменяем предыдущую речь, если она ещё идёт
    window.speechSynthesis.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Устанавливаем язык
    utterance.lang = language === 'ru' ? 'ru-RU' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Пытаемся найти подходящий голос
    const voices = voicesRef.current;
    const targetLang = language === 'ru' ? 'ru' : 'en';
    const matchingVoice = voices.find(
      voice => voice.lang.toLowerCase().startsWith(targetLang)
    );
    
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
  };

  return { speak, stop };
};