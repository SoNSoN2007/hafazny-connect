
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Play, Pause, SkipForward, SkipBack, Mic, Volume2, BookOpen, Award, CheckCircle, XCircle } from 'lucide-react';
import { reciters, getAudioUrl } from '@/lib/quranData';

interface VerseMemorizationProps {
  surahId: number;
  surahName: string;
  arabicName: string;
  verseCount: number;
  onClose: () => void;
}

const VerseMemorization: React.FC<VerseMemorizationProps> = ({
  surahId,
  surahName,
  arabicName,
  verseCount,
  onClose
}) => {
  const { toast } = useToast();
  const [selectedReciter, setSelectedReciter] = useState('mishary');
  const [currentVerse, setCurrentVerse] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  // Initialize audio element
  useEffect(() => {
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
    
    // Set initial source - this would be verse-specific in a real implementation
    audio.src = getAudioUrl(surahId, selectedReciter);
    audio.volume = volume / 100;
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [surahId, selectedReciter]);
  
  // Update audio source when reciter changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      setIsPlaying(false);
      
      // In a real implementation, this would load the specific verse
      audioRef.current.src = getAudioUrl(surahId, selectedReciter);
      audioRef.current.load();
      
      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Error",
            description: "Could not play audio. Please try again.",
            variant: "destructive"
          });
        });
      }
    }
  }, [selectedReciter, surahId, currentVerse, toast]);
  
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
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const nextVerse = () => {
    if (currentVerse < verseCount) {
      setCurrentVerse(currentVerse + 1);
      setProgress(Math.floor((currentVerse / verseCount) * 100));
    } else {
      toast({
        title: "Congratulations!",
        description: "You've completed memorizing this surah!",
      });
    }
  };
  
  const prevVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
      setProgress(Math.floor(((currentVerse - 2) / verseCount) * 100));
    }
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // This would be where we'd send the recording to a server for comparison
        // For this prototype, we'll simulate a response
        toast({
          title: "Recording saved",
          description: "Your recitation has been processed.",
        });
        
        setTimeout(() => {
          // Simulate feedback - in a real app, this would come from an API
          const randomScore = Math.floor(Math.random() * 100);
          if (randomScore > 70) {
            toast({
              title: "Good job!",
              description: "Your recitation matches the sheikh's. You can proceed.",
            });
            setProgress(Math.floor((currentVerse / verseCount) * 100));
          } else {
            toast({
              title: "Try again",
              description: "Your recitation needs improvement. Listen again and try once more.",
              variant: "destructive",
            });
          }
        }, 1500);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const requestTutoring = () => {
    toast({
      title: "Request Sent",
      description: "We'll connect you with a Quranic tutor soon!",
    });
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <span>{surahName}</span>
                <span className="text-xl font-arabic mx-2">({arabicName})</span>
                <span className="text-sm text-gray-500 ml-2">Verse {currentVerse}/{verseCount}</span>
              </CardTitle>
              <div className="mt-2">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          </div>
        </CardHeader>
        
        <CardContent className="pb-0">
          <Tabs defaultValue="memorize">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="listen">Listen</TabsTrigger>
              <TabsTrigger value="memorize">Memorize</TabsTrigger>
              <TabsTrigger value="tutoring">Tutoring</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listen">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <div className="mb-4">
                  <Select value={selectedReciter} onValueChange={handleReciterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Reciter" />
                    </SelectTrigger>
                    <SelectContent>
                      {reciters.map(reciter => (
                        <SelectItem key={reciter.id} value={reciter.id}>{reciter.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4 text-right font-arabic leading-loose text-2xl min-h-32 flex items-center justify-center">
                  {/* This would contain the actual verse text */}
                  <p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                </div>
                
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
                
                <div className="flex items-center justify-center space-x-4 mb-2">
                  <Button 
                    variant="ghost"
                    className="rounded-full p-2"
                    onClick={prevVerse}
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
                    variant="ghost"
                    className="rounded-full p-2"
                    onClick={nextVerse}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center w-full max-w-xs mx-auto">
                  <Volume2 className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="memorize">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4 text-right font-arabic leading-loose text-2xl min-h-32 flex items-center justify-center">
                  {/* This would contain the actual verse text */}
                  <p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button 
                    className={`flex items-center justify-center space-x-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-hafazny-blue hover:bg-hafazny-navy'}`}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    <Mic className="h-5 w-5" />
                    <span>{isRecording ? 'Stop Recording' : 'Record Recitation'}</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center space-x-2"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span>{isPlaying ? 'Pause' : 'Listen Again'}</span>
                  </Button>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevVerse} disabled={currentVerse === 1}>
                    Previous Verse
                  </Button>
                  <Button onClick={nextVerse} disabled={currentVerse === verseCount}>
                    Next Verse
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tutoring">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                <BookOpen className="h-12 w-12 mx-auto text-hafazny-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">Personal Quranic Tutoring</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Get personalized lessons from expert Quran tutors who can help you perfect your recitation and memorization.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">One-on-One Sessions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Private lessons tailored to your level and goals
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Expert Feedback</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Detailed guidance on tajweed and pronunciation
                    </p>
                  </div>
                </div>
                
                <Button 
                  className="bg-hafazny-gold hover:bg-amber-600 text-white"
                  onClick={requestTutoring}
                >
                  Request a Tutor
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="pt-4 pb-6">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-hafazny-gold" />
              <span className="text-sm">
                {Math.floor(progress)}% Complete
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={prevVerse} disabled={currentVerse === l}>
                <SkipBack className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button size="sm" onClick={nextVerse} disabled={currentVerse === verseCount}>
                Next <SkipForward className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerseMemorization;
