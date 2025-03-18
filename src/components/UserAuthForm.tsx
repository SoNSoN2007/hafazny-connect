
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTranslation } from '@/lib/i18n';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface UserAuthFormProps {
  type: 'login' | 'register';
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (type === 'register' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (type === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
        toast({
          title: "Success!",
          description: "You've successfully logged in",
        });
        navigate('/dashboard');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast({
          title: "Account created!",
          description: "Your account has been successfully created",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-xl w-full max-w-md mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {type === 'login' ? getTranslation('welcomeBack') : getTranslation('registerTitle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {type === 'login' ? getTranslation('loginToContinue') : getTranslation('registerSubtitle')}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              {getTranslation('name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            {getTranslation('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            {getTranslation('password')}
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              {getTranslation('confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        
        {type === 'login' && (
          <div className="flex justify-end">
            <Link to="/auth/forgot-password" className="text-sm text-hafazny-blue hover:underline">
              {getTranslation('forgotPassword')}
            </Link>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : null}
          {type === 'login' ? getTranslation('login') : getTranslation('createAccount')}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {type === 'login' 
            ? getTranslation('dontHaveAccount') 
            : getTranslation('alreadyHaveAccount')}
          {' '}
          <Link 
            to={type === 'login' ? '/auth/register' : '/auth/login'} 
            className="text-hafazny-blue font-medium hover:underline"
          >
            {type === 'login' ? getTranslation('createAccount') : getTranslation('login')}
          </Link>
        </p>
      </div>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </button>
          
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.7 8.3c-.2-.1-.5-.2-.8-.2h-.9v-.1c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v.1h-3v-.1c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v.1h-.9c-.8 0-1.6.7-1.6 1.5v11.7c0 .8.7 1.5 1.5 1.5H19c.8 0 1.5-.7 1.5-1.5V9.8c0-.7-.3-1.3-.8-1.5zm-13.4-.1v-.1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v.1H6.3zm9 0v-.1c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v.1h-3zm-1.4 5.4c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm-8.4 0c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm10.4 7.1H7.3c-.2 0-.3-.1-.3-.3V18c0-.2.1-.3.3-.3h8.6c.2 0 .3.1.3.3v2.4c0 .2-.1.3-.3.3zm0-4.5H7.3c-.2 0-.3-.1-.3-.3v-2.4c0-.2.1-.3.3-.3h8.6c.2 0 .3.1.3.3v2.4c0 .2-.1.3-.3.3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthForm;
