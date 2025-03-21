
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft, ChevronRight, 
  Volume2, Search, Bookmark,
  ArrowLeftRight, Check, X
} from 'lucide-react';

// Sample data for Quranic vocabulary
const quranicWords = [
  { id: 1, arabic: 'الله', transliteration: 'Allah', meaning: 'God', frequency: 2699, audioUrl: '' },
  { id: 2, arabic: 'رب', transliteration: 'Rabb', meaning: 'Lord', frequency: 970, audioUrl: '' },
  { id: 3, arabic: 'الرحمن', transliteration: 'Ar-Rahman', meaning: 'The Most Gracious', frequency: 57, audioUrl: '' },
  { id: 4, arabic: 'الرحيم', transliteration: 'Ar-Raheem', meaning: 'The Most Merciful', frequency: 114, audioUrl: '' },
  { id: 5, arabic: 'يوم', transliteration: 'Yawm', meaning: 'Day', frequency: 365, audioUrl: '' },
  { id: 6, arabic: 'دين', transliteration: 'Deen', meaning: 'Religion/Judgment', frequency: 92, audioUrl: '' },
  { id: 7, arabic: 'ملك', transliteration: 'Malik', meaning: 'King/Owner', frequency: 49, audioUrl: '' },
  { id: 8, arabic: 'عبد', transliteration: 'Abd', meaning: 'Servant/Slave', frequency: 143, audioUrl: '' },
  { id: 9, arabic: 'نعبد', transliteration: 'Na\'budu', meaning: 'We worship', frequency: 5, audioUrl: '' },
  { id: 10, arabic: 'نستعين', transliteration: 'Nasta\'een', meaning: 'We seek help', frequency: 1, audioUrl: '' },
  { id: 11, arabic: 'اهدنا', transliteration: 'Ihdina', meaning: 'Guide us', frequency: 3, audioUrl: '' },
  { id: 12, arabic: 'صراط', transliteration: 'Sirat', meaning: 'Path', frequency: 45, audioUrl: '' },
  { id: 13, arabic: 'مستقيم', transliteration: 'Mustaqeem', meaning: 'Straight', frequency: 37, audioUrl: '' },
  { id: 14, arabic: 'أنعمت', transliteration: 'An\'amta', meaning: 'You have bestowed favor', frequency: 16, audioUrl: '' },
  { id: 15, arabic: 'غير', transliteration: 'Ghayr', meaning: 'Not/Other than', frequency: 147, audioUrl: '' },
];

type StudyMode = 'cards' | 'quiz' | 'writing';

const QuranicVocabulary: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkedWords, setBookmarkedWords] = useState<number[]>([]);
  const [studyMode, setStudyMode] = useState<StudyMode>('cards');
  const [showArabic, setShowArabic] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<{ wordId: number, selectedMeaning: string }[]>([]);
  const [quizCorrect, setQuizCorrect] = useState<number[]>([]);
  const [quizWrong, setQuizWrong] = useState<number[]>([]);

  const filteredWords = searchTerm 
    ? quranicWords.filter(word => 
        word.arabic.includes(searchTerm) || 
        word.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : quranicWords;

  const currentWord = filteredWords[currentIndex];
  const progress = ((currentIndex + 1) / filteredWords.length) * 100;

  const playWordSound = () => {
    // In a real implementation, this would use actual audio files
    // For now, we'll use the Web Speech API as a placeholder
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.arabic);
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleBookmark = (wordId: number) => {
    if (bookmarkedWords.includes(wordId)) {
      setBookmarkedWords(bookmarkedWords.filter(id => id !== wordId));
    } else {
      setBookmarkedWords([...bookmarkedWords, wordId]);
    }
  };

  const generateQuiz = () => {
    // Create a quiz with the first 10 words (or all if less than 10)
    const quizWords = filteredWords.slice(0, Math.min(10, filteredWords.length));
    
    // For each quiz word, create a question with options
    return quizWords.map(word => {
      // Get 3 random different meanings (excluding the correct one)
      const otherMeanings = quranicWords
        .filter(w => w.id !== word.id)
        .map(w => w.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      // Add the correct meaning and shuffle
      const allOptions = [...otherMeanings, word.meaning].sort(() => 0.5 - Math.random());
      
      return {
        wordId: word.id,
        word: word.arabic,
        transliteration: word.transliteration,
        options: allOptions,
        correctAnswer: word.meaning
      };
    });
  };

  const [quizQuestions, setQuizQuestions] = useState(() => generateQuiz());

  const handleQuizAnswer = (wordId: number, selectedMeaning: string) => {
    // Find the word to check the answer
    const word = quranicWords.find(w => w.id === wordId);
    
    // Record the answer
    setQuizAnswers([...quizAnswers, { wordId, selectedMeaning }]);
    
    // Check if correct
    if (word && word.meaning === selectedMeaning) {
      setQuizCorrect([...quizCorrect, wordId]);
    } else {
      setQuizWrong([...quizWrong, wordId]);
    }
  };

  const resetQuiz = () => {
    setQuizQuestions(generateQuiz());
    setQuizAnswers([]);
    setQuizCorrect([]);
    setQuizWrong([]);
  };

  useEffect(() => {
    // When the mode changes to quiz, generate questions
    if (studyMode === 'quiz') {
      resetQuiz();
    }
  }, [studyMode]);

  useEffect(() => {
    // Play sound when word changes
    if (studyMode === 'cards') {
      playWordSound();
    }
  }, [currentIndex, studyMode]);

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
            <h1 className="text-3xl font-bold mb-2">Quranic Vocabulary</h1>
            <p className="text-gray-600">Learn the most frequently used words in the Quran</p>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentIndex(0);
                }}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={studyMode === 'cards' ? 'default' : 'outline'} 
                onClick={() => setStudyMode('cards')}
              >
                Flashcards
              </Button>
              <Button 
                variant={studyMode === 'quiz' ? 'default' : 'outline'} 
                onClick={() => setStudyMode('quiz')}
              >
                Quiz
              </Button>
              <Button 
                variant={studyMode === 'writing' ? 'default' : 'outline'} 
                onClick={() => setStudyMode('writing')}
              >
                Writing
              </Button>
            </div>
          </div>

          {studyMode === 'cards' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Word {currentIndex + 1} of {filteredWords.length}</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 mb-8" />

              <div className="flex justify-center mb-12">
                <Card className="w-full max-w-2xl">
                  <CardContent className="p-8">
                    <div className="flex justify-end mb-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleBookmark(currentWord.id)}
                      >
                        <Bookmark 
                          className={`h-5 w-5 ${bookmarkedWords.includes(currentWord.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                        />
                      </Button>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-8">
                        {showArabic ? (
                          <div className="text-6xl font-arabic mb-4">{currentWord.arabic}</div>
                        ) : (
                          <div className="text-3xl font-bold mb-4">{currentWord.meaning}</div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          onClick={() => setShowArabic(!showArabic)}
                          className="mb-2"
                        >
                          <ArrowLeftRight className="mr-2 h-4 w-4" />
                          Flip Card
                        </Button>
                      </div>
                      
                      {showArabic && (
                        <div className="text-xl mb-2">{currentWord.meaning}</div>
                      )}
                      
                      <div className="text-gray-600 mb-6">Transliteration: {currentWord.transliteration}</div>
                      
                      <div className="text-sm text-gray-500 mb-8">
                        Appears {currentWord.frequency} times in the Quran
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="mb-8 h-16 w-16 rounded-full"
                        onClick={playWordSound}
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
                          disabled={currentIndex === filteredWords.length - 1}
                        >
                          Next <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Word List</h2>
                <ScrollArea className="h-64 rounded-md border">
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredWords.map((word, index) => (
                        <div 
                          key={word.id}
                          className={`p-3 rounded-md border cursor-pointer hover:bg-gray-50 flex justify-between items-center ${index === currentIndex ? 'bg-blue-50 border-blue-300' : ''}`}
                          onClick={() => setCurrentIndex(index)}
                        >
                          <div>
                            <div className="font-arabic text-lg">{word.arabic}</div>
                            <div className="text-sm text-gray-600">{word.meaning}</div>
                          </div>
                          {bookmarkedWords.includes(word.id) && (
                            <Bookmark className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </>
          )}

          {studyMode === 'quiz' && (
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Vocabulary Quiz</CardTitle>
                  <CardDescription>Select the correct meaning for each Arabic word</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {quizQuestions.map((question, qIndex) => {
                      const isAnswered = quizAnswers.some(a => a.wordId === question.wordId);
                      const isCorrect = quizCorrect.includes(question.wordId);
                      const isWrong = quizWrong.includes(question.wordId);
                      
                      return (
                        <div key={qIndex} className="border rounded-lg p-4">
                          <div className="mb-4">
                            <div className="text-3xl font-arabic text-center mb-2">{question.word}</div>
                            <div className="text-center text-gray-600">{question.transliteration}</div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {question.options.map((option, oIndex) => {
                              const isSelected = quizAnswers.some(a => a.wordId === question.wordId && a.selectedMeaning === option);
                              const isCorrectOption = option === question.correctAnswer;
                              
                              let buttonClass = "justify-between hover:bg-gray-50";
                              
                              if (isAnswered) {
                                if (isSelected && isCorrect) {
                                  buttonClass = "bg-green-50 border-green-500 hover:bg-green-50";
                                } else if (isSelected && isWrong) {
                                  buttonClass = "bg-red-50 border-red-500 hover:bg-red-50";
                                } else if (isCorrectOption) {
                                  buttonClass = "bg-green-50 border-green-500 hover:bg-green-50";
                                }
                              }
                              
                              return (
                                <Button
                                  key={oIndex}
                                  variant="outline"
                                  className={buttonClass}
                                  disabled={isAnswered}
                                  onClick={() => handleQuizAnswer(question.wordId, option)}
                                >
                                  <span>{option}</span>
                                  {isAnswered && isCorrectOption && (
                                    <Check className="h-5 w-5 text-green-600" />
                                  )}
                                  {isAnswered && isSelected && !isCorrectOption && (
                                    <X className="h-5 w-5 text-red-600" />
                                  )}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    {quizAnswers.length === quizQuestions.length && (
                      <div className="text-lg">
                        Score: {quizCorrect.length}/{quizQuestions.length} ({Math.round((quizCorrect.length / quizQuestions.length) * 100)}%)
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={resetQuiz} 
                    disabled={quizAnswers.length === 0}
                  >
                    Reset Quiz
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {studyMode === 'writing' && (
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Writing Practice</CardTitle>
                  <CardDescription>Practice writing Arabic words</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <div className="text-6xl font-arabic mb-6">{currentWord.arabic}</div>
                    <div className="text-xl mb-2">{currentWord.meaning}</div>
                    <div className="text-gray-600 mb-8">Transliteration: {currentWord.transliteration}</div>
                    
                    <div className="bg-gray-50 p-6 rounded-md mb-8">
                      <p className="text-gray-600 mb-4">Practice writing this word on paper or use a digital writing tool.</p>
                      <Button 
                        onClick={playWordSound}
                        variant="outline"
                        className="mb-2"
                      >
                        <Volume2 className="mr-2 h-4 w-4" /> Hear Pronunciation
                      </Button>
                    </div>
                    
                    <div className="flex space-x-4 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous Word
                      </Button>
                      <Button 
                        onClick={handleNext}
                        disabled={currentIndex === filteredWords.length - 1}
                      >
                        Next Word <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuranicVocabulary;
