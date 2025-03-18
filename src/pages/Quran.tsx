
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SurahDetails from '@/components/SurahDetails';
import { getTranslation } from '@/lib/i18n';
import { surahs, Surah } from '@/lib/quranData';
import { BookOpen, Search, Play, ChevronRight, Filter, BookmarkIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Quran: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan'>('all');
  const [openDialog, setOpenDialog] = useState(false);
  
  // Filter surahs based on search and type filter
  const filteredSurahs = surahs.filter(surah => {
    const matchesSearch = 
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.arabicName.includes(searchTerm) ||
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.id.toString().includes(searchTerm);
    
    const matchesType = 
      filterType === 'all' || 
      (filterType === 'meccan' && surah.type === 'meccan') ||
      (filterType === 'medinan' && surah.type === 'medinan');
    
    return matchesSearch && matchesType;
  });
  
  const handleSurahClick = (surah: Surah) => {
    setSelectedSurah(surah);
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Quran Memorization</h1>
                <p className="text-lg opacity-90 mb-6">
                  Personalized memorization plans with AI-powered feedback to help you memorize the Quran with confidence.
                </p>
                <button className="bg-white text-hafazny-blue px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Start Memorizing
                </button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-hafazny-gold/20 rounded-full filter blur-xl animate-pulse-soft"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full filter blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass-panel p-6 rounded-xl mb-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search surah or verse..." 
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 min-w-[300px]">
                <Button 
                  variant={filterType === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterType === 'meccan' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('meccan')}
                >
                  Meccan
                </Button>
                <Button 
                  variant={filterType === 'medinan' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('medinan')}
                >
                  Medinan
                </Button>
              </div>
            </div>
          </div>

          {/* Memorization Progress */}
          <div className="glass-panel p-6 rounded-xl mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-semibold mb-4">Your Memorization Progress</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                You haven't started memorizing yet.
              </p>
              <button className="text-hafazny-blue font-medium hover:underline">
                Create a memorization plan
              </button>
            </div>
          </div>

          {/* Tabs for Surahs */}
          <Tabs defaultValue="grid" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold animate-fade-in" style={{ animationDelay: '300ms' }}>
                Surahs
              </h2>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            {/* Grid View */}
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredSurahs.map((surah, index) => (
                  <div 
                    key={surah.id}
                    className="glass-panel p-4 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-md transition-all animate-fade-in-up transform hover:-translate-y-1" 
                    style={{ animationDelay: `${400 + index * 50}ms` }}
                    onClick={() => handleSurahClick(surah)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-hafazny-blue/10 flex items-center justify-center text-hafazny-blue font-semibold">
                        {surah.id}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{surah.name}</h3>
                          <span className="mx-2 text-gray-400">•</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{surah.meaning}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="arabic text-lg font-arabic">{surah.arabicName}</p>
                          <span className="mx-2 text-gray-400">•</span>
                          <p className="text-xs text-gray-500">{surah.verses} verses</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSurahClick(surah);
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <ScrollArea className="h-[60vh]">
                  <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">Name</div>
                        <div className="col-span-3">Arabic</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Verses</div>
                        <div className="col-span-1"></div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSurahs.map((surah) => (
                        <div 
                          key={surah.id} 
                          className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleSurahClick(surah)}
                        >
                          <div className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-1 font-medium">{surah.id}</div>
                            <div className="col-span-3">{surah.name}<div className="text-sm text-gray-500">{surah.meaning}</div></div>
                            <div className="col-span-3 font-arabic text-lg">{surah.arabicName}</div>
                            <div className="col-span-2"><Badge variant={surah.type === 'meccan' ? 'outline' : 'secondary'}>{surah.type}</Badge></div>
                            <div className="col-span-2">{surah.verses}</div>
                            <div className="col-span-1 flex justify-end">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSurahClick(surah);
                                }}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Surah Details Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-4xl">
              {selectedSurah && <SurahDetails surah={selectedSurah} />}
            </DialogContent>
          </Dialog>
          
          {/* Coming Soon Features */}
          <div className="glass-panel p-6 rounded-xl mb-8 bg-gradient-to-r from-hafazny-teal/80 to-hafazny-blue/80 text-white animate-fade-in" style={{ animationDelay: '800ms' }}>
            <h2 className="text-xl font-semibold mb-2">Coming Soon Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium mb-1">Voice Recognition</h3>
                <p className="text-sm opacity-90">Get feedback on your recitation with advanced AI</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium mb-1">Spaced Repetition</h3>
                <p className="text-sm opacity-90">Smart review system based on your mastery</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium mb-1">Reciter Comparisons</h3>
                <p className="text-sm opacity-90">Compare your recitation with renowned reciters</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quran;
