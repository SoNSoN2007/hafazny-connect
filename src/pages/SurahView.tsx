
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSurahById, Surah, reciters, getAudioUrl } from '@/lib/quranData';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Mic, Play, Pause, BookmarkIcon, SkipForward, SkipBack } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const SurahView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedReciter, setSelectedReciter] = useState('mishary');
  const [volume, setVolume] = useState(80);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (id) {
      const surahId = parseInt(id);
      const foundSurah = getSurahById(surahId);
      
      if (foundSurah) {
        setSurah(foundSurah);
      } else {
        toast({
          title: "Surah not found",
          description: "The requested surah could not be found.",
          variant: "destructive"
        });
        navigate('/quran');
      }
    }
    setLoading(false);
  }, [id, navigate, toast]);
  
  // Initialize audio element
  useEffect(() => {
    if (!surah) return;
    
    const audio = new Audio();
    audioRef.current = audio;
    
    // Event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    // Set initial source
    audio.src = getAudioUrl(surah.id, selectedReciter);
    audio.volume = volume / 100;
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [surah, selectedReciter]);
  
  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Error",
            description: "Could not play audio. Please try again.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };
  
  const handleReciterChange = (value: string) => {
    setSelectedReciter(value);
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      setIsPlaying(false);
      
      audioRef.current.src = getAudioUrl(surah?.id || 1, value);
      audioRef.current.load();
      
      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-hafazny-blue border-opacity-50 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading surah...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!surah) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Surah Not Found</h2>
            <p className="mb-6 text-gray-600">The requested surah could not be found.</p>
            <Button onClick={() => navigate('/quran')}>
              Back to Quran
            </Button>
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
          <Button
            variant="ghost"
            className="mb-6 flex items-center space-x-2"
            onClick={() => navigate('/quran')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Quran</span>
          </Button>
          
          <div className="glass-panel p-6 md:p-8 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{surah.name}</h1>
                  <Badge variant={surah.type === 'meccan' ? 'outline' : 'secondary'}>
                    {surah.type}
                  </Badge>
                </div>
                <div className="flex items-center mb-2">
                  <p className="text-xl font-arabic">{surah.arabicName}</p>
                  <span className="mx-2 text-gray-400">•</span>
                  <p className="text-gray-600">{surah.englishName}</p>
                </div>
                <p className="text-gray-600">{surah.verses} verses</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Select value={selectedReciter} onValueChange={handleReciterChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Reciter" />
                  </SelectTrigger>
                  <SelectContent>
                    {reciters.map(reciter => (
                      <SelectItem key={reciter.id} value={reciter.id}>{reciter.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <BookmarkIcon className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
            
            {/* Audio Player */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTime(currentTime)}
                </div>
                <div className="flex-grow mx-4">
                  <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration || 100}
                    step={0.01}
                    onValueChange={handleSeek}
                    className="cursor-pointer"
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTime(duration)}
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="rounded-full p-2"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = Math.max(0, currentTime - 10);
                    }
                  }}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button 
                  className="rounded-full bg-hafazny-blue hover:bg-hafazny-navy w-12 h-12 flex items-center justify-center"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="rounded-full p-2"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                    }
                  }}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Tabs for different learning modes */}
            <Tabs defaultValue="read">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="memorize">Memorize</TabsTrigger>
                <TabsTrigger value="listen">Listen</TabsTrigger>
              </TabsList>
              
              <TabsContent value="read" className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
                  <ScrollArea className="h-[50vh] px-4">
                    <div className="text-right font-arabic leading-loose text-2xl">
                      {/* Placeholder for actual Quran text - this would come from an API */}
                      <p className="mb-4">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                      
                      {surah.id === 1 ? (
                        <>
                          <p className="mb-2">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿١﴾</p>
                          <p className="mb-2">الرَّحْمَٰنِ الرَّحِيمِ ﴿٢﴾</p>
                          <p className="mb-2">مَالِكِ يَوْمِ الدِّينِ ﴿٣﴾</p>
                          <p className="mb-2">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٤﴾</p>
                          <p className="mb-2">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٥﴾</p>
                          <p className="mb-2">صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٦﴾</p>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">Full surah text will be available soon.</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="memorize" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">Memorization Mode</h3>
                      <p className="text-gray-600">Practice your memorization with advanced features.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <h4 className="font-medium mb-4">Audio Recording</h4>
                        <div className="mb-4">
                          <Button className="bg-hafazny-blue hover:bg-hafazny-navy mx-auto flex items-center space-x-2">
                            <Mic className="h-4 w-4" />
                            <span>Record Recitation</span>
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">Record your voice to get AI-powered feedback</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                        <h4 className="font-medium mb-4">Memorization Progress</h4>
                        <div className="h-32 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-4xl font-bold text-hafazny-gold mb-2">0%</p>
                            <p className="text-sm text-gray-500">Start memorizing to track progress</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-hafazny-gold hover:bg-amber-600 text-white">
                        Create Memorization Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="listen" className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold">Listen Mode</h3>
                    <p className="text-gray-600">Listen to the beautiful recitation of the Quran by various reciters.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reciters.map(reciter => (
                      <Button
                        key={reciter.id}
                        variant={selectedReciter === reciter.id ? "default" : "outline"}
                        className="justify-start px-4 py-6"
                        onClick={() => handleReciterChange(reciter.id)}
                      >
                        {reciter.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Surahs */}
          <div className="glass-panel p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-4">You May Also Want to Read</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {surah.id < 114 && (
                <div 
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(`/quran/${surah.id + 1}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{getSurahById(surah.id + 1)?.name || ""}</h3>
                      <p className="text-sm text-gray-600">{getSurahById(surah.id + 1)?.arabicName || ""}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              )}
              
              {surah.id > 1 && (
                <div 
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(`/quran/${surah.id - 1}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{getSurahById(surah.id - 1)?.name || ""}</h3>
                      <p className="text-sm text-gray-600">{getSurahById(surah.id - 1)?.arabicName || ""}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SurahView;
