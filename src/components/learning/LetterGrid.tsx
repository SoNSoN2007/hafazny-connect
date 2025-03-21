
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArabicLetter } from "@/data/arabicAlphabet";

interface LetterGridProps {
  letters: ArabicLetter[];
  currentIndex: number;
  onLetterSelect: (index: number) => void;
}

const LetterGrid: React.FC<LetterGridProps> = ({ 
  letters, 
  currentIndex, 
  onLetterSelect 
}) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
      {letters.map((letter, index) => (
        <Button
          key={index}
          variant={index === currentIndex ? "default" : "outline"}
          className="h-16 text-2xl font-arabic"
          onClick={() => onLetterSelect(index)}
        >
          {letter.letter}
        </Button>
      ))}
    </div>
  );
};

export default LetterGrid;
