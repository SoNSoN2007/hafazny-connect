
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getTranslation } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElement = heroRef.current;
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 subtle-gradient overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={heroRef} 
          className="flex flex-col lg:flex-row items-center justify-between gap-12 opacity-0 translate-y-8 transition-all duration-1000"
        >
          {/* Left Content */}
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <div className="inline-block rounded-full bg-hafazny-blue/10 px-3 py-1 text-sm font-medium text-hafazny-blue">
              Beta Version 1.0
            </div>
            
            <h1 className="heading-xl">
              {getTranslation('heroTitle')}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {getTranslation('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth/register" className="btn-primary flex items-center justify-center">
                {getTranslation('getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link to="/about" className="btn-secondary">
                {getTranslation('learnMore')}
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">5,000+</span> happy users
              </div>
            </div>
          </div>
          
          {/* Right Content - Decorative Elements */}
          <div className="w-full max-w-lg relative">
            <div className="glass-panel p-6 md:p-8 rounded-2xl animate-float">
              <div className="relative overflow-hidden rounded-lg aspect-video bg-hafazny-navy/5">
                {/* Arabic Text overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="quran-text arabic text-2xl md:text-3xl text-hafazny-navy px-6 text-center">
                    إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ
                  </p>
                </div>
              </div>
              
              {/* App Screenshots/Features Preview */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-lg">
                  <div className="w-10 h-10 bg-hafazny-blue/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-hafazny-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">Personalized Plans</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customized memorization schedules</p>
                </div>
                
                <div className="glass-panel p-4 rounded-lg">
                  <div className="w-10 h-10 bg-hafazny-gold/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-hafazny-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">Voice Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered pronunciation feedback</p>
                </div>
                
                <div className="glass-panel p-4 rounded-lg">
                  <div className="w-10 h-10 bg-hafazny-teal/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-hafazny-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">Arabic Learning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interactive lessons for all levels</p>
                </div>
                
                <div className="glass-panel p-4 rounded-lg">
                  <div className="w-10 h-10 bg-hafazny-navy/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-hafazny-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">Community</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn and compete with friends</p>
                </div>
              </div>
            </div>
            
            {/* Floating decoration elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-hafazny-blue/10 rounded-full filter blur-xl animate-pulse-soft"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-hafazny-gold/10 rounded-full filter blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
