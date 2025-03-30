import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProgress } from '@/lib/types';
import { storageService } from '@/lib/storage';

// Interface for login data
interface LoginData {
  username: string;
  password: string;
}

// Interface for register data
interface RegisterData {
  username: string;
  password: string;
}

// Authentication context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updatePoints: (points: number) => void;
  updateLives: (lives: number) => void;
};

// Create context
export const AuthContext = createContext<AuthContextType | null>(null);

// Authentication provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    try {
      // Initialize demo data if needed
      storageService.initializeDemoData();
      
      // Check if user is logged in
      const currentUser = storageService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (err) {
      console.error('Error initializing auth:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (data: LoginData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate credentials
      const validatedUser = storageService.validateUser(data.username, data.password);
      
      if (!validatedUser) {
        throw new Error('Invalid username or password');
      }
      
      // Set the current user
      setUser(validatedUser);
      storageService.setCurrentUser(validatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if username already exists
      const existingUser = storageService.getUserByUsername(data.username);
      
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      // Validate username and password
      if (data.username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }
      
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create new user
      const newUser = storageService.createUser(data.username, data.password);
      
      // Set as current user
      setUser(newUser);
      storageService.setCurrentUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Clear current user
      setUser(null);
      storageService.setCurrentUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user points
  const updatePoints = (points: number): void => {
    if (!user) return;
    
    try {
      // Update user points
      storageService.updateUserPoints(user.id, points);
      
      // Update state
      setUser(prev => {
        if (!prev) return null;
        return { ...prev, points };
      });
    } catch (err) {
      console.error('Error updating points:', err);
    }
  };

  // Update user lives
  const updateLives = (lives: number): void => {
    if (!user) return;
    
    try {
      // Update user lives
      storageService.updateUserLives(user.id, lives);
      
      // Update state
      setUser(prev => {
        if (!prev) return null;
        return { ...prev, lives };
      });
    } catch (err) {
      console.error('Error updating lives:', err);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    updatePoints,
    updateLives
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}