-- Allow users to insert recommendations for their own assessments
CREATE POLICY "Users can insert own recommendations"
ON public.recommendations
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM assessments
    WHERE assessments.id = recommendations.assessment_id
    AND assessments.user_id = auth.uid()
  )
);