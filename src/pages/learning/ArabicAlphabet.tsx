import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const arabicAlphabet = [
  { letter: 'ا', name: 'Alif', transliteration: 'a', audioUrl: '' },
  { letter: 'ب', name: 'Ba', transliteration: 'b', audioUrl: '' },
  { letter: 'ت', name: 'Ta', transliteration: 't', audioUrl: '' },
  { letter: 'ث', name: 'Tha', transliteration: 'th', audioUrl: '' },
  { letter: 'ج', name: 'Jim', transliteration: 'j', audioUrl: '' },
  { letter: 'ح', name: 'Ha', transliteration: 'ḥ', audioUrl: '' },
  { letter: 'خ', name: 'Kha', transliteration: 'kh', audioUrl: '' },
  { letter: 'د', name: 'Dal', transliteration: 'd', audioUrl: '' },
  { letter: 'ذ', name: 'Dhal', transliteration: 'dh', audioUrl: '' },
  { letter: 'ر', name: 'Ra', transliteration: 'r', audioUrl: '' },
  { letter: 'ز', name: 'Zay', transliteration: 'z', audioUrl: '' },
  { letter: 'س', name: 'Sin', transliteration: 's', audioUrl: '' },
  { letter: 'ش', name: 'Shin', transliteration: 'sh', audioUrl: '' },
  { letter: 'ص', name: 'Sad', transliteration: 'ṣ', audioUrl: '' },
  { letter: 'ض', name: 'Dad', transliteration: 'ḍ', audioUrl: '' },
  { letter: 'ط', name: 'Taa', transliteration: 'ṭ', audioUrl: '' },
  { letter: 'ظ', name: 'Zha', transliteration: 'ẓ', audioUrl: '' },
  { letter: 'ع', name: 'Ayn', transliteration: '`', audioUrl: '' },
  { letter: 'غ', name: 'Ghayn', transliteration: 'gh', audioUrl: '' },
  { letter: 'ف', name: 'Fa', transliteration: 'f', audioUrl: '' },
  { letter: 'ق', name: 'Qaf', transliteration: 'q', audioUrl: '' },
  { letter: 'ك', name: 'Kaf', transliteration: 'k', audioUrl: '' },
  { letter: 'ل', name: 'Lam', transliteration: 'l', audioUrl: '' },
  { letter: 'م', name: 'Mim', transliteration: 'm', audioUrl: '' },
  { letter: 'ن', name: 'Nun', transliteration: 'n', audioUrl: '' },
  { letter: 'ه', name: 'Haa', transliteration: 'h', audioUrl: '' },
  { letter: 'و', name: 'Waw', transliteration: 'w', audioUrl: '' },
  { letter: 'ي', name: 'Ya', transliteration: 'y', audioUrl: '' },
];

// Map letter names to Arabic pronunciations
const arabicPronunciations = {
  'Alif': 'أَلِف',
  'Ba': 'بَاء',
  'Ta': 'تَاء',
  'Tha': 'ثَاء',
  'Jim': 'جِيم',
  'Ha': 'حَاء',
  'Kha': 'خَاء',
  'Dal': 'دَال',
  'Dhal': 'ذَال',
  'Ra': 'رَاء',
  'Zay': 'زَاي',
  'Sin': 'سِين',
  'Shin': 'شِين',
  'Sad': 'صَاد',
  'Dad': 'ضَاد',
  'Taa': 'طَاء',
  'Zha': 'ظَاء',
  'Ayn': 'عَيْن',
  'Ghayn': 'غَيْن',
  'Fa': 'فَاء',
  'Qaf': 'قَاف',
  'Kaf': 'كَاف',
  'Lam': 'لَام',
  'Mim': 'مِيم',
  'Nun': 'نُون',
  'Haa': 'هَاء',
  'Waw': 'وَاو',
  'Ya': 'يَاء',
};

const ArabicAlphabet: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio] = useState(new Audio());
  const [isElevenLabsAvailable, setIsElevenLabsAvailable] = useState(false);

  const currentLetter = arabicAlphabet[currentIndex];
  const progress = ((currentIndex + 1) / arabicAlphabet.length) * 100;

  const playLetterSound = () => {
    const arabicName = arabicPronunciations[currentLetter.name] || currentLetter.letter;
    
    if ('speechSynthesis' in window) {
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
    }
  };

  const handleNext = () => {
    if (currentIndex < arabicAlphabet.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const hasArabicVoice = voices.some(voice => 
          voice.lang.includes('ar') || 
          voice.name.toLowerCase().includes('arabic')
        );
        
        if (!hasArabicVoice) {
          console.log("No Arabic voice found in the system");
        }
      };
      
      window.speechSynthesis.getVoices();
    }
    
    playLetterSound();
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate('/arabic')}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Arabic Learning
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Arabic Alphabet</h1>
            <p className="text-gray-600">Learn and memorize the Arabic letters</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-8" />

          <div className="flex justify-center">
            <Card className="w-full max-w-3xl">
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  <div className="text-9xl font-arabic mb-6">{currentLetter.letter}</div>
                  
                  <div className="text-2xl font-bold mb-2">{currentLetter.name}</div>
                  <div className="text-lg mb-2 text-gray-700 font-arabic">
                    {arabicPronunciations[currentLetter.name] || currentLetter.letter}
                  </div>
                  <div className="text-gray-600 mb-4">Transliteration: {currentLetter.transliteration}</div>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="mb-8 h-16 w-16 rounded-full"
                    onClick={playLetterSound}
                  >
                    <Volume2 className="h-8 w-8" />
                  </Button>

                  <div className="flex space-x-4 w-full justify-center">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button 
                      onClick={handleNext}
                      disabled={currentIndex === arabicAlphabet.length - 1}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid grid-cols-4 md:grid-cols-7 gap-4">
            {arabicAlphabet.map((letter, index) => (
              <Button
                key={index}
                variant={index === currentIndex ? "default" : "outline"}
                className="h-16 text-2xl font-arabic"
                onClick={() => setCurrentIndex(index)}
              >
                {letter.letter}
              </Button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArabicAlphabet;
