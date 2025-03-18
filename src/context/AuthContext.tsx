
import React, { createContext, useContext, useState, useEffect } from 'react';

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  // Add more user properties as needed
}

// Auth context type definition
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Mock authentication check for now
        // Will be replaced with real authentication in future iteration
        const savedUser = localStorage.getItem('hafazny-user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation
      // In a real app, you would validate credentials via API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock successful login
      if (email && password) {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          profileImage: '/placeholder.svg',
        };
        
        setUser(mockUser);
        localStorage.setItem('hafazny-user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock registration function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation
      // In a real app, you would send registration data to API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock successful registration
      if (name && email && password) {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          profileImage: '/placeholder.svg',
        };
        
        setUser(mockUser);
        localStorage.setItem('hafazny-user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('hafazny-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
