import { Question, AssessmentResult, Recommendation } from './types';

export const gad7Questions: Question[] = [
  {
    id: 'gad1',
    text: 'Feeling nervous, anxious, or on edge',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad2',
    text: 'Not being able to stop or control worrying',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad3',
    text: 'Worrying too much about different things',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad4',
    text: 'Trouble relaxing',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad5',
    text: 'Being so restless that it\'s hard to sit still',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad6',
    text: 'Becoming easily annoyed or irritable',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'gad7',
    text: 'Feeling afraid as if something awful might happen',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  }
];

export function calculateGAD7Score(answers: Record<string, number>): AssessmentResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  let severity: string;
  let interpretation: string;
  
  if (score <= 4) {
    severity = 'Minimal';
    interpretation = 'Your anxiety levels are minimal. Continue with healthy coping strategies and self-care practices.';
  } else if (score <= 9) {
    severity = 'Mild';
    interpretation = 'You\'re experiencing mild anxiety. Consider relaxation techniques and mindfulness practices to manage symptoms.';
  } else if (score <= 14) {
    severity = 'Moderate';
    interpretation = 'You\'re experiencing moderate anxiety. It may be beneficial to speak with a healthcare provider about management strategies.';
  } else {
    severity = 'Severe';
    interpretation = 'You\'re experiencing severe anxiety. We strongly recommend consulting with a mental health professional for proper evaluation and treatment.';
  }
  
  const recommendations: Recommendation[] = [
    {
      type: 'video',
      title: 'Anxiety Management Techniques',
      description: 'Learn practical strategies to manage anxiety',
      url: 'https://www.youtube.com/watch?v=WWloIAQpMcQ'
    },
    {
      type: 'article',
      title: 'Understanding Anxiety Disorders',
      description: 'Comprehensive guide to anxiety and treatment',
      url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders'
    },
    {
      type: 'app',
      title: 'Calm - Meditation and Sleep',
      description: 'Guided meditations for anxiety relief',
      url: 'https://www.calm.com'
    }
  ];
  
  if (severity === 'Severe' || severity === 'Moderate') {
    recommendations.push({
      type: 'professional',
      title: 'Professional Support Recommended',
      description: 'A mental health professional can help develop personalized coping strategies',
      url: 'https://www.samhsa.gov/find-help/national-helpline'
    });
  }
  
  return {
    score,
    severity,
    interpretation,
    recommendations
  };
}
