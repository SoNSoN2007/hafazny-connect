import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Languages, MessageCircle, FileText, Globe, Check, Trophy } from 'lucide-react';
import { arabicLessons } from '@/lib/quranData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const Arabic: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // Filter lessons by selected level
  const filteredLessons = arabicLessons.filter(lesson => lesson.level === selectedLevel);

  const handleStartLesson = (lessonType: string) => {
    switch (lessonType) {
      case 'alphabet':
        navigate('/learning/arabic-alphabet');
        break;
      case 'grammar':
        navigate('/learning/grammar');
        break;
      case 'vocabulary':
        navigate('/learning/vocabulary');
        break;
      default:
        toast({
          title: "Coming Soon",
          description: "This lesson will be available soon!",
        });
    }
  };

  const handleOpenVocabulary = () => {
    navigate('/learning/vocabulary');
  };

  const handleStartPractice = () => {
    if (isAuthenticated) {
      toast({
        title: "Starting Practice",
        description: "Redirecting to practice session...",
      });
      setTimeout(() => navigate('/learning/vocabulary'), 1000);
    } else {
      navigate('/auth/login');
    }
  };

  const handleDownloadResource = (resourceName: string) => {
    toast({
      title: `Downloading ${resourceName}`,
      description: "Your download will begin shortly.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn Arabic for Quran</h1>
                <p className="text-lg opacity-90 mb-6">
                  Master the language of the Quran with our specialized Arabic courses designed for Quran readers and memorizers.
                </p>
                <Button 
                  className="bg-white text-hafazny-blue px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  onClick={() => handleStartLesson('alphabet')}
                >
                  Start Learning
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Languages className="w-24 h-24 md:w-32 md:h-32 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-hafazny-gold/20 rounded-full filter blur-xl animate-pulse-soft"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full filter blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="glass-panel p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Learning Path</h2>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant={selectedLevel === 'beginner' ? 'default' : 'outline'} 
                  onClick={() => setSelectedLevel('beginner')}
                >
                  Beginner
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedLevel === 'intermediate' ? 'default' : 'outline'} 
                  onClick={() => setSelectedLevel('intermediate')}
                >
                  Intermediate
                </Button>
                <Button 
                  size="sm" 
                  variant={selectedLevel === 'advanced' ? 'default' : 'outline'} 
                  onClick={() => setSelectedLevel('advanced')}
                >
                  Advanced
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <div className="relative flex items-center justify-between mb-4">
                <div className="flex-1 border-t-2 border-dotted border-gray-300 absolute"></div>
                <div className="flex space-x-8 relative z-10 w-full justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-hafazny-blue/10 flex items-center justify-center mb-2">
                      <Check className="w-6 h-6 text-hafazny-blue" />
                    </div>
                    <span className="text-xs text-gray-500">Alphabet</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="font-semibold">2</span>
                    </div>
                    <span className="text-xs text-gray-500">Vocabulary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="font-semibold">3</span>
                    </div>
                    <span className="text-xs text-gray-500">Grammar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="font-semibold">4</span>
                    </div>
                    <span className="text-xs text-gray-500">Reading</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <Trophy className="w-6 h-6 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-500">Mastery</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Your Progress</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <Progress value={20} className="h-2 mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="capitalize">{lesson.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {lesson.content.substring(0, 120)}...
                    </p>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        switch (lesson.category) {
                          case 'alphabet':
                            navigate('/learning/arabic-alphabet');
                            break;
                          case 'grammar':
                            navigate('/learning/grammar');
                            break;
                          case 'vocabulary':
                            navigate('/learning/vocabulary');
                            break;
                          default:
                            toast({
                              title: "Coming Soon",
                              description: "This lesson will be available soon!",
                            });
                        }
                      }}
                    >
                      Start Lesson
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {filteredLessons.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No lessons available yet</h3>
                  <p className="text-gray-600">More lessons will be added soon for this level.</p>
                </div>
              )}
            </div>
          </div>

          {/* Features Tabs */}
          <Tabs defaultValue="lessons" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Arabic Alphabet</CardTitle>
                    <CardDescription>Master the Arabic letters and their forms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 gap-2 mb-4">
                      {['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س'].map((letter, index) => (
                        <div 
                          key={index} 
                          className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center text-lg font-arabic"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">12/28 Completed</span>
                      <Progress value={42} className="w-24 h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleStartLesson('alphabet')}>Continue</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Basic Grammar</CardTitle>
                    <CardDescription>Learn fundamental Arabic grammar rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Nouns and Pronouns</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Gender in Arabic</span>
                      </li>
                      <li className="flex items-center opacity-50">
                        <div className="h-4 w-4 border rounded-full mr-2"></div>
                        <span className="text-sm">Verb Forms</span>
                      </li>
                    </ul>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">2/6 Completed</span>
                      <Progress value={33} className="w-24 h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleStartLesson('grammar')}>Continue</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quranic Vocabulary</CardTitle>
                    <CardDescription>Most common words in the Quran</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="p-2 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-arabic text-lg">الله</span>
                          <span className="text-gray-600 text-sm">Allah</span>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-arabic text-lg">رب</span>
                          <span className="text-gray-600 text-sm">Lord</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">10/100 Words</span>
                      <Progress value={10} className="w-24 h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleStartLesson('vocabulary')}>Continue</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vocabulary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Essential Quran Vocabulary</h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {[
                          { arabic: 'الله', english: 'Allah', frequency: 'Very High' },
                          { arabic: 'رب', english: 'Lord', frequency: 'Very High' },
                          { arabic: 'رحمن', english: 'Most Merciful', frequency: 'High' },
                          { arabic: 'قل', english: 'Say', frequency: 'High' },
                          { arabic: 'ناس', english: 'People', frequency: 'High' }
                        ].map((word, index) => (
                          <div key={index} className="p-3 flex justify-between items-center">
                            <div>
                              <p className="font-arabic text-lg">{word.arabic}</p>
                              <p className="text-sm text-gray-600">{word.english}</p>
                            </div>
                            <Badge variant="outline">{word.frequency}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t">
                      <Button variant="ghost" onClick={handleOpenVocabulary}>View All Words</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Study Tools</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="mr-4 p-2 bg-blue-100 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Flashcards</h4>
                            <p className="text-sm text-gray-600 mb-3">Practice vocabulary with spaced repetition</p>
                            <Button size="sm" variant="outline" onClick={handleOpenVocabulary}>Start Practice</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="mr-4 p-2 bg-purple-100 rounded-full">
                            <MessageCircle className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Word Context</h4>
                            <p className="text-sm text-gray-600 mb-3">See how words are used in the Quran</p>
                            <Button size="sm" variant="outline" onClick={handleOpenVocabulary}>Explore</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="mr-4 p-2 bg-green-100 rounded-full">
                            <Globe className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Root Explorer</h4>
                            <p className="text-sm text-gray-600 mb-3">Understand word roots and derivations</p>
                            <Button size="sm" variant="outline" onClick={handleOpenVocabulary}>Explore</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="practice">
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 mx-auto text-hafazny-blue opacity-60 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Interactive Practice</h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  Put your Arabic skills to the test with interactive exercises and get instant feedback
                </p>
                {isAuthenticated ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Reading Practice</CardTitle>
                        <CardDescription>Practice reading Arabic text</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleStartPractice()}>Start</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Listening Exercise</CardTitle>
                        <CardDescription>Improve your listening skills</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleStartPractice()}>Start</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Translation Quiz</CardTitle>
                        <CardDescription>Test your translation skills</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleStartPractice()}>Start</Button>
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-amber-600 mb-2">You need to log in to use this feature</p>
                    <Button onClick={() => navigate('/auth/login')} size="lg">
                      Sign In to Continue
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Arabic Grammar Handbook</h4>
                            <Badge>PDF</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Comprehensive guide to Arabic grammar for Quran students</p>
                          <Button size="sm" variant="outline" onClick={() => handleDownloadResource('Arabic Grammar Handbook')}>Download</Button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Vocabulary Lists</h4>
                            <Badge>PDF</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Most common words in the Quran with translations</p>
                          <Button size="sm" variant="outline" onClick={() => handleDownloadResource('Vocabulary Lists')}>Download</Button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Writing Practice Sheets</h4>
                            <Badge>PDF</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Worksheets for practicing Arabic writing</p>
                          <Button size="sm" variant="outline" onClick={() => handleDownloadResource('Writing Practice Sheets')}>Download</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Audio Resources</h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Arabic Pronunciation Guide</h4>
                            <Badge>Audio</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Clear audio of correct Arabic letter pronunciation</p>
                          <Button size="sm" variant="outline" onClick={() => handleStartLesson('alphabet')}>Listen</Button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Common Phrases</h4>
                            <Badge>Audio</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Essential Arabic phrases with audio</p>
                          <Button size="sm" variant="outline" onClick={() => handleStartLesson('vocabulary')}>Listen</Button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Quranic Recitation with Translation</h4>
                            <Badge>Audio</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Selected verses with word-by-word translation</p>
                          <Button size="sm" variant="outline" onClick={() => navigate('/quran')}>Listen</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Tutoring Call to Action */}
          <div className="glass-panel p-6 rounded-xl mb-8 bg-gradient-to-r from-hafazny-gold/90 to-amber-500/90 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-3">Personal Arabic Tutoring</h2>
                <p className="mb-6 opacity-90">
                  Learn Arabic with a personal tutor through live one-on-one sessions. Our tutors are native Arabic speakers specializing in teaching Quranic Arabic.
                </p>
                <Button className="bg-white text-amber-600 hover:bg-white/90" onClick={() => navigate('/community')}>
                  Find a Tutor
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg">
                    <MessageCircle className="h-20 w-20 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Arabic;

