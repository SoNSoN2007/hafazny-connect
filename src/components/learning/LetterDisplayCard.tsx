
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { ArabicLetter } from "@/data/arabicAlphabet";
import { arabicPronunciations } from "@/data/arabicAlphabet";

interface LetterDisplayCardProps {
  letter: ArabicLetter;
  onPlaySound: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const LetterDisplayCard: React.FC<LetterDisplayCardProps> = ({
  letter,
  onPlaySound,
  onPrevious,
  onNext,
  isFirst,
  isLast
}) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-8">
        <div className="flex flex-col items-center">
          <div className="text-9xl font-arabic mb-6">{letter.letter}</div>
          
          <div className="text-2xl font-bold mb-2">{letter.name}</div>
          <div className="text-lg mb-2 text-gray-700 font-arabic">
            {arabicPronunciations[letter.name] || letter.letter}
          </div>
          <div className="text-gray-600 mb-4">Transliteration: {letter.transliteration}</div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="mb-8 h-16 w-16 rounded-full"
            onClick={onPlaySound}
          >
            <Volume2 className="h-8 w-8" />
          </Button>

          <div className="flex space-x-4 w-full justify-center">
            <Button 
              variant="outline" 
              onClick={onPrevious}
              disabled={isFirst}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={onNext}
              disabled={isLast}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LetterDisplayCard;
