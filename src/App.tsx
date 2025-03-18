
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
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { getCurrentLanguage } from "./lib/i18n";

const queryClient = new QueryClient();

const App = () => {
  // Initialize RTL support based on saved language
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
              {/* These routes will be implemented in future iterations */}
              <Route path="/arabic" element={<NotFound />} />
              <Route path="/tajweed" element={<NotFound />} />
              <Route path="/community" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
