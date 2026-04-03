import { Question, AssessmentResult } from './types';

export const eqQuestions: Question[] = [
  {
    id: 'eq1',
    text: 'I am aware of my emotions as I experience them',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq2',
    text: 'I can easily understand the emotions of others',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq3',
    text: 'I can control my emotions when needed',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq4',
    text: 'I am motivated to achieve my goals despite obstacles',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq5',
    text: 'I handle interpersonal relationships with ease',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq6',
    text: 'I can recognize when someone is upset, even if they try to hide it',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq7',
    text: 'I stay calm under pressure',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq8',
    text: 'I can motivate myself to keep going when things get tough',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq9',
    text: 'I handle conflicts effectively',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq10',
    text: 'I understand what makes me feel certain emotions',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq11',
    text: 'I am good at reading body language and facial expressions',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq12',
    text: 'I bounce back quickly from setbacks',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq13',
    text: 'I delay gratification to achieve long-term goals',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq14',
    text: 'I can influence others positively',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  },
  {
    id: 'eq15',
    text: 'I am comfortable expressing my emotions appropriately',
    options: [
      { value: 1, label: 'Strongly Disagree' },
      { value: 2, label: 'Disagree' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Agree' },
      { value: 5, label: 'Strongly Agree' }
    ]
  }
];

export function calculateEQScore(answers: Record<string, number>): AssessmentResult {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = eqQuestions.length * 5;
  const eqScore = Math.round((totalScore / maxScore) * 100);
  
  let severity: string;
  let interpretation: string;
  
  if (eqScore >= 80) {
    severity = 'Very High';
    interpretation = 'You have exceptional emotional intelligence. You excel at understanding and managing emotions, both your own and others\'. You likely have strong interpersonal relationships and handle social situations with ease.';
  } else if (eqScore >= 65) {
    severity = 'High';
    interpretation = 'You have high emotional intelligence. You are generally good at recognizing and managing emotions, and you handle most social situations well.';
  } else if (eqScore >= 50) {
    severity = 'Average';
    interpretation = 'Your emotional intelligence is in the average range. You have a moderate ability to understand and manage emotions. There\'s room for improvement in certain areas.';
  } else if (eqScore >= 35) {
    severity = 'Low';
    interpretation = 'Your emotional intelligence could benefit from development. Focus on becoming more aware of your emotions and those of others, and practice emotional regulation.';
  } else {
    severity = 'Very Low';
    interpretation = 'You may struggle with emotional awareness and management. Consider working on developing these skills through practice and possibly professional guidance.';
  }
  
  
  return {
    score: eqScore,
    severity,
    interpretation,
    details: {
      totalScore,
      maxScore
    }
  };
}
