import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: 'google' | 'apple') => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo - in production, this would come from Azure backend
const mockUser: User = {
  id: '1',
  email: 'demo@afriauto.com',
  name: 'Demo User',
  provider: 'google',
  role: 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAdmin: User = {
  id: '2',
  email: 'admin@afriauto.com',
  name: 'Admin User',
  provider: 'google',
  role: 'admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const storedUser = localStorage.getItem('afriauto_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    try {
      // In production, this would redirect to OAuth provider via Azure backend
      // For demo, we'll simulate a successful login
      console.log(`Initiating ${provider} login...`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, check if URL has admin param
      const urlParams = new URLSearchParams(window.location.search);
      const isAdmin = urlParams.get('admin') === 'true';
      
      const loggedInUser = isAdmin ? mockAdmin : mockUser;
      setUser(loggedInUser);
      localStorage.setItem('afriauto_user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('afriauto_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
