
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle route change to close menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hafazny-blue to-hafazny-navy">
            Hafazny
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className={`nav-item ${isActive('/') ? 'nav-item-active' : ''}`}
          >
            {getTranslation('home')}
          </Link>
          <Link
            to="/quran"
            className={`nav-item ${isActive('/quran') ? 'nav-item-active' : ''}`}
          >
            {getTranslation('quran')}
          </Link>
          <Link
            to="/arabic"
            className={`nav-item ${isActive('/arabic') ? 'nav-item-active' : ''}`}
          >
            {getTranslation('arabic')}
          </Link>
          <Link
            to="/tajweed"
            className={`nav-item ${isActive('/tajweed') ? 'nav-item-active' : ''}`}
          >
            {getTranslation('tajweed')}
          </Link>
          <Link
            to="/community"
            className={`nav-item ${isActive('/community') ? 'nav-item-active' : ''}`}
          >
            {getTranslation('community')}
          </Link>
        </div>

        {/* Right side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-hafazny-blue/10 flex items-center justify-center overflow-hidden">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-hafazny-blue" />
                  )}
                </div>
              </button>
              
              {userMenuOpen && (
                <div className="glass-panel absolute right-0 mt-2 w-48 py-2 z-10 animate-scale-in">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {getTranslation('dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {getTranslation('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-sm font-medium hover:text-hafazny-blue transition-colors"
              >
                {getTranslation('login')}
              </Link>
              <Link
                to="/auth/register"
                className="btn-primary text-sm px-4 py-2"
              >
                {getTranslation('signup')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel m-4 rounded-xl shadow-lg animate-scale-in overflow-hidden">
          <div className="flex flex-col">
            <Link
              to="/"
              className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 ${
                isActive('/') ? 'text-hafazny-blue font-semibold' : ''
              }`}
            >
              {getTranslation('home')}
            </Link>
            <Link
              to="/quran"
              className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 ${
                isActive('/quran') ? 'text-hafazny-blue font-semibold' : ''
              }`}
            >
              {getTranslation('quran')}
            </Link>
            <Link
              to="/arabic"
              className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 ${
                isActive('/arabic') ? 'text-hafazny-blue font-semibold' : ''
              }`}
            >
              {getTranslation('arabic')}
            </Link>
            <Link
              to="/tajweed"
              className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 ${
                isActive('/tajweed') ? 'text-hafazny-blue font-semibold' : ''
              }`}
            >
              {getTranslation('tajweed')}
            </Link>
            <Link
              to="/community"
              className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 ${
                isActive('/community') ? 'text-hafazny-blue font-semibold' : ''
              }`}
            >
              {getTranslation('community')}
            </Link>
            
            <div className="flex justify-between items-center p-4">
              <LanguageSelector />
              
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center px-4 py-2 bg-hafazny-blue text-white rounded-lg text-sm font-medium"
                >
                  {getTranslation('dashboard')}
                </Link>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    {getTranslation('login')}
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 text-sm bg-hafazny-blue text-white rounded-lg"
                  >
                    {getTranslation('signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
