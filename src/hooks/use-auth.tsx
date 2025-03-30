import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// User type
export interface User {
  id: number;
  username: string;
  password?: string; // Only used during authentication, not stored in state
  points: number;
  lives: number;
}

// Login credentials type
type LoginData = Pick<User, "username" | "password">;

// Registration data type
type RegisterData = Pick<User, "username" | "password">;

// Context type definition
type AuthContextType = {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  error: Error | null;
  login: (credentials: LoginData) => Promise<Omit<User, "password">>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<Omit<User, "password">>;
  updatePoints: (points: number) => void;
  updateLives: (lives: number) => void;
};

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | null>(null);

// Storage key for persisting user data
const USER_STORAGE_KEY = 'cybercalc_user';
const USERS_STORAGE_KEY = 'cybercalc_users';

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error loading user from localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper to get all registered users from localStorage
  const getUsers = (): User[] => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (err) {
      console.error('Error loading users from localStorage:', err);
      return [];
    }
  };

  // Helper to save users to localStorage
  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Login function
  const login = async (credentials: LoginData): Promise<Omit<User, "password">> => {
    setError(null);
    
    try {
      const users = getUsers();
      const user = users.find((u) => u.username === credentials.username);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      if (user.password !== credentials.password) {
        throw new Error('Contraseña incorrecta');
      }
      
      // Omit password from user object before saving to state
      const { password, ...userWithoutPassword } = user;
      
      // Save user to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setError(null);
    
    try {
      // Remove user from state and localStorage
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<Omit<User, "password">> => {
    setError(null);
    
    try {
      const users = getUsers();
      
      // Check if username already exists
      if (users.some((u) => u.username === data.username)) {
        throw new Error('El nombre de usuario ya está en uso');
      }
      
      // Create new user with default values
      const newUser: User = {
        id: Date.now(), // Simple unique ID
        username: data.username,
        password: data.password,
        points: 0,
        lives: 3,
      };
      
      // Add user to storage
      saveUsers([...users, newUser]);
      
      // Omit password from user object before saving to state
      const { password, ...userWithoutPassword } = newUser;
      
      // Save user to state and localStorage (for current session)
      setUser(userWithoutPassword);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // Update user points
  const updatePoints = (points: number) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, points };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Also update in users array
      const users = getUsers();
      const updatedUsers = users.map((u) => 
        u.id === user.id ? { ...u, points } : u
      );
      saveUsers(updatedUsers);
    } catch (err) {
      console.error('Error updating points:', err);
    }
  };

  // Update user lives
  const updateLives = (lives: number) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, lives };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Also update in users array
      const users = getUsers();
      const updatedUsers = users.map((u) => 
        u.id === user.id ? { ...u, lives } : u
      );
      saveUsers(updatedUsers);
    } catch (err) {
      console.error('Error updating lives:', err);
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    updatePoints,
    updateLives,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}