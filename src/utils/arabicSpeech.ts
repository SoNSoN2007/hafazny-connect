
import { toast } from "@/components/ui/use-toast";
import { arabicPronunciations } from "@/data/arabicAlphabet";

/**
 * Play the sound of an Arabic letter or word using browser's speech synthesis
 * @param letterName The name of the letter to pronounce
 * @param isElevenLabsAvailable Whether a better TTS service is available
 */
export const playArabicSound = (letterName: string, isElevenLabsAvailable = false): void => {
  if (!('speechSynthesis' in window)) {
    toast({
      title: "Speech synthesis not supported",
      description: "Your browser doesn't support text-to-speech functionality",
      duration: 3000,
    });
    return;
  }

  const arabicName = arabicPronunciations[letterName] || letterName;
  
  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(voice => 
    voice.lang.includes('ar') || 
    voice.name.toLowerCase().includes('arabic')
  );
  
  const utterance = new SpeechSynthesisUtterance(arabicName);
  utterance.lang = 'ar-SA';
  
  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }
  
  utterance.rate = 0.8;
  
  window.speechSynthesis.speak(utterance);
  
  if (!isElevenLabsAvailable) {
    toast({
      title: "Basic Text-to-Speech",
      description: "For better Arabic pronunciation, consider using ElevenLabs TTS API",
      duration: 3000,
    });
  }
};

/**
 * Check if an Arabic voice is available in the browser
 * @returns A function to check for Arabic voice availability
 */
export const checkArabicVoiceAvailability = (): (() => boolean) => {
  const checkForArabicVoice = () => {
    if (!('speechSynthesis' in window)) return false;
    
    const voices = window.speechSynthesis.getVoices();
    return voices.some(voice => 
      voice.lang.includes('ar') || 
      voice.name.toLowerCase().includes('arabic')
    );
  };

  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }

  return checkForArabicVoice;
};
