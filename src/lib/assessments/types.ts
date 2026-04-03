export type AssessmentType = 'mbti' | 'eq' | 'stress' | 'sleep' | 'depression' | 'anxiety';

export interface Question {
  id: string;
  text: string;
  options: Option[];
  category?: string;
}

export interface Option {
  value: number;
  label: string;
}

export interface AssessmentResult {
  score: number;
  severity?: string;
  interpretation: string;
  details?: any;
}

