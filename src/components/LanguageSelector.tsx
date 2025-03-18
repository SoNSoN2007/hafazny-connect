
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { getCurrentLanguage, setLanguage, languageOptions } from '@/lib/i18n';

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
    setCurrentLang(langCode as any);
    setIsOpen(false);
    
    // Reload to apply RTL changes if needed
    if ((currentLang === 'ar' || currentLang === 'om') !== (langCode === 'ar' || langCode === 'om')) {
      window.location.reload();
    }
  };

  // Get current language label
  const currentLanguageLabel = languageOptions.find(lang => lang.value === currentLang)?.label || 'English';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 mr-1 text-gray-500" />
        <span>{currentLanguageLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="glass-panel absolute right-0 mt-2 w-48 py-2 z-10 animate-scale-in">
          <div className="py-1">
            {languageOptions.map((language) => (
              <button
                key={language.value}
                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150 ${
                  language.value === currentLang ? 'text-hafazny-blue font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleLanguageChange(language.value)}
              >
                {language.value === currentLang && <Check className="h-4 w-4 mr-2" />}
                <span className={language.value === currentLang ? '' : 'ml-6'}>
                  {language.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
