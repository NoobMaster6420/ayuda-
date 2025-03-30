// User type definition
export interface User {
  id: number;
  username: string;
  points: number;
  lives: number;
}

// Progress tracking
export interface UserProgress {
  userId: number;
  points: number;
  lives: number;
  completedChallenges: number[];
  completedQuizzes: number[];
  level: number;
}

// Quiz related types
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

export interface Quiz {
  id: number;
  userId: number;
  score: number;
  questions: QuizQuestion[];
  timestamp: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Challenge related types
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

export interface Challenge {
  id: number;
  userId: number;
  completed: boolean;
  score: number;
  questions: ChallengeQuestion[];
  timestamp: string;
}