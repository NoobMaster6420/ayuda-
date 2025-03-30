import { User, UserProgress, Quiz, Challenge } from './types';

// LocalStorage keys
const STORAGE_KEYS = {
  USERS: 'cybercalc_users',
  CURRENT_USER: 'cybercalc_current_user',
  QUIZZES: 'cybercalc_quizzes',
  CHALLENGES: 'cybercalc_challenges',
  USER_PROGRESS: 'cybercalc_user_progress'
};

// Helper methods for localStorage
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
  }
};

// Storage service for GitHub Pages version
export const storageService = {
  // User management
  getUsers: (): User[] => {
    return getItem<User[]>(STORAGE_KEYS.USERS, []);
  },
  
  getCurrentUser: (): User | null => {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  
  getUserById: (id: number): User | undefined => {
    const users = storageService.getUsers();
    return users.find(user => user.id === id);
  },
  
  getUserByUsername: (username: string): User | undefined => {
    const users = storageService.getUsers();
    return users.find(user => user.username === username);
  },
  
  createUser: (username: string, password: string): User => {
    const users = storageService.getUsers();
    
    // Generate user ID
    const id = Date.now();
    
    // Create new user
    const newUser: User = {
      id,
      username,
      points: 0,
      lives: 3
    };
    
    // Store password separately in a secure way (hashing would be better in a real app)
    // For demo purposes we'll store it in localStorage
    setItem(`user_${id}_password`, password);
    
    // Add user to users list
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    
    // Create initial progress for this user
    const progress: UserProgress = {
      userId: id,
      points: 0,
      lives: 3,
      completedChallenges: [],
      completedQuizzes: [],
      level: 1
    };
    storageService.saveUserProgress(progress);
    
    return newUser;
  },
  
  validateUser: (username: string, password: string): User | null => {
    const user = storageService.getUserByUsername(username);
    
    if (!user) {
      return null;
    }
    
    const storedPassword = getItem<string>(`user_${user.id}_password`, '');
    
    return password === storedPassword ? user : null;
  },
  
  setCurrentUser: (user: User | null): void => {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },
  
  updateUserPoints: (userId: number, points: number): User | undefined => {
    const users = storageService.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return undefined;
    }
    
    users[userIndex].points = points;
    setItem(STORAGE_KEYS.USERS, users);
    
    // Update current user if this is the current user
    const currentUser = storageService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.points = points;
      storageService.setCurrentUser(currentUser);
    }
    
    return users[userIndex];
  },
  
  updateUserLives: (userId: number, lives: number): User | undefined => {
    const users = storageService.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return undefined;
    }
    
    users[userIndex].lives = lives;
    setItem(STORAGE_KEYS.USERS, users);
    
    // Update current user if this is the current user
    const currentUser = storageService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.lives = lives;
      storageService.setCurrentUser(currentUser);
    }
    
    return users[userIndex];
  },
  
  // User progress management
  getUserProgress: (userId: number): UserProgress | undefined => {
    const allProgress = getItem<UserProgress[]>(STORAGE_KEYS.USER_PROGRESS, []);
    return allProgress.find(progress => progress.userId === userId);
  },
  
  saveUserProgress: (progress: UserProgress): void => {
    const allProgress = getItem<UserProgress[]>(STORAGE_KEYS.USER_PROGRESS, []);
    const progressIndex = allProgress.findIndex(p => p.userId === progress.userId);
    
    if (progressIndex >= 0) {
      allProgress[progressIndex] = progress;
    } else {
      allProgress.push(progress);
    }
    
    setItem(STORAGE_KEYS.USER_PROGRESS, allProgress);
  },
  
  // Quiz management
  getQuizzesByUserId: (userId: number): Quiz[] => {
    const quizzes = getItem<Quiz[]>(STORAGE_KEYS.QUIZZES, []);
    return quizzes.filter(quiz => quiz.userId === userId);
  },
  
  saveQuiz: (quiz: Omit<Quiz, "id">): Quiz => {
    const quizzes = getItem<Quiz[]>(STORAGE_KEYS.QUIZZES, []);
    const id = Date.now();
    const newQuiz: Quiz = { ...quiz, id };
    
    quizzes.push(newQuiz);
    setItem(STORAGE_KEYS.QUIZZES, quizzes);
    
    // Update user progress to mark this quiz as completed
    const progress = storageService.getUserProgress(quiz.userId);
    if (progress) {
      progress.completedQuizzes.push(id);
      progress.points += quiz.score;
      
      // Update user points as well
      const user = storageService.getUserById(quiz.userId);
      if (user) {
        user.points += quiz.score;
        storageService.updateUserPoints(user.id, user.points);
      }
      
      storageService.saveUserProgress(progress);
    }
    
    return newQuiz;
  },
  
  // Challenge management
  getChallengesByUserId: (userId: number): Challenge[] => {
    const challenges = getItem<Challenge[]>(STORAGE_KEYS.CHALLENGES, []);
    return challenges.filter(challenge => challenge.userId === userId);
  },
  
  saveChallenge: (challenge: Omit<Challenge, "id">): Challenge => {
    const challenges = getItem<Challenge[]>(STORAGE_KEYS.CHALLENGES, []);
    const id = Date.now();
    const newChallenge: Challenge = { ...challenge, id };
    
    challenges.push(newChallenge);
    setItem(STORAGE_KEYS.CHALLENGES, challenges);
    
    // Update user progress to mark this challenge as completed
    if (challenge.completed) {
      const progress = storageService.getUserProgress(challenge.userId);
      if (progress) {
        progress.completedChallenges.push(id);
        progress.points += challenge.score;
        
        // Update user points as well
        const user = storageService.getUserById(challenge.userId);
        if (user) {
          user.points += challenge.score;
          storageService.updateUserPoints(user.id, user.points);
        }
        
        storageService.saveUserProgress(progress);
      }
    }
    
    return newChallenge;
  },
  
  // Leaderboard
  getTopUsers: (limit: number = 10): User[] => {
    const users = storageService.getUsers();
    return [...users]
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  },
  
  // Clear all data (for testing)
  clearAllData: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.CHALLENGES);
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    
    // Also remove all user passwords
    const users = storageService.getUsers();
    users.forEach(user => {
      localStorage.removeItem(`user_${user.id}_password`);
    });
  },
  
  // Demo data initialization (for testing)
  initializeDemoData: (): void => {
    // Only initialize if no data exists
    if (storageService.getUsers().length === 0) {
      // Create some demo users
      const users: User[] = [
        { id: 101, username: 'alice', points: 230, lives: 3 },
        { id: 102, username: 'bob', points: 180, lives: 2 },
        { id: 103, username: 'charlie', points: 320, lives: 3 },
        { id: 104, username: 'diana', points: 150, lives: 1 },
        { id: 105, username: 'edward', points: 270, lives: 3 }
      ];
      
      // Set passwords
      users.forEach(user => {
        setItem(`user_${user.id}_password`, 'password');
      });
      
      // Save users
      setItem(STORAGE_KEYS.USERS, users);
      
      // Create progress for each user
      users.forEach(user => {
        const progress: UserProgress = {
          userId: user.id,
          points: user.points,
          lives: user.lives,
          completedChallenges: [],
          completedQuizzes: [],
          level: Math.ceil(user.points / 100) + 1
        };
        storageService.saveUserProgress(progress);
      });
    }
  }
};