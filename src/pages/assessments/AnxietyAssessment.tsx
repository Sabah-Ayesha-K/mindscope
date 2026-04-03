import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';
import ResultsDisplay from '@/components/assessment/ResultsDisplay';
import { gad7Questions, calculateGAD7Score } from '@/lib/assessments/anxiety-gad7';
import { useToast } from '@/hooks/use-toast';

const AnxietyAssessment = () => {
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = async (answers: Record<string, number>) => {
    try {
      const assessmentResult = calculateGAD7Score(answers);
      setResult(assessmentResult);

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .insert([{
            user_id: session.user.id,
            assessment_type: 'anxiety',
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

        // Save recommendations to database
        if (assessmentData && assessmentResult.recommendations.length > 0) {
          const recommendationsToInsert = assessmentResult.recommendations.map(rec => ({
            assessment_id: assessmentData.id,
            type: rec.type,
            title: rec.title,
            description: rec.description,
            url: rec.url
          }));

          const { error: recError } = await supabase
            .from('recommendations')
            .insert(recommendationsToInsert);

          if (recError) console.error('Error saving recommendations:', recError);
        }
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
    return <ResultsDisplay title="Anxiety Screening (GAD-7)" result={result} />;
  }

  return (
    <AssessmentFlow
      title="Generalized Anxiety Disorder Scale (GAD-7)"
      description="Over the last 2 weeks, how often have you been bothered by the following problems?"
      questions={gad7Questions}
      onComplete={handleComplete}
    />
  );
};

export default AnxietyAssessment;
