// LocalStorage-based data persistence service for GitHub Pages deployment

// Types
export interface User {
  id: number;
  username: string;
  password: string; // Note: In a real app, never store passwords in localStorage
  points: number;
  lives: number;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface Quiz {
  id: number;
  userId: number;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completedAt: string;
}

export interface Challenge {
  id: number;
  userId: number;
  score: number;
  completedAt: string;
}

export interface UserProgress {
  userId: number;
  points: number;
  lives: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  formula: string;
  options: {
    id: string;
    formula: string;
  }[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChallengeQuestion {
  id: number;
  question: string;
  formula: string;
  options: {
    id: string;
    formula: string;
  }[];
  correctOptionId: string;
  explanation: string;
  points: number;
}

// Storage keys
const STORAGE_KEYS = {
  USERS: 'cybercalc_users',
  QUIZZES: 'cybercalc_quizzes',
  CHALLENGES: 'cybercalc_challenges',
  CURRENT_USER_ID: 'cybercalc_current_user_id',
  CURRENT_QUIZ_ID: 'cybercalc_current_quiz_id',
  CURRENT_CHALLENGE_ID: 'cybercalc_current_challenge_id',
};

// Helper functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Storage Service
export class LocalStorage {
  private users: Map<number, User>;
  private quizzes: Map<number, Quiz>;
  private challenges: Map<number, Challenge>;
  private currentUserId: number;
  private currentQuizId: number;
  private currentChallengeId: number;

  constructor() {
    // Load data from localStorage or initialize empty collections
    const usersArray = getFromStorage<[number, User][]>(STORAGE_KEYS.USERS, []);
    const quizzesArray = getFromStorage<[number, Quiz][]>(STORAGE_KEYS.QUIZZES, []);
    const challengesArray = getFromStorage<[number, Challenge][]>(STORAGE_KEYS.CHALLENGES, []);
    
    this.users = new Map(usersArray);
    this.quizzes = new Map(quizzesArray);
    this.challenges = new Map(challengesArray);
    
    this.currentUserId = getFromStorage<number>(STORAGE_KEYS.CURRENT_USER_ID, 1);
    this.currentQuizId = getFromStorage<number>(STORAGE_KEYS.CURRENT_QUIZ_ID, 1);
    this.currentChallengeId = getFromStorage<number>(STORAGE_KEYS.CURRENT_CHALLENGE_ID, 1);
    
    // Save initial state if it didn't exist
    this.saveState();
  }

  private saveState(): void {
    setToStorage(STORAGE_KEYS.USERS, Array.from(this.users.entries()));
    setToStorage(STORAGE_KEYS.QUIZZES, Array.from(this.quizzes.entries()));
    setToStorage(STORAGE_KEYS.CHALLENGES, Array.from(this.challenges.entries()));
    setToStorage(STORAGE_KEYS.CURRENT_USER_ID, this.currentUserId);
    setToStorage(STORAGE_KEYS.CURRENT_QUIZ_ID, this.currentQuizId);
    setToStorage(STORAGE_KEYS.CURRENT_CHALLENGE_ID, this.currentChallengeId);
  }

  // User methods
  async getUser(id: number): Promise<UserWithoutPassword | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(user: Omit<User, 'id' | 'points' | 'lives'>): Promise<UserWithoutPassword> {
    const id = this.currentUserId++;
    const newUser: User = { 
      ...user, 
      id, 
      points: 0, 
      lives: 3 
    };
    
    this.users.set(id, newUser);
    this.saveState();
    
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUserPoints(userId: number, points: number): Promise<UserWithoutPassword | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.points = points;
    this.users.set(userId, user);
    this.saveState();
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUserLives(userId: number, lives: number): Promise<UserWithoutPassword | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    user.lives = lives;
    this.users.set(userId, user);
    this.saveState();
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    return {
      userId: user.id,
      points: user.points,
      lives: user.lives
    };
  }

  // Quiz methods
  async getQuizzesByUserId(userId: number): Promise<Quiz[]> {
    const userQuizzes: Quiz[] = [];
    
    for (const quiz of this.quizzes.values()) {
      if (quiz.userId === userId) {
        userQuizzes.push(quiz);
      }
    }
    
    return userQuizzes;
  }

  async createQuiz(quiz: Omit<Quiz, 'id'>): Promise<Quiz> {
    const id = this.currentQuizId++;
    const newQuiz: Quiz = { ...quiz, id };
    
    this.quizzes.set(id, newQuiz);
    this.saveState();
    
    return newQuiz;
  }

  // Challenge methods
  async getChallengesByUserId(userId: number): Promise<Challenge[]> {
    const userChallenges: Challenge[] = [];
    
    for (const challenge of this.challenges.values()) {
      if (challenge.userId === userId) {
        userChallenges.push(challenge);
      }
    }
    
    return userChallenges;
  }

  async createChallenge(challenge: Omit<Challenge, 'id'>): Promise<Challenge> {
    const id = this.currentChallengeId++;
    const newChallenge: Challenge = { ...challenge, id };
    
    this.challenges.set(id, newChallenge);
    this.saveState();
    
    return newChallenge;
  }

  // Leaderboard methods
  async getTopUsers(limit: number): Promise<UserWithoutPassword[]> {
    const allUsers = Array.from(this.users.values());
    
    const sortedUsers = allUsers
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
    
    return sortedUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

// Create and export a singleton instance
export const storage = new LocalStorage();