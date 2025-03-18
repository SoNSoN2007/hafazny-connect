
import React, { useRef, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { Book, GraduationCap, Mic, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardElement = cardRef.current;
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="glass-panel p-6 rounded-xl card-hover opacity-0 translate-y-8 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-hafazny-blue/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">{getTranslation('featuresTitle')}</h2>
          <div className="divider mx-auto"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our comprehensive suite of tools to help you on your journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Book className="h-6 w-6 text-hafazny-blue" />}
            title={getTranslation('quranMemorizationTitle')}
            description={getTranslation('quranMemorizationDesc')}
            delay={0}
          />
          
          <FeatureCard 
            icon={<GraduationCap className="h-6 w-6 text-hafazny-blue" />}
            title={getTranslation('arabicLearningTitle')}
            description={getTranslation('arabicLearningDesc')}
            delay={200}
          />
          
          <FeatureCard 
            icon={<Mic className="h-6 w-6 text-hafazny-blue" />}
            title={getTranslation('tajweedMasteryTitle')}
            description={getTranslation('tajweedMasteryDesc')}
            delay={400}
          />
          
          <FeatureCard 
            icon={<Users className="h-6 w-6 text-hafazny-blue" />}
            title={getTranslation('communityTitle')}
            description={getTranslation('communityDesc')}
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
