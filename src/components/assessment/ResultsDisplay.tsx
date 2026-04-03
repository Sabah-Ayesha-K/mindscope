import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AssessmentResult } from '@/lib/assessments/types';
import { CheckCircle2, AlertCircle, ExternalLink, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResultsDisplayProps {
  title: string;
  result: AssessmentResult;
  showEmergencyAlert?: boolean;
  hideScore?: boolean;
}

const ResultsDisplay = ({ title, result, showEmergencyAlert, hideScore }: ResultsDisplayProps) => {
  const getSeverityColor = (severity?: string) => {
    if (!severity) return 'text-foreground';
    switch (severity.toLowerCase()) {
      case 'minimal':
      case 'low':
        return 'text-success';
      case 'mild':
      case 'moderate':
        return 'text-warning';
      case 'moderately severe':
      case 'high':
      case 'severe':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          {showEmergencyAlert && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Crisis Resources Available</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>If you're experiencing thoughts of self-harm or suicide, please reach out for immediate help:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>National Suicide Prevention Lifeline: <strong>988</strong></li>
                  <li>Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></li>
                  <li>Emergency Services: <strong>911</strong></li>
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <Card className="shadow-medium animate-scale-in">
            <CardHeader>
              <CardTitle className="text-3xl">{title} Results</CardTitle>
              {/* (optional) trimmed copy if you don't want “and recommendations” */}
              <CardDescription>Your personalized assessment results and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ✅ SCORE BLOCK: only render when hideScore is falsey */}
              {!hideScore && typeof result?.score === 'number' && (
                <div className="flex items-center justify-between p-6 bg-accent/20 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                    <p className="text-4xl font-bold">{result.score}</p>
                  </div>
                  {result.severity && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Severity Level</p>
                      <p className={`text-2xl font-semibold ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Interpretation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {result.interpretation}
                </p>
              </div>

              <div className="pt-4">
                <Link to="/dashboard">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Home className="h-4 w-4" />
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
