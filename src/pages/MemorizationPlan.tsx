
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MemorizationPlanCreator from '@/components/memorization/MemorizationPlanCreator';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const MemorizationPlan: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-hafazny-navy to-hafazny-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Memorization Plan</h1>
                <p className="text-lg opacity-90 mb-6">
                  Design a personalized plan to guide your Quran memorization journey. Set goals, track progress, and stay consistent.
                </p>
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

          {/* Plan Creator */}
          <div className="mb-12">
            <MemorizationPlanCreator />
          </div>

          {/* Benefits Section */}
          <div className="glass-panel p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-6">Benefits of Personalized Memorization Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-hafazny-blue/10 flex items-center justify-center text-hafazny-blue mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Consistency</h3>
                <p className="text-gray-600">
                  Stay on track with a structured daily plan tailored to your schedule and capabilities.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-hafazny-gold/10 flex items-center justify-center text-hafazny-gold mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /><path d="m15 5 3 3" /></svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Personalization</h3>
                <p className="text-gray-600">
                  Customize your plan based on your learning style, pace, and specific memorization goals.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-hafazny-teal/10 flex items-center justify-center text-hafazny-teal mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Visualize your memorization journey with detailed progress tracking and analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="glass-panel p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-600 italic mb-4">
                  "The personalized memorization plan helped me complete Juz Amma in just 4 months. The structured approach and daily reminders were exactly what I needed to stay consistent."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Ahmed S.</p>
                    <p className="text-sm text-gray-500">Completed Juz Amma</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-gray-600 italic mb-4">
                  "As a busy professional, finding time to memorize the Quran was challenging. The customized plan worked around my schedule and helped me make steady progress despite my limited time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Fatima K.</p>
                    <p className="text-sm text-gray-500">Memorized 10 Surahs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass-panel p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">How long will it take to memorize the entire Quran?</h3>
                <p className="text-gray-600">
                  The time required varies based on your dedication, background, and daily commitment. With consistent effort of 30-60 minutes daily, it typically takes 3-5 years for most people.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">Can I modify my plan after creating it?</h3>
                <p className="text-gray-600">
                  Yes, you can adjust your plan at any time to accommodate changes in your schedule, learning pace, or goals.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">What if I fall behind schedule?</h3>
                <p className="text-gray-600">
                  Our system is designed to help you adapt. If you fall behind, the plan will automatically adjust to help you catch up gradually without overwhelming you.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Ready to start your memorization journey?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Create your personalized plan today and take the first step towards memorizing the Quran with confidence and consistency.
            </p>
            <Button size="lg" className="bg-hafazny-blue">
              Create Your Plan Now
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MemorizationPlan;
