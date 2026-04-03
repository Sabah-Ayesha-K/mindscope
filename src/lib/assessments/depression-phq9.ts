import { Question, AssessmentResult, Recommendation } from './types';

export const phq9Questions: Question[] = [
  {
    id: 'phq1',
    text: 'Little interest or pleasure in doing things',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq2',
    text: 'Feeling down, depressed, or hopeless',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq3',
    text: 'Trouble falling or staying asleep, or sleeping too much',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq4',
    text: 'Feeling tired or having little energy',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq5',
    text: 'Poor appetite or overeating',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq6',
    text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq7',
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq8',
    text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  },
  {
    id: 'phq9',
    text: 'Thoughts that you would be better off dead, or of hurting yourself',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ]
  }
];

export function calculatePHQ9Score(answers: Record<string, number>): AssessmentResult {
  const score = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const hasQ9Concern = (answers['phq9'] || 0) > 0;
  
  let severity: string;
  let interpretation: string;
  
  if (score <= 4) {
    severity = 'Minimal';
    interpretation = 'Your responses suggest minimal depression symptoms. Continue maintaining healthy habits and self-care practices.';
  } else if (score <= 9) {
    severity = 'Mild';
    interpretation = 'Your responses suggest mild depression symptoms. Consider incorporating stress-reduction techniques and monitoring your mood.';
  } else if (score <= 14) {
    severity = 'Moderate';
    interpretation = 'Your responses suggest moderate depression symptoms. It may be helpful to speak with a healthcare provider about your feelings.';
  } else if (score <= 19) {
    severity = 'Moderately Severe';
    interpretation = 'Your responses suggest moderately severe depression symptoms. We recommend consulting with a mental health professional for proper evaluation and support.';
  } else {
    severity = 'Severe';
    interpretation = 'Your responses suggest severe depression symptoms. Please reach out to a mental health professional or crisis service for immediate support.';
  }
  
  const recommendations: Recommendation[] = [
    {
      type: 'article',
      title: 'Understanding Depression',
      description: 'Learn about depression symptoms and treatment options',
      url: 'https://www.nimh.nih.gov/health/topics/depression'
    },
    {
      type: 'app',
      title: 'Moodpath',
      description: 'Daily mental health check-ins and progress tracking',
      url: 'https://www.moodpath.com'
    },
    {
      type: 'professional',
      title: 'Seek Professional Help',
      description: 'A mental health professional can provide proper diagnosis and treatment',
      url: 'https://www.samhsa.gov/find-help/national-helpline'
    }
  ];
  
  return {
    score,
    severity,
    interpretation,
    recommendations,
    details: { hasQ9Concern }
  };
}
