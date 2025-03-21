
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { arabicAlphabet } from '@/data/arabicAlphabet';
import { playArabicSound, checkArabicVoiceAvailability } from '@/utils/arabicSpeech';
import LetterGrid from '@/components/learning/LetterGrid';
import LetterDisplayCard from '@/components/learning/LetterDisplayCard';
import LearningProgress from '@/components/learning/LearningProgress';

const ArabicAlphabet: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isElevenLabsAvailable, setIsElevenLabsAvailable] = useState(false);

  const currentLetter = arabicAlphabet[currentIndex];

  const handlePlaySound = () => {
    playArabicSound(currentLetter.name, isElevenLabsAvailable);
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

  const handleLetterSelect = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Check if browser supports Arabic voices
    const checkArabicVoice = checkArabicVoiceAvailability();
    
    if (!checkArabicVoice()) {
      console.log("No Arabic voice found in the system");
    }
    
    // Play the sound when the letter changes
    handlePlaySound();
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

          <LearningProgress 
            current={currentIndex} 
            total={arabicAlphabet.length} 
          />

          <div className="flex justify-center mb-12">
            <LetterDisplayCard
              letter={currentLetter}
              onPlaySound={handlePlaySound}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isFirst={currentIndex === 0}
              isLast={currentIndex === arabicAlphabet.length - 1}
            />
          </div>

          <LetterGrid 
            letters={arabicAlphabet}
            currentIndex={currentIndex}
            onLetterSelect={handleLetterSelect}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArabicAlphabet;
