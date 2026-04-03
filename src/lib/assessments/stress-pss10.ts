import { Question, AssessmentResult, Recommendation } from './types';

export const pss10Questions: Question[] = [
  {
    id: 'pss1',
    text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Fairly Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'pss2',
    text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Fairly Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'pss3',
    text: 'In the last month, how often have you felt nervous and stressed?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Fairly Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'pss4',
    text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
    options: [
      { value: 4, label: 'Never' },
      { value: 3, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 1, label: 'Fairly Often' },
      { value: 0, label: 'Very Often' }
    ]
  },
  {
    id: 'pss5',
    text: 'In the last month, how often have you felt that things were going your way?',
    options: [
      { value: 4, label: 'Never' },
      { value: 3, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 1, label: 'Fairly Often' },
      { value: 0, label: 'Very Often' }
    ]
  },
  {
    id: 'pss6',
    text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Fairly Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'pss7',
    text: 'In the last month, how often have you been able to control irritations in your life?',
    options: [
      { value: 4, label: 'Never' },
      { value: 3, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 1, label: 'Fairly Often' },
      { value: 0, label: 'Very Often' }
    ]
  },
  {
    id: 'pss8',
    text: 'In the last month, how often have you felt that you were on top of things?',
    options: [
      { value: 4, label: 'Never' },
      { value: 3, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 1, label: 'Fairly Often' },
      { value: 0, label: 'Very Often' }
    ]
  },
  {
    id: 'pss9',
    text: 'In the last month, how often have you been angered because of things that were outside of your control?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Fairly Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'pss10',
    text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Almost Never' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Fairly Often' },
      { value: 4, label: 'Very Often' }
    ]
  }
];

export function calculatePSS10Score(answers: Record<string, number>): AssessmentResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  let severity: string;
  let interpretation: string;
  
  if (score <= 13) {
    severity = 'Low';
    interpretation = 'Your stress levels are considered low. You\'re managing stress well and have good coping mechanisms in place.';
  } else if (score <= 26) {
    severity = 'Moderate';
    interpretation = 'Your stress levels are moderate. Consider implementing stress-reduction techniques and self-care practices to maintain balance.';
  } else {
    severity = 'High';
    interpretation = 'Your stress levels are high. It\'s important to prioritize stress management and consider seeking professional support to develop coping strategies.';
  }
  
  const recommendations: Recommendation[] = [
    {
      type: 'video',
      title: 'Stress Management Techniques',
      description: 'Learn effective methods to manage daily stress',
      url: 'https://www.youtube.com/watch?v=6p_yaNFSYao'
    },
    {
      type: 'article',
      title: 'Understanding Stress and Its Effects',
      description: 'Comprehensive guide to stress and health',
      url: 'https://www.apa.org/topics/stress'
    },
    {
      type: 'app',
      title: 'Headspace - Meditation & Sleep',
      description: 'Guided meditation and mindfulness app',
      url: 'https://www.headspace.com'
    }
  ];
  
  if (severity === 'High') {
    recommendations.push({
      type: 'professional',
      title: 'Consider Professional Support',
      description: 'A mental health professional can provide personalized strategies for stress management',
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
