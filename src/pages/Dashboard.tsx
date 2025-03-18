
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { getTranslation } from '@/lib/i18n';
import { BookOpen, GraduationCap, Mic, Users, ChevronRight, Award, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hafazny-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="glass-panel p-6 md:p-8 rounded-xl mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-hafazny-blue/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-hafazny-blue">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Let's continue your learning journey
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hafazny-blue">0</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Verses Memorized</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hafazny-gold">Beginner</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Arabic Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hafazny-teal">0</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Study Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Progress Overview */}
            <div className="glass-panel rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-hafazny-blue p-4">
                <h2 className="text-white text-lg font-semibold">Daily Progress</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Today's Goal</span>
                  <span className="text-sm font-bold">0 / 5 verses</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
                  <div className="bg-hafazny-blue h-2.5 rounded-full w-0"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm">Study Time</span>
                    </div>
                    <span className="text-sm font-medium">0 min today</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm">Achievements</span>
                    </div>
                    <span className="text-sm font-medium">0 unlocked</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="glass-panel rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="bg-hafazny-navy p-4">
                <h2 className="text-white text-lg font-semibold">Quick Actions</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <BookOpen className="h-6 w-6 text-hafazny-blue mb-2" />
                    <span className="text-sm font-medium">Start Memorizing</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Mic className="h-6 w-6 text-hafazny-gold mb-2" />
                    <span className="text-sm font-medium">Record Recitation</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <GraduationCap className="h-6 w-6 text-hafazny-teal mb-2" />
                    <span className="text-sm font-medium">Arabic Lesson</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Users className="h-6 w-6 text-hafazny-navy mb-2" />
                    <span className="text-sm font-medium">Join Group</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="glass-panel rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="bg-hafazny-teal p-4">
                <h2 className="text-white text-lg font-semibold">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">No recent activity</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Start your memorization journey to see activity here
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Modules */}
          <h2 className="text-2xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            Learning Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Quran Module */}
            <a 
              href="/quran" 
              className="glass-panel p-6 rounded-xl card-hover animate-fade-in-up flex items-start justify-between"
              style={{ animationDelay: '500ms' }}
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-hafazny-blue/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-hafazny-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quran Memorization</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Personalized memorization plans with AI-powered feedback
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </a>
            
            {/* Arabic Module */}
            <a 
              href="/arabic" 
              className="glass-panel p-6 rounded-xl card-hover animate-fade-in-up flex items-start justify-between"
              style={{ animationDelay: '600ms' }}
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-hafazny-gold/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-hafazny-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Arabic Learning</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Interactive lessons from beginner to advanced levels
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </a>
            
            {/* Tajweed Module */}
            <a 
              href="/tajweed" 
              className="glass-panel p-6 rounded-xl card-hover animate-fade-in-up flex items-start justify-between"
              style={{ animationDelay: '700ms' }}
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-hafazny-teal/10 flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-hafazny-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tajweed Mastery</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Video lessons and practice with pronunciation feedback
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </a>
          </div>

          {/* Upcoming Feature Banner */}
          <div className="glass-panel p-6 rounded-xl bg-gradient-to-r from-hafazny-navy to-hafazny-blue text-white animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Community Features Coming Soon!</h3>
                <p className="opacity-90">Join study groups, compete with friends, and share your achievements.</p>
              </div>
              <button className="px-4 py-2 bg-white text-hafazny-blue rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
