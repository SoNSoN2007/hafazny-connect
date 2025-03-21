
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Play, Mic, Volume2 } from 'lucide-react';

// Sample tajweed lessons
const tajweedLessons = [
  {
    id: 'intro',
    title: 'Introduction to Tajweed',
    description: 'Learn the basic principles of Tajweed',
    sections: [
      {
        title: 'What is Tajweed?',
        content: 'Tajweed (تجويد) is the set of rules governing how the Quran should be read or recited. It is an Arabic word that means "to make better" or "to improve." The aim of tajweed is to read the Quran as closely as possible to how the Prophet Muhammad (peace be upon him) recited it.',
        audioUrl: ''
      },
      {
        title: 'Importance of Tajweed',
        content: 'Learning and applying the rules of tajweed is essential for several reasons. First, it helps avoid errors in recitation that could change the meaning of the words. Second, it ensures the beauty and eloquence of the Quranic recitation. Third, it is considered a form of respecting the divine revelation.',
        audioUrl: ''
      }
    ],
    examples: [
      {
        text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
        explanation: 'This verse contains several tajweed rules including the clear pronunciation of each letter, the proper elongation (madd) of certain sounds, and the correct articulation points (makharij).',
        audioUrl: ''
      }
    ],
    practice: {
      instructions: 'Listen to the recitation and try to identify the correct tajweed rules being applied.',
      exercises: [
        {
          text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          question: 'Which tajweed rule is applied in the word الْحَمْدُ?',
          options: [
            'Idgham (Merging)',
            'Ikhfa (Hiding)',
            'Izhar (Clear pronunciation)',
            'Iqlab (Conversion)'
          ],
          correctAnswer: 'Izhar (Clear pronunciation)'
        }
      ]
    }
  },
  {
    id: 'articulation',
    title: 'Articulation Points',
    description: 'Understanding Makharij Al-Huruf',
    sections: [
      {
        title: 'What are Articulation Points?',
        content: 'Makharij al-huruf (مخارج الحروف) refers to the points of articulation, or the places in the mouth, throat, and lips from where the sounds of the Arabic letters originate. Knowing these points is essential for correct pronunciation.',
        audioUrl: ''
      },
      {
        title: 'The Five Main Areas of Articulation',
        content: 'The articulation points are divided into five main areas:\n\n1. Al-Jawf (الجوف) - The empty space in the mouth and throat for vowel sounds\n2. Al-Halq (الحلق) - The throat\n3. Al-Lisan (اللسان) - The tongue\n4. Ash-Shafatan (الشفتان) - The lips\n5. Al-Khayshum (الخيشوم) - The nasal passage',
        audioUrl: ''
      }
    ],
    examples: [
      {
        text: 'ح خ ع غ ه ء',
        translation: 'Letters from the throat (Al-Halq)',
        explanation: 'These letters are pronounced from different parts of the throat. The ح and ع are from the middle of the throat, the خ and غ are from the top of the throat, and the ه and ء are from the bottom of the throat.',
        audioUrl: ''
      },
      {
        text: 'ب م و',
        translation: 'Letters from the lips (Ash-Shafatan)',
        explanation: 'These letters are pronounced using the lips. The ب is pronounced by closing both lips, the م by closing the lips with a nasal sound, and the و by rounding the lips.',
        audioUrl: ''
      }
    ],
    practice: {
      instructions: 'Practice pronouncing these letters from their correct articulation points.',
      exercises: [
        {
          text: 'ق ك',
          question: 'From which part of the mouth are these letters pronounced?',
          options: [
            'Tip of the tongue',
            'Back of the tongue',
            'Lips',
            'Throat'
          ],
          correctAnswer: 'Back of the tongue'
        }
      ]
    }
  }
];

const TajweedLesson: React.FC = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(tajweedLessons[0]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [activeTabs, setActiveTabs] = useState({
    lesson: true,
    examples: false,
    practice: false
  });
  const [practiceAnswers, setPracticeAnswers] = useState<string[]>([]);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  const currentSection = currentLesson.sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / currentLesson.sections.length) * 100;

  const handleNextSection = () => {
    if (currentSectionIndex < currentLesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // Move to examples tab when done with sections
      setActiveTabs({ lesson: false, examples: true, practice: false });
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const playAudio = (audioUrl: string) => {
    // In a real implementation, this would play an actual audio file
    // For now, we'll use the Web Speech API as a placeholder
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("This is a placeholder for Tajweed audio");
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePracticeAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...practiceAnswers];
    newAnswers[questionIndex] = answer;
    setPracticeAnswers(newAnswers);
  };

  const handlePracticeSubmit = () => {
    setPracticeSubmitted(true);
  };

  const resetPractice = () => {
    setPracticeAnswers([]);
    setPracticeSubmitted(false);
  };

  const handleStartRecording = () => {
    // In a real implementation, this would start recording audio
    alert('Recording would start here. This is a placeholder for the recording functionality.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate('/tajweed')}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Tajweed Learning
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{currentLesson.title}</h1>
            <p className="text-gray-600">{currentLesson.description}</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Section {currentSectionIndex + 1} of {currentLesson.sections.length}</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-8" />

          <Tabs 
            defaultValue="lesson" 
            value={
              activeTabs.lesson 
                ? "lesson" 
                : activeTabs.examples 
                ? "examples" 
                : "practice"
            }
            onValueChange={(value) => {
              setActiveTabs({
                lesson: value === "lesson",
                examples: value === "examples",
                practice: value === "practice"
              });
            }}
            className="mb-8"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="lesson">Lesson</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="lesson">
              <Card>
                <CardHeader>
                  <CardTitle>{currentSection.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert mb-8">
                    {currentSection.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
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
                      <>Examples <ChevronRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Examples</CardTitle>
                  <CardDescription>Listen and practice with these examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {currentLesson.examples.map((example, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="mb-4 text-center">
                          <div className="text-2xl font-arabic mb-2">{example.text}</div>
                          <div className="text-gray-600 text-sm">{example.translation}</div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Explanation:</h4>
                          <p className="text-gray-700">{example.explanation}</p>
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                          <Button 
                            variant="outline" 
                            onClick={() => playAudio(example.audioUrl)}
                          >
                            <Play className="mr-2 h-4 w-4" /> Listen
                          </Button>
                          <Button onClick={handleStartRecording}>
                            <Mic className="mr-2 h-4 w-4" /> Practice
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTabs({ lesson: true, examples: false, practice: false })}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Lesson
                  </Button>
                  <Button onClick={() => setActiveTabs({ lesson: false, examples: false, practice: true })}>
                    Practice <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Exercises</CardTitle>
                  <CardDescription>{currentLesson.practice.instructions}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {currentLesson.practice.exercises.map((exercise, eIndex) => (
                      <div key={eIndex} className="border rounded-lg p-4">
                        <div className="mb-4 text-center">
                          <div className="text-2xl font-arabic mb-2">{exercise.text}</div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mb-4"
                            onClick={() => playAudio('')}
                          >
                            <Volume2 className="mr-2 h-4 w-4" /> Listen
                          </Button>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-3">{exercise.question}</h4>
                          
                          <div className="space-y-2">
                            {exercise.options.map((option, oIndex) => {
                              const isSelected = practiceAnswers[eIndex] === option;
                              const isCorrect = practiceSubmitted && option === exercise.correctAnswer;
                              const isWrong = practiceSubmitted && isSelected && option !== exercise.correctAnswer;
                              
                              let buttonClass = "justify-between hover:bg-gray-50";
                              
                              if (practiceSubmitted) {
                                if (isCorrect) {
                                  buttonClass = "bg-green-50 border-green-500 hover:bg-green-50";
                                } else if (isWrong) {
                                  buttonClass = "bg-red-50 border-red-500 hover:bg-red-50";
                                }
                              } else if (isSelected) {
                                buttonClass = "bg-blue-50 border-blue-300";
                              }
                              
                              return (
                                <Button
                                  key={oIndex}
                                  variant="outline"
                                  className={buttonClass}
                                  disabled={practiceSubmitted}
                                  onClick={() => handlePracticeAnswer(eIndex, option)}
                                >
                                  {option}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTabs({ lesson: false, examples: true, practice: false })}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Examples
                  </Button>
                  
                  {!practiceSubmitted ? (
                    <Button 
                      onClick={handlePracticeSubmit}
                      disabled={practiceAnswers.length < currentLesson.practice.exercises.length}
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <div className="flex items-center text-lg mr-4">
                        Score: {practiceAnswers.filter((answer, index) => 
                          answer === currentLesson.practice.exercises[index].correctAnswer
                        ).length}/{currentLesson.practice.exercises.length}
                      </div>
                      <Button onClick={resetPractice}>
                        Try Again
                      </Button>
                      <Button onClick={() => navigate('/tajweed')}>
                        Complete Lesson
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TajweedLesson;
