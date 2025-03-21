
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Quran from "./pages/Quran";
import SurahView from "./pages/SurahView";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Tajweed from "./pages/Tajweed";
import Arabic from "./pages/Arabic";
import MemorizationPlan from "./pages/MemorizationPlan";
import About from "./pages/About";
import { useEffect } from "react";
import { getCurrentLanguage } from "./lib/i18n";

// Import our learning pages
import ArabicAlphabet from "./pages/learning/ArabicAlphabet";
import GrammarLesson from "./pages/learning/GrammarLesson";
import QuranicVocabulary from "./pages/learning/QuranicVocabulary";
import TajweedLesson from "./pages/learning/TajweedLesson";
import TajweedPractice from "./pages/learning/TajweedPractice";
import QuranMemorization from "./pages/QuranMemorization";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const lang = getCurrentLanguage();
    if (lang === 'ar' || lang === 'om') {
      document.documentElement.dir = 'rtl';
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.classList.remove('rtl');
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/quran/:id" element={<SurahView />} />
              <Route path="/arabic" element={<Arabic />} />
              <Route path="/tajweed" element={<Tajweed />} />
              <Route path="/community" element={<Community />} />
              <Route path="/memorization-plan" element={<MemorizationPlan />} />
              <Route path="/about" element={<About />} />
              
              {/* Arabic learning routes */}
              <Route path="/learning/arabic-alphabet" element={<ArabicAlphabet />} />
              <Route path="/learning/grammar" element={<GrammarLesson />} />
              <Route path="/learning/vocabulary" element={<QuranicVocabulary />} />
              
              {/* Tajweed learning routes */}
              <Route path="/learning/tajweed-lesson" element={<TajweedLesson />} />
              <Route path="/learning/tajweed-practice" element={<TajweedPractice />} />
              
              {/* Quran Memorization route */}
              <Route path="/quran-memorization/:surahId" element={<QuranMemorization />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
