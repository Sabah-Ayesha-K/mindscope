import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';
import ResultsDisplay from '@/components/assessment/ResultsDisplay';
import { mbtiQuestions, calculateMBTIScore } from '@/lib/assessments/mbti';
import { useToast } from '@/hooks/use-toast';

const MBTIAssessment = () => {
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = async (answers: Record<string, number>) => {
    try {
      const assessmentResult = calculateMBTIScore(answers);
      setResult(assessmentResult);

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .insert([{
            user_id: session.user.id,
            assessment_type: 'mbti',
            score: 0,
            result_data: JSON.parse(JSON.stringify({
              answers,
              ...assessmentResult
            }))
          }])
          .select()
          .single();

        if (assessmentError) throw assessmentError;

      }

      setShowResults(true);
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: 'Error',
        description: 'Failed to save assessment results. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (showResults && result) {
  return (
    <ResultsDisplay
      title="MBTI Personality Assessment"
      result={result}
      hideScore   
    />
  );
}
if (showResults && result) {
    return <ResultsDisplay title="MBTI Personality Assessment" result={result} />;
  }

  return (
    <AssessmentFlow
      title="Myers-Briggs Type Indicator (MBTI)"
      description="Discover your personality type based on four key dimensions"
      questions={mbtiQuestions}
      onComplete={handleComplete}
    />
  );
};

export default MBTIAssessment;
