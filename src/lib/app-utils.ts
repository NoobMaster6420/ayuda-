import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Math question types
export interface MathQuestion {
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

// Helper function to get random integer between min and max (inclusive)
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a basic math problem
export function generateBasicMathProblem(): MathQuestion {
  const operations = ['+', '-', '*', '/'];
  const operation = operations[getRandomInt(0, 3)];
  
  let a: number, b: number, result: number, question: string, formula: string;
  
  switch (operation) {
    case '+':
      a = getRandomInt(1, 100);
      b = getRandomInt(1, 100);
      result = a + b;
      question = `¿Cuál es el resultado de ${a} + ${b}?`;
      formula = `${a} + ${b}`;
      break;
    case '-':
      a = getRandomInt(50, 100);
      b = getRandomInt(1, 49);
      result = a - b;
      question = `¿Cuál es el resultado de ${a} - ${b}?`;
      formula = `${a} - ${b}`;
      break;
    case '*':
      a = getRandomInt(1, 20);
      b = getRandomInt(1, 20);
      result = a * b;
      question = `¿Cuál es el resultado de ${a} × ${b}?`;
      formula = `${a} \\times ${b}`;
      break;
    case '/':
      b = getRandomInt(1, 20);
      result = getRandomInt(1, 10);
      a = b * result;
      question = `¿Cuál es el resultado de ${a} ÷ ${b}?`;
      formula = `\\frac{${a}}{${b}}`;
      break;
    default:
      a = getRandomInt(1, 100);
      b = getRandomInt(1, 100);
      result = a + b;
      question = `¿Cuál es el resultado de ${a} + ${b}?`;
      formula = `${a} + ${b}`;
  }
  
  // Generate wrong options that are close to the correct result
  const wrongOptions = [
    { id: 'b', formula: `${result + getRandomInt(1, 5)}` },
    { id: 'c', formula: `${result - getRandomInt(1, 5)}` },
    { id: 'd', formula: `${result + getRandomInt(6, 10)}` },
  ];
  
  const correctOption = { id: 'a', formula: `${result}` };
  const allOptions = [correctOption, ...wrongOptions];
  
  // Shuffle the options
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }
  
  const correctId = allOptions.find(opt => opt.formula === `${result}`)?.id || 'a';
  
  return {
    id: getRandomInt(1, 1000),
    question,
    formula,
    options: allOptions,
    correctOptionId: correctId,
    explanation: `La respuesta correcta es ${result} porque ${formula} = ${result}`,
    difficulty: 'easy'
  };
}

// Generate a probability problem
export function generateProbabilityProblem(): MathQuestion {
  const problemTypes = [
    'dice',
    'cards',
    'marbles'
  ];
  
  const type = problemTypes[getRandomInt(0, problemTypes.length - 1)];
  let question: string, formula: string, result: number, explanation: string;
  
  switch (type) {
    case 'dice':
      const diceNum = getRandomInt(1, 6);
      question = `¿Cuál es la probabilidad de obtener un ${diceNum} al lanzar un dado de 6 caras?`;
      formula = `P(${diceNum}) = \\frac{1}{6}`;
      result = 1/6;
      explanation = `La probabilidad es 1/6 porque hay 1 caso favorable (obtener ${diceNum}) de 6 casos posibles.`;
      break;
      
    case 'cards':
      question = "¿Cuál es la probabilidad de sacar una carta de corazones de una baraja estándar de 52 cartas?";
      formula = `P(\\text{corazones}) = \\frac{13}{52} = \\frac{1}{4}`;
      result = 1/4;
      explanation = "La probabilidad es 1/4 porque hay 13 cartas de corazones en una baraja de 52 cartas.";
      break;
      
    case 'marbles':
      const redMarbles = getRandomInt(2, 10);
      const blueMarbles = getRandomInt(2, 10);
      const totalMarbles = redMarbles + blueMarbles;
      question = `En una bolsa hay ${redMarbles} canicas rojas y ${blueMarbles} canicas azules. ¿Cuál es la probabilidad de sacar una canica roja?`;
      formula = `P(\\text{roja}) = \\frac{${redMarbles}}{${totalMarbles}}`;
      result = redMarbles / totalMarbles;
      explanation = `La probabilidad es ${redMarbles}/${totalMarbles} porque hay ${redMarbles} canicas rojas de un total de ${totalMarbles} canicas.`;
      break;
      
    default:
      question = "¿Cuál es la probabilidad de obtener cara al lanzar una moneda justa?";
      formula = `P(\\text{cara}) = \\frac{1}{2}`;
      result = 1/2;
      explanation = "La probabilidad es 1/2 porque hay 1 caso favorable (cara) de 2 casos posibles (cara o cruz).";
  }
  
  // Generate options with one correct and three incorrect
  const resultStr = result === 1/6 ? "\\frac{1}{6}" : 
                   result === 1/4 ? "\\frac{1}{4}" : 
                   result === 1/2 ? "\\frac{1}{2}" : 
                   `\\frac{${Math.round(result * 100)}}{100}`;
  
  // Generate wrong options
  const wrongOptions = [
    { id: 'b', formula: result === 1/6 ? "\\frac{1}{5}" : "\\frac{1}{6}" },
    { id: 'c', formula: result === 1/4 ? "\\frac{1}{3}" : "\\frac{1}{4}" },
    { id: 'd', formula: result === 1/2 ? "\\frac{1}{3}" : "\\frac{1}{2}" },
  ];
  
  const correctOption = { id: 'a', formula: resultStr };
  const allOptions = [correctOption, ...wrongOptions];
  
  // Shuffle the options
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }
  
  const correctId = allOptions.find(opt => opt.formula === resultStr)?.id || 'a';
  
  return {
    id: getRandomInt(1001, 2000),
    question,
    formula,
    options: allOptions,
    correctOptionId: correctId,
    explanation,
    difficulty: 'medium'
  };
}

// Generate a derivative problem
export function generateSimpleDerivativeProblem(): MathQuestion {
  const problemTypes = [
    'power',
    'exponential',
    'trigonometric'
  ];
  
  const type = problemTypes[getRandomInt(0, problemTypes.length - 1)];
  let question: string, formula: string, resultStr: string, explanation: string;
  let powerValue = 2; // Default value for power
  
  switch (type) {
    case 'power':
      powerValue = getRandomInt(2, 5);
      question = `¿Cuál es la derivada de la función f(x) = x^${powerValue}?`;
      formula = `f(x) = x^${powerValue}`;
      resultStr = `${powerValue}x^${powerValue-1}`;
      explanation = `La derivada de x^${powerValue} es ${powerValue}x^${powerValue-1} aplicando la regla de la potencia: d/dx(x^n) = n·x^(n-1).`;
      break;
      
    case 'exponential':
      question = "¿Cuál es la derivada de la función f(x) = e^x?";
      formula = "f(x) = e^x";
      resultStr = "e^x";
      explanation = "La derivada de e^x es e^x porque es la única función que es igual a su derivada.";
      break;
      
    case 'trigonometric':
      question = "¿Cuál es la derivada de la función f(x) = sen(x)?";
      formula = "f(x) = \\sin(x)";
      resultStr = "\\cos(x)";
      explanation = "La derivada de sen(x) es cos(x) según la regla de derivación de funciones trigonométricas.";
      break;
      
    default:
      question = "¿Cuál es la derivada de la función f(x) = x^2?";
      formula = "f(x) = x^2";
      resultStr = "2x";
      explanation = "La derivada de x^2 es 2x aplicando la regla de la potencia: d/dx(x^n) = n·x^(n-1).";
  }
  
  // Generate LaTeX for result
  const resultLatex = type === 'power' ? `${powerValue}x^{${powerValue-1}}` : 
                      type === 'exponential' ? "e^x" : 
                      type === 'trigonometric' ? "\\cos(x)" : 
                      "2x";
  
  // Generate wrong options
  const wrongOptions = [
    { id: 'b', formula: type === 'power' ? `${powerValue-1}x^${powerValue}` : "x·e^x" },
    { id: 'c', formula: type === 'exponential' ? "x·e^x" : "\\tan(x)" },
    { id: 'd', formula: type === 'trigonometric' ? "-\\sin(x)" : "x^2" },
  ];
  
  const correctOption = { id: 'a', formula: resultLatex };
  const allOptions = [correctOption, ...wrongOptions];
  
  // Shuffle the options
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }
  
  const correctId = allOptions.find(opt => opt.formula === resultLatex)?.id || 'a';
  
  return {
    id: getRandomInt(2001, 3000),
    question,
    formula,
    options: allOptions,
    correctOptionId: correctId,
    explanation,
    difficulty: 'hard'
  };
}

// Generate math questions based on difficulty level
export function generateMathQuestion(level: number): MathQuestion {
  switch (level) {
    case 1:
      return generateBasicMathProblem();
    case 2:
      return generateProbabilityProblem();
    case 3:
      return generateSimpleDerivativeProblem();
    default:
      return generateBasicMathProblem();
  }
}