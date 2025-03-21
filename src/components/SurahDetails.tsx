import React, { useState, useRef, useEffect } from 'react';
import { Surah, reciters, getAudioUrl, getVerseText } from '@/lib/quranData';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, SkipBack, SkipForward, Volume2, BookOpen, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import VerseMemorization from './memorization/VerseMemorization';
import LearningFeatures from './learning/LearningFeatures';

interface SurahDetailsProps {
  surah: Surah;
  onClose?: () => void;
}

const SurahDetails: React.FC<SurahDetailsProps> = ({ surah, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [selectedReciter, setSelectedReciter] = useState('mishary');
  const [currentVerse, setCurrentVerse] = useState(1);
  const [showMemorization, setShowMemorization] = useState(false);
  const [showLearningFeatures, setShowLearningFeatures] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(true);
  const [currentVerseName, setCurrentVerseName] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setAudioLoaded(true);
      setIsAudioLoading(false);
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      
      if (currentVerse < surah.verses) {
        setCurrentVerse(prev => prev + 1);
      }
    });
    
    loadVerseAudio();
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, []);
  
  useEffect(() => {
    const verseText = getVerseText(surah.id, currentVerse);
    const verseParts = verseText.split(' - ');
    if (verseParts.length > 1) {
      setCurrentVerseName(verseParts[1]);
    } else {
      setCurrentVerseName(`الآية ${currentVerse}`);
    }
  }, [surah.id, currentVerse]);
  
  useEffect(() => {
    loadVerseAudio();
  }, [selectedReciter, surah.id, currentVerse]);
  
  const loadVerseAudio = () => {
    if (audioRef.current) {
      setIsAudioLoading(true);
      setAudioLoaded(false);
      const wasPlaying = isPlaying;
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      const audioUrl = getAudioUrl(surah.id, selectedReciter, currentVerse);
      console.log(`Loading audio URL for surah ${surah.id}, verse ${currentVerse}:`, audioUrl);
      
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      const handleError = (e: Event) => {
        console.error("Error loading audio", e);
        setIsAudioLoading(false);
        toast({
          title: "Audio Error",
          description: `Could not load audio for verse ${currentVerse}. Please try another reciter.`,
          variant: "destructive"
        });
      };
      
      audioRef.current.addEventListener('error', handleError, { once: true });
      
      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Error",
            description: "Could not play audio. Please try another reciter.",
            variant: "destructive"
          });
        });
      }
    }
  };
  
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
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Error",
            description: "Could not play audio. Please try another reciter.",
            variant: "destructive"
          });
        });
      }
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
    if (currentVerse < surah.verses) {
      setCurrentVerse(prev => prev + 1);
      setCurrentTime(0);
    }
  };
  
  const prevVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse(prev => prev - 1);
      setCurrentTime(0);
    }
  };
  
  const startMemorizing = () => {
    setShowMemorization(true);
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const goToFullMemorization = () => {
    navigate(`/quran-memorization/${surah.id}`);
  };
  
  const showLearning = () => {
    setShowLearningFeatures(true);
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const goToArabicLessons = () => {
    navigate('/arabic');
  };
  
  const goToTajweedLessons = () => {
    navigate('/tajweed');
  };
  
  if (showLearningFeatures) {
    return (
      <LearningFeatures
        onClose={() => setShowLearningFeatures(false)}
        goToArabic={goToArabicLessons}
        goToTajweed={goToTajweedLessons}
      />
    );
  }
  
  if (showMemorization) {
    return (
      <VerseMemorization
        surahId={surah.id}
        surahName={surah.name}
        arabicName={surah.arabicName}
        verseCount={surah.verses}
        onClose={() => setShowMemorization(false)}
      />
    );
  }
  
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <span className="mr-2">{surah.name}</span>
              <span className="text-xl font-arabic mr-2">{surah.arabicName}</span>
              <Badge variant="outline" className="ml-2">{surah.type}</Badge>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-1">{surah.englishName} - {surah.meaning}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {surah.verses} verses • Verse {currentVerse}/{surah.verses}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
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
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4 text-right font-arabic leading-loose">
          <p className="text-2xl mb-2">{getVerseText(surah.id, currentVerse).split(' - ')[0]}</p>
          <p className="text-lg text-hafazny-gold">{currentVerseName}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                className="rounded-full p-2"
                onClick={prevVerse}
                disabled={currentVerse === 1}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                className="rounded-full bg-hafazny-blue hover:bg-hafazny-navy w-12 h-12 flex items-center justify-center"
                onClick={togglePlayPause}
                disabled={isAudioLoading}
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
                onClick={nextVerse}
                disabled={currentVerse === surah.verses}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center w-32">
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
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-hafazny-gold hover:bg-amber-600 text-white"
            onClick={startMemorizing}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Quick Memorization
          </Button>
          
          <Button 
            className="bg-hafazny-blue hover:bg-hafazny-navy text-white"
            onClick={goToArabicLessons}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Learn Arabic
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={goToTajweedLessons}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learn Tajweed
          </Button>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={goToFullMemorization}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Full Surah Memorization (With Complete Text)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurahDetails;
