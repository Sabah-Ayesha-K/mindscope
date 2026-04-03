import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';
import ResultsDisplay from '@/components/assessment/ResultsDisplay';
import { pss10Questions, calculatePSS10Score } from '@/lib/assessments/stress-pss10';
import { useToast } from '@/hooks/use-toast';

const StressAssessment = () => {
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = async (answers: Record<string, number>) => {
    try {
      const assessmentResult = calculatePSS10Score(answers);
      setResult(assessmentResult);

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .insert([{
            user_id: session.user.id,
            assessment_type: 'stress',
            score: assessmentResult.score,
            severity_level: assessmentResult.severity,
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
    return <ResultsDisplay title="Stress Assessment (PSS-10)" result={result} />;
  }

  return (
    <AssessmentFlow
      title="Perceived Stress Scale (PSS-10)"
      description="This questionnaire asks about your feelings and thoughts during the last month."
      questions={pss10Questions}
      onComplete={handleComplete}
    />
  );
};

export default StressAssessment;
