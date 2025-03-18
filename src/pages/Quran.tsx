
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTranslation } from '@/lib/i18n';
import { BookOpen, Search, Play, ChevronRight } from 'lucide-react';

const Quran: React.FC = () => {
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

          {/* Quick Search */}
          <div className="glass-panel p-6 rounded-xl mb-8 animate-fade-in-up">
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search surah or verse..." 
                    className="input-field pl-10 w-full"
                  />
                </div>
                <button className="btn-primary">
                  Search
                </button>
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

          {/* Surahs List - Just showing a few for demo */}
          <h2 className="text-2xl font-semibold mb-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            Surahs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { id: 1, name: "Al-Fatihah", arabicName: "الفاتحة", verses: 7, meaning: "The Opening" },
              { id: 2, name: "Al-Baqarah", arabicName: "البقرة", verses: 286, meaning: "The Cow" },
              { id: 3, name: "Aal-Imran", arabicName: "آل عمران", verses: 200, meaning: "The Family of Imran" },
              { id: 4, name: "An-Nisa", arabicName: "النساء", verses: 176, meaning: "The Women" }
            ].map((surah, index) => (
              <div 
                key={surah.id}
                className="glass-panel p-4 rounded-xl flex items-center justify-between animate-fade-in-up" 
                style={{ animationDelay: `${400 + index * 100}ms` }}
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
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
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
