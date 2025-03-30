import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryClient } from "@tanstack/react-query";

// Utility function for merging Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a query client for React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

// Math question type definition
export type MathQuestion = {
  id: number;
  question: string;
  formula: string;
  options: {
    id: string;
    formula: string;
  }[];
  correctOptionId: string;
  explanation: string;
  difficulty: string;
};

// Random integer generator
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate basic math problem (addition, subtraction, multiplication)
export function generateBasicMathProblem(): MathQuestion {
  const operations = ['+', '-', '*'];
  const operation = operations[getRandomInt(0, 2)];
  
  let a = getRandomInt(1, 20);
  let b = getRandomInt(1, 10);
  
  let question = '';
  let formula = '';
  let correctAnswer = 0;
  
  switch (operation) {
    case '+':
      question = `What is ${a} + ${b}?`;
      formula = `${a} + ${b}`;
      correctAnswer = a + b;
      break;
    case '-':
      // Ensure a > b for subtraction
      if (a < b) [a, b] = [b, a];
      question = `What is ${a} - ${b}?`;
      formula = `${a} - ${b}`;
      correctAnswer = a - b;
      break;
    case '*':
      question = `What is ${a} × ${b}?`;
      formula = `${a} \\times ${b}`;
      correctAnswer = a * b;
      break;
  }
  
  // Generate options (including the correct one)
  const options = [];
  const correctOptionId = `option_${getRandomInt(0, 3)}`;
  
  for (let i = 0; i < 4; i++) {
    const optionId = `option_${i}`;
    if (optionId === correctOptionId) {
      options.push({
        id: optionId,
        formula: `${correctAnswer}`
      });
    } else {
      // Generate a wrong answer that's close to the correct one
      let wrongAnswer = correctAnswer;
      while (wrongAnswer === correctAnswer) {
        wrongAnswer = correctAnswer + getRandomInt(-5, 5);
      }
      options.push({
        id: optionId,
        formula: `${wrongAnswer}`
      });
    }
  }
  
  return {
    id: getRandomInt(1000, 9999),
    question,
    formula,
    options,
    correctOptionId,
    explanation: `To solve ${formula}, you need to ${operation === '+' ? 'add' : operation === '-' ? 'subtract' : 'multiply'} the numbers. The answer is ${correctAnswer}.`,
    difficulty: 'easy',
  };
}

// Generate probability problem
export function generateProbabilityProblem(): MathQuestion {
  const scenarios = [
    {
      items: { type: 'cards', total: 52, specific: { name: 'hearts', count: 13 } },
      question: 'deck of cards',
      formula: '\\frac{13}{52} = \\frac{1}{4}'
    },
    {
      items: { type: 'dice', total: 6, specific: { name: 'even numbers', count: 3 } },
      question: 'die',
      formula: '\\frac{3}{6} = \\frac{1}{2}'
    },
    {
      items: { type: 'balls', total: 10, specific: { name: 'red balls', count: 4 } },
      question: 'bag with 10 balls (4 red, 6 blue)',
      formula: '\\frac{4}{10} = \\frac{2}{5}'
    }
  ];
  
  const scenario = scenarios[getRandomInt(0, scenarios.length - 1)];
  
  // Probability fraction in simplified form
  const numerator = scenario.items.specific.count;
  const denominator = scenario.items.total;
  
  const question = `What is the probability of drawing a ${scenario.items.specific.name} from a ${scenario.question}?`;
  
  // Generate options
  const options = [];
  const correctOptionId = `option_${getRandomInt(0, 3)}`;
  
  for (let i = 0; i < 4; i++) {
    const optionId = `option_${i}`;
    if (optionId === correctOptionId) {
      options.push({
        id: optionId,
        formula: scenario.formula
      });
    } else {
      // Generate a wrong probability
      let wrongNumerator = numerator;
      let wrongDenominator = denominator;
      
      // Ensure we don't generate the correct answer
      while (wrongNumerator === numerator && wrongDenominator === denominator) {
        wrongNumerator = getRandomInt(1, denominator);
        wrongDenominator = getRandomInt(wrongNumerator, denominator + 5);
      }
      
      options.push({
        id: optionId,
        formula: `\\frac{${wrongNumerator}}{${wrongDenominator}}`
      });
    }
  }
  
  return {
    id: getRandomInt(1000, 9999),
    question,
    formula: `P(${scenario.items.specific.name}) = \\frac{${numerator}}{${denominator}}`,
    options,
    correctOptionId,
    explanation: `The probability is calculated by dividing the number of favorable outcomes (${numerator}) by the total number of possible outcomes (${denominator}). Therefore, P(${scenario.items.specific.name}) = ${scenario.formula}.`,
    difficulty: 'medium',
  };
}

// Generate simple derivative problem
export function generateSimpleDerivativeProblem(): MathQuestion {
  const problems = [
    {
      function: 'x^2',
      derivative: '2x',
      variable: 'x',
      explanation: 'The derivative of x^n is n*x^(n-1)'
    },
    {
      function: 'x^3',
      derivative: '3x^2',
      variable: 'x',
      explanation: 'The derivative of x^n is n*x^(n-1)'
    },
    {
      function: '\\sin(x)',
      derivative: '\\cos(x)',
      variable: 'x',
      explanation: 'The derivative of sin(x) is cos(x)'
    },
    {
      function: '\\cos(x)',
      derivative: '-\\sin(x)',
      variable: 'x',
      explanation: 'The derivative of cos(x) is -sin(x)'
    },
    {
      function: 'e^x',
      derivative: 'e^x',
      variable: 'x',
      explanation: 'The derivative of e^x is e^x'
    },
    {
      function: '\\ln(x)',
      derivative: '\\frac{1}{x}',
      variable: 'x',
      explanation: 'The derivative of ln(x) is 1/x'
    }
  ];
  
  const problem = problems[getRandomInt(0, problems.length - 1)];
  
  const question = `What is the derivative of ${problem.function} with respect to ${problem.variable}?`;
  
  // Generate options
  const options = [];
  const correctOptionId = `option_${getRandomInt(0, 3)}`;
  
  const wrongDerivatives = problems
    .filter(p => p.derivative !== problem.derivative)
    .map(p => p.derivative);
  
  for (let i = 0; i < 4; i++) {
    const optionId = `option_${i}`;
    if (optionId === correctOptionId) {
      options.push({
        id: optionId,
        formula: problem.derivative
      });
    } else {
      // Select a wrong derivative from other problems
      const wrongIndex = getRandomInt(0, wrongDerivatives.length - 1);
      const wrongDerivative = wrongDerivatives[wrongIndex];
      
      // Remove the selected wrong derivative to avoid duplicates
      wrongDerivatives.splice(wrongIndex, 1);
      
      options.push({
        id: optionId,
        formula: wrongDerivative
      });
    }
  }
  
  return {
    id: getRandomInt(1000, 9999),
    question,
    formula: `\\frac{d}{d${problem.variable}}\\left(${problem.function}\\right)`,
    options,
    correctOptionId,
    explanation: `The derivative of ${problem.function} with respect to ${problem.variable} is ${problem.derivative}. ${problem.explanation}.`,
    difficulty: 'hard',
  };
}

// Function to generate a math question based on level
export function generateMathQuestion(level: number): MathQuestion {
  if (level <= 3) {
    return generateBasicMathProblem();
  } else if (level <= 7) {
    return generateProbabilityProblem();
  } else {
    return generateSimpleDerivativeProblem();
  }
}