
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Mic, Square, Play, CheckCircle, RefreshCw, Award, ChevronLeft, Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample practice verses
const practiceVerses = [
  {
    id: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
    tajweedRules: ['idgham', 'ikhfa', 'qalqalah'],
    audioUrl: ''
  },
  {
    id: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    translation: 'Praise be to Allah, Lord of the worlds',
    tajweedRules: ['izhar', 'ghunnah', 'idgham'],
    audioUrl: ''
  },
  {
    id: 3,
    arabic: 'الرَّحْمَنِ الرَّحِيمِ',
    translation: 'The Most Gracious, the Most Merciful',
    tajweedRules: ['madd', 'ghunnah'],
    audioUrl: ''
  },
  {
    id: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    translation: 'Master of the Day of Judgment',
    tajweedRules: ['ikhfa', 'qalqalah'],
    audioUrl: ''
  },
  {
    id: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translation: 'You alone we worship, and You alone we ask for help',
    tajweedRules: ['idgham', 'madd'],
    audioUrl: ''
  }
];

// Map of tajweed rule names to colors and descriptions
const tajweedRuleInfo = {
  idgham: { 
    color: 'bg-blue-100 text-blue-800', 
    name: 'Idgham', 
    description: 'Merging of noon sakinah or tanween with certain letters' 
  },
  ikhfa: { 
    color: 'bg-green-100 text-green-800', 
    name: 'Ikhfa', 
    description: 'Hiding the sound of noon sakinah or tanween' 
  },
  izhar: { 
    color: 'bg-purple-100 text-purple-800', 
    name: 'Izhar', 
    description: 'Clear pronunciation of noon sakinah or tanween' 
  },
  iqlab: { 
    color: 'bg-pink-100 text-pink-800', 
    name: 'Iqlab', 
    description: 'Converting noon sakinah or tanween to meem' 
  },
  ghunnah: { 
    color: 'bg-yellow-100 text-yellow-800', 
    name: 'Ghunnah', 
    description: 'Nasalization in certain letters' 
  },
  qalqalah: { 
    color: 'bg-red-100 text-red-800', 
    name: 'Qalqalah', 
    description: 'Bouncing sound in certain letters when they have sukoon' 
  },
  madd: { 
    color: 'bg-orange-100 text-orange-800', 
    name: 'Madd', 
    description: 'Elongation of certain sounds' 
  }
};

type RecordingState = 'idle' | 'recording' | 'recorded' | 'feedback';

const TajweedPractice: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [feedback, setFeedback] = useState({
    score: 0,
    correct: [] as string[],
    incorrect: [] as string[],
    suggestions: ''
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentVerse = practiceVerses[currentVerseIndex];

  const handleStartRecording = () => {
    // In a real implementation, this would start recording from the microphone
    toast({
      title: "Recording Started",
      description: "Please recite the verse clearly. (This is a simulation)",
    });
    setRecordingState('recording');
    
    // Simulate recording for 5 seconds
    setTimeout(() => {
      setRecordingState('recorded');
      toast({
        title: "Recording Complete",
        description: "Your recitation has been recorded.",
      });
    }, 5000);
  };

  const handleStopRecording = () => {
    // In a real implementation, this would stop recording
    setRecordingState('recorded');
    toast({
      title: "Recording Stopped",
      description: "Your recitation has been saved.",
    });
  };

  const handlePlayRecording = () => {
    // In a real implementation, this would play the recording
    // For demo purposes, we'll play the original audio instead
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Fallback using Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentVerse.arabic);
        utterance.lang = 'ar-SA';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handlePlayOriginal = () => {
    // Play the original recitation
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Fallback using Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentVerse.arabic);
        utterance.lang = 'ar-SA';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const toggleRuleSelection = (rule: string) => {
    if (selectedRules.includes(rule)) {
      setSelectedRules(selectedRules.filter(r => r !== rule));
    } else {
      setSelectedRules([...selectedRules, rule]);
    }
  };

  const handleSubmitFeedback = () => {
    // In a real implementation, this would analyze the recording against the rules
    // For demo purposes, we'll simulate feedback
    
    // Count correctly identified rules
    const correctRules = selectedRules.filter(rule => currentVerse.tajweedRules.includes(rule));
    // Count incorrectly identified rules
    const incorrectRules = selectedRules.filter(rule => !currentVerse.tajweedRules.includes(rule));
    // Count missed rules
    const missedRules = currentVerse.tajweedRules.filter(rule => !selectedRules.includes(rule));
    
    // Calculate score (percentage of correctly identified rules)
    const totalRules = currentVerse.tajweedRules.length;
    const score = Math.round((correctRules.length / totalRules) * 100);
    
    // Generate feedback
    let suggestions = '';
    if (missedRules.length > 0) {
      suggestions += `You missed the following rules: ${missedRules.map(rule => tajweedRuleInfo[rule as keyof typeof tajweedRuleInfo].name).join(', ')}. `;
    }
    if (incorrectRules.length > 0) {
      suggestions += `You incorrectly identified: ${incorrectRules.map(rule => tajweedRuleInfo[rule as keyof typeof tajweedRuleInfo].name).join(', ')}. `;
    }
    if (correctRules.length === totalRules && incorrectRules.length === 0) {
      suggestions = 'Excellent work! You correctly identified all tajweed rules in this verse.';
    }
    
    setFeedback({
      score,
      correct: correctRules,
      incorrect: incorrectRules,
      suggestions
    });
    
    setRecordingState('feedback');
  };

  const resetPractice = () => {
    setRecordingState('idle');
    setSelectedRules([]);
    setFeedback({
      score: 0,
      correct: [],
      incorrect: [],
      suggestions: ''
    });
  };

  const goToNextVerse = () => {
    if (currentVerseIndex < practiceVerses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
      resetPractice();
    }
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
            <h1 className="text-3xl font-bold mb-2">Tajweed Practice</h1>
            <p className="text-gray-600">Record your recitation and get feedback on your tajweed</p>
          </div>

          <Tabs defaultValue="recite" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="recite">Recite</TabsTrigger>
              <TabsTrigger value="identify">Identify Rules</TabsTrigger>
              <TabsTrigger value="feedback">Get Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="recite">
              <Card>
                <CardHeader>
                  <CardTitle>Verse {currentVerseIndex + 1} of {practiceVerses.length}</CardTitle>
                  <CardDescription>
                    Listen to the verse and practice your recitation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div>
                      <div className="text-2xl font-arabic mb-4">{currentVerse.arabic}</div>
                      <div className="text-gray-600">{currentVerse.translation}</div>
                    </div>
                    
                    <div className="flex justify-center mb-8">
                      <Button 
                        variant="outline"
                        className="mx-2"
                        onClick={handlePlayOriginal}
                      >
                        <Play className="mr-2 h-4 w-4" /> Listen to Recitation
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg mb-4">
                      <h3 className="text-lg font-medium mb-4">Record Your Recitation</h3>
                      
                      {recordingState === 'idle' && (
                        <Button onClick={handleStartRecording} className="bg-red-600 hover:bg-red-700">
                          <Mic className="mr-2 h-4 w-4" /> Start Recording
                        </Button>
                      )}
                      
                      {recordingState === 'recording' && (
                        <div className="space-y-4">
                          <div className="animate-pulse flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center">
                              <Mic className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <Button onClick={handleStopRecording} variant="outline">
                            <Square className="mr-2 h-4 w-4" /> Stop Recording
                          </Button>
                        </div>
                      )}
                      
                      {recordingState === 'recorded' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center">
                              <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <div className="space-x-2">
                            <Button onClick={handlePlayRecording} variant="outline">
                              <Play className="mr-2 h-4 w-4" /> Play Recording
                            </Button>
                            <Button onClick={handleStartRecording} variant="outline">
                              <RefreshCw className="mr-2 h-4 w-4" /> Record Again
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {recordingState === 'feedback' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                              <Award className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <div className="text-xl font-bold">Score: {feedback.score}%</div>
                          <p className="text-gray-700">{feedback.suggestions}</p>
                          <div className="space-x-2">
                            <Button onClick={resetPractice} variant="outline">
                              <RefreshCw className="mr-2 h-4 w-4" /> Practice Again
                            </Button>
                            {feedback.score >= 70 && (
                              <Button onClick={goToNextVerse}>
                                Next Verse
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <audio ref={audioRef} src={currentVerse.audioUrl} className="hidden" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="identify">
              <Card>
                <CardHeader>
                  <CardTitle>Identify Tajweed Rules</CardTitle>
                  <CardDescription>
                    Select all the tajweed rules that apply to this verse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-2xl font-arabic mb-4">{currentVerse.arabic}</div>
                      <div className="text-gray-600 mb-4">{currentVerse.translation}</div>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={handlePlayOriginal}
                        className="mb-8"
                      >
                        <Volume2 className="mr-2 h-4 w-4" /> Listen
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(tajweedRuleInfo).map(([rule, info]) => (
                        <Button
                          key={rule}
                          variant="outline"
                          className={`justify-start ${selectedRules.includes(rule) ? 'border-2 border-blue-500' : ''}`}
                          onClick={() => toggleRuleSelection(rule)}
                        >
                          <Badge className={`mr-2 ${info.color}`}>{info.name}</Badge>
                          <span className="text-gray-600 text-sm">{info.description}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetPractice}>
                    Reset
                  </Button>
                  <Button 
                    onClick={handleSubmitFeedback}
                    disabled={selectedRules.length === 0}
                  >
                    Submit for Feedback
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="feedback">
              {recordingState === 'feedback' ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Tajweed Feedback</CardTitle>
                    <CardDescription>
                      Review your performance and see where you can improve
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-32 h-32 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-3xl font-bold">{feedback.score}%</div>
                          </div>
                          <svg viewBox="0 0 36 36" className="w-full h-full">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#ddd"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={feedback.score >= 70 ? "#4CAF50" : "#FF9800"}
                              strokeWidth="3"
                              strokeDasharray={`${feedback.score}, 100`}
                            />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h3 className="font-medium mb-2">Verse:</h3>
                        <div className="text-xl font-arabic mb-2">{currentVerse.arabic}</div>
                        <div className="text-gray-600 text-sm">{currentVerse.translation}</div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Correctly Identified Rules:</h3>
                          {feedback.correct.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {feedback.correct.map(rule => (
                                <Badge 
                                  key={rule} 
                                  className={tajweedRuleInfo[rule as keyof typeof tajweedRuleInfo].color}
                                >
                                  {tajweedRuleInfo[rule as keyof typeof tajweedRuleInfo].name}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">None</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Incorrectly Identified Rules:</h3>
                          {feedback.incorrect.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {feedback.incorrect.map(rule => (
                                <Badge 
                                  key={rule} 
                                  variant="outline"
                                  className="text-red-600 border-red-600"
                                >
                                  {tajweedRuleInfo[rule as keyof typeof tajweedRuleInfo].name}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">None</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Feedback:</h3>
                          <p className="text-gray-700">{feedback.suggestions}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetPractice}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Practice Again
                    </Button>
                    {feedback.score >= 70 && (
                      <Button onClick={goToNextVerse}>
                        Next Verse
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Feedback Yet</CardTitle>
                    <CardDescription>
                      Record your recitation and identify tajweed rules to get feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <Mic className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="mb-4">Record your recitation first to receive feedback</p>
                    <Button onClick={() => {
                      resetPractice();
                      document.querySelector('[data-value="recite"]')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }}>
                      Go to Recitation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">All Practice Verses</h2>
            <ScrollArea className="h-60 border rounded-md">
              <div className="p-4">
                {practiceVerses.map((verse, index) => (
                  <div 
                    key={verse.id}
                    className={`p-3 mb-2 rounded-md border cursor-pointer ${
                      index === currentVerseIndex ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setCurrentVerseIndex(index);
                      resetPractice();
                    }}
                  >
                    <div className="font-arabic mb-1">{verse.arabic}</div>
                    <div className="text-sm text-gray-600">{verse.translation}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {verse.tajweedRules.map(rule => (
                        <Badge 
                          key={rule} 
                          variant="outline"
                          className="text-xs"
                        >
                          {tajweedRuleInfo[rule as keyof typeof tajweedRuleInfo].name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TajweedPractice;
