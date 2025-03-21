
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';

// Sample data for grammar lessons
const grammarLessons = [
  {
    id: 'nouns',
    title: 'Nouns and Pronouns',
    description: 'Understanding Arabic nouns (اسم) and pronouns (ضمير)',
    sections: [
      {
        title: 'What is a Noun in Arabic?',
        content: 'In Arabic, a noun (اسم) is a word that refers to a person, thing, or idea. Arabic nouns can be masculine or feminine and can be singular, dual, or plural.',
        examples: [
          { arabic: 'كتاب', transliteration: 'kitāb', translation: 'book' },
          { arabic: 'رجل', transliteration: 'rajul', translation: 'man' },
          { arabic: 'مدرسة', transliteration: 'madrasah', translation: 'school' }
        ]
      },
      {
        title: 'Personal Pronouns',
        content: 'Arabic personal pronouns (ضمائر) change based on the person, gender, and number they refer to.',
        examples: [
          { arabic: 'أنا', transliteration: 'ana', translation: 'I' },
          { arabic: 'أنت', transliteration: 'anta', translation: 'you (masculine singular)' },
          { arabic: 'أنتِ', transliteration: 'anti', translation: 'you (feminine singular)' },
          { arabic: 'هو', transliteration: 'huwa', translation: 'he' },
          { arabic: 'هي', transliteration: 'hiya', translation: 'she' }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the Arabic word for "book"?',
        options: ['كتاب', 'قلم', 'ولد', 'بيت'],
        correctAnswer: 'كتاب'
      },
      {
        question: 'Which pronoun means "she" in Arabic?',
        options: ['هو', 'هي', 'أنت', 'نحن'],
        correctAnswer: 'هي'
      }
    ]
  },
  {
    id: 'gender',
    title: 'Gender in Arabic',
    description: 'Understanding masculine and feminine nouns',
    sections: [
      {
        title: 'Masculine and Feminine',
        content: 'In Arabic, all nouns are either masculine (مذكر) or feminine (مؤنث). Generally, nouns that end with a taa marbuuta (ة) are feminine.',
        examples: [
          { arabic: 'ولد', transliteration: 'walad', translation: 'boy (masculine)' },
          { arabic: 'بنت', transliteration: 'bint', translation: 'girl (feminine)' },
          { arabic: 'معلم', transliteration: 'mu\'allim', translation: 'teacher (masculine)' },
          { arabic: 'معلمة', transliteration: 'mu\'allimah', translation: 'teacher (feminine)' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Which word is feminine?',
        options: ['كتاب', 'قلم', 'مدرسة', 'باب'],
        correctAnswer: 'مدرسة'
      }
    ]
  }
];

const GrammarLesson: React.FC = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(grammarLessons[0]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentSection = currentLesson.sections[currentSectionIndex];
  const progress = showQuiz 
    ? 100 
    : ((currentSectionIndex + 1) / currentLesson.sections.length) * 100;

  const handleNextSection = () => {
    if (currentSectionIndex < currentLesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePreviousSection = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answer;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const resetLesson = () => {
    setCurrentSectionIndex(0);
    setShowQuiz(false);
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    currentLesson.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / currentLesson.quiz.length) * 100;
  };

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
            <h1 className="text-3xl font-bold mb-2">{currentLesson.title}</h1>
            <p className="text-gray-600">{currentLesson.description}</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-8" />

          <Tabs defaultValue="lessons" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="lessons">Lesson</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              {showQuiz && <TabsTrigger value="quiz">Quiz</TabsTrigger>}
            </TabsList>

            {!showQuiz ? (
              <>
                <TabsContent value="lessons">
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentSection.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg">{currentSection.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousSection}
                        disabled={currentSectionIndex === 0}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                      <Button onClick={handleNextSection}>
                        {currentSectionIndex < currentLesson.sections.length - 1 ? (
                          <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                        ) : (
                          <>Take Quiz <ChevronRight className="ml-2 h-4 w-4" /></>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="examples">
                  <Card>
                    <CardHeader>
                      <CardTitle>Examples</CardTitle>
                      <CardDescription>Practice with these examples</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {currentSection.examples.map((example, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div className="mb-2 text-right">
                              <span className="text-xl font-arabic">{example.arabic}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>{example.translation}</span>
                              <span>{example.transliteration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousSection}
                        disabled={currentSectionIndex === 0}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                      <Button onClick={handleNextSection}>
                        {currentSectionIndex < currentLesson.sections.length - 1 ? (
                          <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                        ) : (
                          <>Take Quiz <ChevronRight className="ml-2 h-4 w-4" /></>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </>
            ) : (
              <TabsContent value="quiz">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Time</CardTitle>
                    <CardDescription>Test your understanding of {currentLesson.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {quizSubmitted ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">Quiz Result</div>
                          <div className="text-4xl font-bold mb-4">{Math.round(calculateScore())}%</div>
                          {calculateScore() >= 70 ? (
                            <div className="flex items-center justify-center text-green-600">
                              <CheckCircle2 className="mr-2" /> Congratulations! You've passed.
                            </div>
                          ) : (
                            <div className="text-amber-600">
                              Try again to improve your score.
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          {currentLesson.quiz.map((question, qIndex) => (
                            <div key={qIndex} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                              <div className="font-medium mb-2">{question.question}</div>
                              <div className="space-y-2">
                                {question.options.map((option, oIndex) => (
                                  <div 
                                    key={oIndex} 
                                    className={`p-2 rounded-md border ${
                                      option === quizAnswers[qIndex] && option === question.correctAnswer
                                        ? 'bg-green-100 border-green-300'
                                        : option === quizAnswers[qIndex] && option !== question.correctAnswer
                                        ? 'bg-red-100 border-red-300'
                                        : option === question.correctAnswer
                                        ? 'bg-green-50 border-green-200'
                                        : 'border-gray-200'
                                    }`}
                                  >
                                    {option}
                                    {option === question.correctAnswer && (
                                      <span className="ml-2 text-green-600">✓</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {currentLesson.quiz.map((question, qIndex) => (
                          <div key={qIndex} className="space-y-3">
                            <div className="font-medium">{question.question}</div>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div 
                                  key={oIndex} 
                                  className={`p-3 rounded-md border cursor-pointer ${
                                    quizAnswers[qIndex] === option 
                                      ? 'bg-blue-50 border-blue-300' 
                                      : 'hover:bg-gray-50 border-gray-200'
                                  }`}
                                  onClick={() => handleQuizAnswer(qIndex, option)}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {!quizSubmitted ? (
                      <>
                        <Button variant="outline" onClick={handlePreviousSection}>
                          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Lesson
                        </Button>
                        <Button 
                          onClick={handleQuizSubmit}
                          disabled={quizAnswers.length < currentLesson.quiz.length}
                        >
                          Submit Quiz
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={resetLesson}>
                          <BookOpen className="mr-2 h-4 w-4" /> Review Lesson
                        </Button>
                        <Button onClick={() => navigate('/arabic')}>
                          Continue Learning
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GrammarLesson;
