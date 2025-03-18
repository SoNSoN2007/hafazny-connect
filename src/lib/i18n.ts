
// Simple internationalization utility
// This will be expanded in a future iteration

type SupportedLanguage = 'en' | 'ar' | 'fr' | 'es' | 'om';

interface Translation {
  [key: string]: string;
}

interface TranslationSet {
  [language: string]: Translation;
}

// Initial translations
export const translations: TranslationSet = {
  en: {
    // Navbar
    home: "Home",
    quran: "Quran",
    arabic: "Arabic",
    tajweed: "Tajweed",
    community: "Community",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    
    // Hero Section
    heroTitle: "Memorize the Quran with Confidence",
    heroSubtitle: "Personalized learning, advanced speech recognition, and a supportive community",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // Features Section
    featuresTitle: "Features",
    quranMemorizationTitle: "Quran Memorization",
    quranMemorizationDesc: "Personalized plans and AI-powered recitation analysis",
    arabicLearningTitle: "Arabic Learning",
    arabicLearningDesc: "From basic to advanced, interactive lessons and exercises",
    tajweedMasteryTitle: "Tajweed Mastery",
    tajweedMasteryDesc: "Video lessons and pronunciation feedback",
    communityTitle: "Community",
    communityDesc: "Join groups, compete, and share your achievements",
    
    // Auth Forms
    welcomeBack: "Welcome back",
    loginToContinue: "Login to continue your journey",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create Account",
    registerTitle: "Join Hafazny",
    registerSubtitle: "Create your account to start your journey",
    name: "Full Name",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    
    // Footer
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    copyright: "© 2023 Hafazny. All rights reserved.",
  },
  ar: {
    // Navbar
    home: "الرئيسية",
    quran: "القرآن",
    arabic: "العربية",
    tajweed: "التجويد",
    community: "المجتمع",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    dashboard: "لوحة التحكم",
    
    // Hero Section
    heroTitle: "احفظ القرآن بثقة",
    heroSubtitle: "تعلم مخصص، تعرف متقدم على الصوت، ومجتمع داعم",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    
    // Features Section
    featuresTitle: "المميزات",
    quranMemorizationTitle: "حفظ القرآن",
    quranMemorizationDesc: "خطط مخصصة وتحليل التلاوة بالذكاء الاصطناعي",
    arabicLearningTitle: "تعلم العربية",
    arabicLearningDesc: "من المبتدئ إلى المتقدم، دروس وتمارين تفاعلية",
    tajweedMasteryTitle: "إتقان التجويد",
    tajweedMasteryDesc: "دروس فيديو وملاحظات على النطق",
    communityTitle: "المجتمع",
    communityDesc: "انضم إلى مجموعات، تنافس، وشارك إنجازاتك",
    
    // Auth Forms
    welcomeBack: "مرحبًا بعودتك",
    loginToContinue: "سجل الدخول لمواصلة رحلتك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    dontHaveAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    registerTitle: "انضم إلى حفظني",
    registerSubtitle: "أنشئ حسابك لبدء رحلتك",
    name: "الاسم الكامل",
    confirmPassword: "تأكيد كلمة المرور",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    
    // Footer
    about: "عن حفظني",
    contact: "اتصل بنا",
    privacy: "الخصوصية",
    terms: "الشروط",
    copyright: "© 2023 حفظني. جميع الحقوق محفوظة.",
  },
  // Add other languages similarly
  fr: {
    // Basic translations - to be expanded
    home: "Accueil",
    quran: "Coran",
    login: "Connexion",
    signup: "S'inscrire",
  },
  es: {
    // Basic translations - to be expanded
    home: "Inicio",
    quran: "Corán",
    login: "Iniciar sesión",
    signup: "Registrarse",
  },
  om: {
    // Basic translations - to be expanded
    home: "الصفحة الرئيسية",
    quran: "القرآن",
    login: "تسجيل الدخول",
    signup: "التسجيل",
  },
};

// Default language
let currentLanguage: SupportedLanguage = 'en';

// Get from localStorage if available
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('hafazny-language') as SupportedLanguage;
  if (savedLang && translations[savedLang]) {
    currentLanguage = savedLang;
  }
}

export const getCurrentLanguage = (): SupportedLanguage => {
  return currentLanguage;
};

export const setLanguage = (lang: SupportedLanguage): void => {
  if (translations[lang]) {
    currentLanguage = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('hafazny-language', lang);
      // Add RTL handling
      if (lang === 'ar' || lang === 'om') {
        document.documentElement.dir = 'rtl';
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.classList.remove('rtl');
      }
    }
  }
};

export const getTranslation = (key: string): string => {
  if (translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  
  // Fallback to English if translation not found
  if (translations['en'] && translations['en'][key]) {
    return translations['en'][key];
  }
  
  // Return the key itself if no translation found
  return key;
};

// Language options for selector
export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
  { value: 'om', label: 'عُماني' },
];
