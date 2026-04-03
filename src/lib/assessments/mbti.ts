import { Question, AssessmentResult } from './types';

export const mbtiQuestions: Question[] = [
  // E vs I (Extraversion vs Introversion)
  {
    id: 'mbti1',
    text: 'At a party, do you interact with many people or prefer to have in-depth conversations with a few?',
    category: 'EI',
    options: [
      { value: 1, label: 'Interact with many people' },
      { value: -1, label: 'In-depth with a few' }
    ]
  },
  {
    id: 'mbti2',
    text: 'After a long day, do you feel energized by being around others or prefer alone time to recharge?',
    category: 'EI',
    options: [
      { value: 1, label: 'Energized by others' },
      { value: -1, label: 'Need alone time' }
    ]
  },
  {
    id: 'mbti3',
    text: 'Do you tend to think out loud or reflect internally before speaking?',
    category: 'EI',
    options: [
      { value: 1, label: 'Think out loud' },
      { value: -1, label: 'Reflect internally' }
    ]
  },
  {
    id: 'mbti4',
    text: 'Are you more comfortable being the center of attention or observing from the sidelines?',
    category: 'EI',
    options: [
      { value: 1, label: 'Center of attention' },
      { value: -1, label: 'Observing' }
    ]
  },
  {
    id: 'mbti5',
    text: 'Do you prefer a wide circle of friends or a small group of close friends?',
    category: 'EI',
    options: [
      { value: 1, label: 'Wide circle' },
      { value: -1, label: 'Small close group' }
    ]
  },
  // S vs N (Sensing vs Intuition)
  {
    id: 'mbti6',
    text: 'Do you focus more on concrete facts and details or abstract concepts and possibilities?',
    category: 'SN',
    options: [
      { value: 1, label: 'Facts and details' },
      { value: -1, label: 'Concepts and possibilities' }
    ]
  },
  {
    id: 'mbti7',
    text: 'Do you prefer practical, proven methods or innovative, experimental approaches?',
    category: 'SN',
    options: [
      { value: 1, label: 'Practical methods' },
      { value: -1, label: 'Innovative approaches' }
    ]
  },
  {
    id: 'mbti8',
    text: 'Are you more interested in what is or what could be?',
    category: 'SN',
    options: [
      { value: 1, label: 'What is' },
      { value: -1, label: 'What could be' }
    ]
  },
  {
    id: 'mbti9',
    text: 'Do you prefer step-by-step instructions or figuring things out your own way?',
    category: 'SN',
    options: [
      { value: 1, label: 'Step-by-step' },
      { value: -1, label: 'My own way' }
    ]
  },
  {
    id: 'mbti10',
    text: 'Do you trust experience more than theory?',
    category: 'SN',
    options: [
      { value: 1, label: 'Experience' },
      { value: -1, label: 'Theory' }
    ]
  },
  // T vs F (Thinking vs Feeling)
  {
    id: 'mbti11',
    text: 'When making decisions, do you prioritize logic and objective analysis or personal values and impact on people?',
    category: 'TF',
    options: [
      { value: 1, label: 'Logic and analysis' },
      { value: -1, label: 'Values and people' }
    ]
  },
  {
    id: 'mbti12',
    text: 'Would you rather be right or be liked?',
    category: 'TF',
    options: [
      { value: 1, label: 'Be right' },
      { value: -1, label: 'Be liked' }
    ]
  },
  {
    id: 'mbti13',
    text: 'In conflicts, do you focus on finding the fairest solution or maintaining harmony?',
    category: 'TF',
    options: [
      { value: 1, label: 'Fairest solution' },
      { value: -1, label: 'Maintaining harmony' }
    ]
  },
  {
    id: 'mbti14',
    text: 'Are you more moved by facts or emotions?',
    category: 'TF',
    options: [
      { value: 1, label: 'Facts' },
      { value: -1, label: 'Emotions' }
    ]
  },
  {
    id: 'mbti15',
    text: 'Do you value truth more than tact?',
    category: 'TF',
    options: [
      { value: 1, label: 'Truth' },
      { value: -1, label: 'Tact' }
    ]
  },
  // J vs P (Judging vs Perceiving)
  {
    id: 'mbti16',
    text: 'Do you prefer to have things decided and planned or keep your options open?',
    category: 'JP',
    options: [
      { value: 1, label: 'Decided and planned' },
      { value: -1, label: 'Keep options open' }
    ]
  },
  {
    id: 'mbti17',
    text: 'Are you more comfortable with structure and schedules or flexibility and spontaneity?',
    category: 'JP',
    options: [
      { value: 1, label: 'Structure and schedules' },
      { value: -1, label: 'Flexibility' }
    ]
  },
  {
    id: 'mbti18',
    text: 'Do you prefer to finish projects well before deadlines or work close to deadlines?',
    category: 'JP',
    options: [
      { value: 1, label: 'Well before deadlines' },
      { value: -1, label: 'Close to deadlines' }
    ]
  },
  {
    id: 'mbti19',
    text: 'Are you more focused on completing tasks or exploring possibilities?',
    category: 'JP',
    options: [
      { value: 1, label: 'Completing tasks' },
      { value: -1, label: 'Exploring possibilities' }
    ]
  },
  {
    id: 'mbti20',
    text: 'Do you prefer organized, predictable environments or adaptable, spontaneous ones?',
    category: 'JP',
    options: [
      { value: 1, label: 'Organized' },
      { value: -1, label: 'Adaptable' }
    ]
  }
];

const typeDescriptions: Record<string, { name: string; description: string; strengths: string[] }> = {
  'INTJ': {
    name: 'The Architect',
    description: 'Strategic thinkers with a plan for everything.',
    strengths: ['Strategic thinking', 'Independence', 'Determination', 'Innovation']
  },
  'INTP': {
    name: 'The Logician',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    strengths: ['Analytical', 'Original', 'Open-minded', 'Objective']
  },
  'ENTJ': {
    name: 'The Commander',
    description: 'Bold, imaginative, and strong-willed leaders.',
    strengths: ['Leadership', 'Strategic planning', 'Efficiency', 'Confidence']
  },
  'ENTP': {
    name: 'The Debater',
    description: 'Smart and curious thinkers who love intellectual challenges.',
    strengths: ['Quick thinking', 'Charismatic', 'Energetic', 'Creative']
  },
  'INFJ': {
    name: 'The Advocate',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    strengths: ['Insightful', 'Principled', 'Passionate', 'Creative']
  },
  'INFP': {
    name: 'The Mediator',
    description: 'Poetic, kind, and altruistic people.',
    strengths: ['Idealistic', 'Open-minded', 'Flexible', 'Creative']
  },
  'ENFJ': {
    name: 'The Protagonist',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    strengths: ['Charismatic', 'Altruistic', 'Natural leaders', 'Reliable']
  },
  'ENFP': {
    name: 'The Campaigner',
    description: 'Enthusiastic, creative, and sociable free spirits.',
    strengths: ['Curious', 'Observant', 'Energetic', 'Enthusiastic']
  },
  'ISTJ': {
    name: 'The Logistician',
    description: 'Practical and fact-minded individuals.',
    strengths: ['Honest', 'Direct', 'Strong-willed', 'Dutiful']
  },
  'ISFJ': {
    name: 'The Defender',
    description: 'Dedicated and warm protectors.',
    strengths: ['Supportive', 'Reliable', 'Patient', 'Observant']
  },
  'ESTJ': {
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things.',
    strengths: ['Dedicated', 'Strong-willed', 'Direct', 'Honest']
  },
  'ESFJ': {
    name: 'The Consul',
    description: 'Extraordinarily caring, social, and popular people.',
    strengths: ['Strong practical skills', 'Loyal', 'Sensitive', 'Warm']
  },
  'ISTP': {
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters.',
    strengths: ['Optimistic', 'Creative', 'Practical', 'Spontaneous']
  },
  'ISFP': {
    name: 'The Adventurer',
    description: 'Flexible and charming artists.',
    strengths: ['Charming', 'Sensitive', 'Imaginative', 'Passionate']
  },
  'ESTP': {
    name: 'The Entrepreneur',
    description: 'Smart, energetic, and perceptive people who truly enjoy living on the edge.',
    strengths: ['Bold', 'Rational', 'Direct', 'Sociable']
  },
  'ESFP': {
    name: 'The Entertainer',
    description: 'Spontaneous, energetic, and enthusiastic people.',
    strengths: ['Bold', 'Original', 'Practical', 'Observant']
  }
};

export function calculateMBTIScore(answers: Record<string, number>): AssessmentResult {
  const scores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  };

  mbtiQuestions.forEach(q => {
    if (answers[q.id] !== undefined && q.category) {
      scores[q.category as keyof typeof scores] += answers[q.id];
    }
  });

  const type = 
    (scores.EI > 0 ? 'E' : 'I') +
    (scores.SN > 0 ? 'S' : 'N') +
    (scores.TF > 0 ? 'T' : 'F') +
    (scores.JP > 0 ? 'J' : 'P');

  const typeInfo = typeDescriptions[type];

  const interpretation = `You are an ${type} - ${typeInfo.name}. ${typeInfo.description}`;


  return {
    score:0,
    interpretation,
    details: {
      type,
      name: typeInfo.name,
      description: typeInfo.description,
      strengths: typeInfo.strengths,
      scores
    }
  };
}
