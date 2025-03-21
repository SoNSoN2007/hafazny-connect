
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, BookOpen, SkipForward, SkipBack } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { surahs, reciters, getAudioUrl } from '@/lib/quranData';
import { QuranVerse, quranSurahs, getSurahById, bismillah } from '@/lib/quranVerses';

const QuranMemorization: React.FC = () => {
  const { surahId } = useParams<{ surahId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const numericSurahId = surahId ? parseInt(surahId) : 1;
  const surahData = getSurahById(numericSurahId);
  const surahInfo = surahs.find(s => s.id === numericSurahId);
  
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [selectedReciter, setSelectedReciter] = useState('mishary');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audio] = useState(new Audio());
  const [mode, setMode] = useState<'read' | 'memorize' | 'test'>('read');
  const [hiddenVerses, setHiddenVerses] = useState<number[]>([]);
  
  // Get verses with or without Bismillah
  const verses = surahData?.verses || [];
  const totalVerses = verses.length;
  const currentVerse = verses[currentVerseIndex];
  
  useEffect(() => {
    // Reset state when surah changes
    setCurrentVerseIndex(0);
    setProgress(0);
    setHiddenVerses([]);
    setIsPlaying(false);
    if (audio) {
      audio.pause();
    }
  }, [numericSurahId]);
  
  useEffect(() => {
    // Update progress when verse changes
    if (totalVerses > 0) {
      setProgress(((currentVerseIndex + 1) / totalVerses) * 100);
    }
    
    // Load audio for the current verse
    if (surahInfo) {
      const verseNumber = currentVerseIndex + 1;
      audio.src = getAudioUrl(numericSurahId, selectedReciter, verseNumber);
      
      // Preload audio
      audio.load();
    }
    
    // Handle audio completion
    const handleAudioEnd = () => {
      setIsPlaying(false);
      // Auto-advance to next verse
      if (currentVerseIndex < totalVerses - 1) {
        setTimeout(() => setCurrentVerseIndex(currentVerseIndex + 1), 1500);
      }
    };
    
    audio.addEventListener('ended', handleAudioEnd);
    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [currentVerseIndex, numericSurahId, selectedReciter, totalVerses]);
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.error("Audio playback error:", error);
        toast({
          title: "Error",
          description: "Could not play audio. Please try another reciter.",
          variant: "destructive"
        });
      });
      setIsPlaying(true);
    }
  };
  
  // Navigate to next verse
  const nextVerse = () => {
    if (currentVerseIndex < totalVerses - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
      setIsPlaying(false);
      audio.pause();
    }
  };
  
  // Navigate to previous verse
  const prevVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
      setIsPlaying(false);
      audio.pause();
    }
  };
  
  // Toggle verse visibility for memorization
  const toggleVerseVisibility = (index: number) => {
    if (hiddenVerses.includes(index)) {
      setHiddenVerses(hiddenVerses.filter(i => i !== index));
    } else {
      setHiddenVerses([...hiddenVerses, index]);
    }
  };
  
  // Generate random test by hiding random verses
  const generateTest = () => {
    const randomIndices: number[] = [];
    const numberOfVersesToHide = Math.ceil(totalVerses * 0.4); // Hide 40% of verses
    
    while (randomIndices.length < numberOfVersesToHide) {
      const randomIndex = Math.floor(Math.random() * totalVerses);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    
    setHiddenVerses(randomIndices);
    setMode('test');
    
    toast({
      title: "Memorization Test",
      description: `Can you recall the ${numberOfVersesToHide} hidden verses?`,
    });
  };
  
  // Play Bismillah audio
  const playBismillah = () => {
    if (surahInfo && surahInfo.id !== 9) { // Surah 9 doesn't have Bismillah
      const bismillahAudio = new Audio(getAudioUrl(1, selectedReciter, 1)); // Use first verse of Al-Fatiha for Bismillah
      bismillahAudio.play().catch(error => {
        console.error("Bismillah audio error:", error);
      });
    }
  };
  
  if (!surahData || !surahInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Surah not found</h1>
            <Button onClick={() => navigate('/quran')}>Return to Quran</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate('/quran')}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Quran
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <span className="mr-2">{surahInfo.name}</span>
                <span className="text-xl font-arabic mr-2">{surahInfo.arabicName}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                {surahInfo.englishName} - {surahInfo.meaning}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {totalVerses} verses • Verse {currentVerseIndex + 1}/{totalVerses}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Select value={selectedReciter} onValueChange={setSelectedReciter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Reciter" />
                </SelectTrigger>
                <SelectContent>
                  {reciters.map(reciter => (
                    <SelectItem key={reciter.id} value={reciter.id}>{reciter.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-6" />
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Memorization Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(value) => setMode(value as 'read' | 'memorize' | 'test')}>
                <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                  <TabsTrigger value="read">Read</TabsTrigger>
                  <TabsTrigger value="memorize">Memorize</TabsTrigger>
                  <TabsTrigger value="test">Test</TabsTrigger>
                </TabsList>
                
                <TabsContent value="read">
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <ScrollArea className="h-[40vh] mb-4">
                      <div className="space-y-6 text-right font-arabic leading-loose">
                        {/* Show Bismillah for all Surahs except At-Tawbah (9) */}
                        {surahInfo.id !== 9 && (
                          <div className="text-center mb-6">
                            <p className="text-2xl mb-2">{bismillah.arabic}</p>
                            <p className="text-sm text-gray-600">{bismillah.translation}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2" 
                              onClick={playBismillah}
                            >
                              <Volume2 className="h-4 w-4 mr-2" /> Play Bismillah
                            </Button>
                          </div>
                        )}
                        
                        {verses.map((verse, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${currentVerseIndex === index ? 'bg-hafazny-gold/20' : ''}`}
                          >
                            <p className="text-2xl mb-2">{verse.text}</p>
                            {verse.translation && (
                              <p className="text-sm text-gray-600 text-right">{verse.translation}</p>
                            )}
                            <div className="text-xs text-gray-500 mt-2 flex justify-end">
                              Verse {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex justify-center items-center space-x-4 mt-6">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={prevVerse} 
                        disabled={currentVerseIndex === 0}
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        className="w-12 h-12 rounded-full bg-hafazny-blue hover:bg-hafazny-navy" 
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={nextVerse} 
                        disabled={currentVerseIndex === totalVerses - 1}
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="memorize">
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <ScrollArea className="h-[40vh] mb-4">
                      <div className="space-y-6 text-right font-arabic leading-loose">
                        {/* Show Bismillah for all Surahs except At-Tawbah (9) */}
                        {surahInfo.id !== 9 && (
                          <div className="text-center mb-6">
                            <p className="text-2xl mb-2">{bismillah.arabic}</p>
                            <p className="text-sm text-gray-600">{bismillah.translation}</p>
                          </div>
                        )}
                        
                        {verses.map((verse, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${currentVerseIndex === index ? 'bg-hafazny-gold/20' : ''}`}
                            onClick={() => toggleVerseVisibility(index)}
                          >
                            {hiddenVerses.includes(index) ? (
                              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center cursor-pointer">
                                <p className="text-gray-600 dark:text-gray-400">Click to reveal verse {index + 1}</p>
                              </div>
                            ) : (
                              <>
                                <p className="text-2xl mb-2">{verse.text}</p>
                                {verse.translation && (
                                  <p className="text-sm text-gray-600 text-right">{verse.translation}</p>
                                )}
                              </>
                            )}
                            <div className="text-xs text-gray-500 mt-2 flex justify-end">
                              Verse {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                      <Button 
                        className="w-full sm:w-auto"
                        onClick={() => setHiddenVerses(verses.map((_, i) => i))}
                      >
                        Hide All Verses
                      </Button>
                      
                      <Button 
                        className="w-full sm:w-auto"
                        variant="outline"
                        onClick={() => setHiddenVerses([])}
                      >
                        Show All Verses
                      </Button>
                      
                      <Button 
                        className="w-full sm:w-auto"
                        variant="secondary"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Listen'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="test">
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <div className="mb-4 bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Test Your Memorization</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click on the hidden verses to reveal them as you recite from memory. Use the audio button to check your pronunciation.
                      </p>
                    </div>
                    
                    <ScrollArea className="h-[40vh] mb-4">
                      <div className="space-y-6 text-right font-arabic leading-loose">
                        {/* Show Bismillah for all Surahs except At-Tawbah (9) */}
                        {surahInfo.id !== 9 && (
                          <div className="text-center mb-6">
                            <p className="text-2xl mb-2">{bismillah.arabic}</p>
                          </div>
                        )}
                        
                        {verses.map((verse, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${currentVerseIndex === index ? 'bg-hafazny-gold/20' : ''}`}
                            onClick={() => toggleVerseVisibility(index)}
                          >
                            {hiddenVerses.includes(index) ? (
                              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center cursor-pointer">
                                <p className="text-gray-600 dark:text-gray-400">Tap to reveal verse {index + 1}</p>
                              </div>
                            ) : (
                              <p className="text-2xl mb-2">{verse.text}</p>
                            )}
                            <div className="text-xs text-gray-500 mt-2 flex justify-end">
                              Verse {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                      <Button 
                        className="w-full sm:w-auto"
                        onClick={generateTest}
                      >
                        Generate New Test
                      </Button>
                      
                      <Button 
                        className="w-full sm:w-auto"
                        variant="outline"
                        onClick={() => setHiddenVerses([])}
                      >
                        Show All Verses
                      </Button>
                      
                      <Button 
                        className="w-full sm:w-auto"
                        variant="secondary"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Listen'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            {numericSurahId > 1 ? (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/quran-memorization/${numericSurahId - 1}`)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous Surah
              </Button>
            ) : (
              <div></div>
            )}
            
            {numericSurahId < 114 && (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/quran-memorization/${numericSurahId + 1}`)}
              >
                Next Surah <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuranMemorization;
