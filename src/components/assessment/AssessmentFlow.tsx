import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/lib/assessments/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AssessmentFlowProps {
  title: string;
  description: string;
  questions: Question[];
  onComplete: (answers: Record<string, number>) => void;
}

const AssessmentFlow = ({ title, description, questions, onComplete }: AssessmentFlowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;
  const canProceed = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: parseInt(value) });
  };

  const handleNext = () => {
    if (isLastQuestion && canProceed) {
      onComplete(answers);
    } else if (canProceed) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-3xl mx-auto px-4">
        <Card className="shadow-medium">
          <CardHeader>
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium leading-relaxed">
                {currentQuestion.text}
              </h3>
              
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value.toString()}
                      id={`${currentQuestion.id}-${option.value}`}
                    />
                    <Label
                      htmlFor={`${currentQuestion.id}-${option.value}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                {currentIndex === 0 ? 'Cancel' : 'Back'}
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {isLastQuestion ? 'View Results' : 'Next'}
                {!isLastQuestion && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentFlow;
