import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, AlertTriangle } from 'lucide-react';

interface ConsentScreenProps {
  onAccept: () => void;
}

export const ConsentScreen = ({ onAccept }: ConsentScreenProps) => {
  const [hasAccepted, setHasAccepted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to MindScope</CardTitle>
          <CardDescription>Your Mental Health Companion</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert variant="destructive" className="border-red-500">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="ml-2">
              <strong className="block mb-2">Emergency Resources - Available 24/7</strong>
              <div className="space-y-1 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <strong>National Emergency Number:</strong> 112
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <strong>Vandrevala Foundation (Mental Health):</strong> 1860-2662-345 or 1800-2333-330
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <strong>AASRA (Suicide Prevention):</strong> 9820466726
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <strong>iCall (Psychological Support):</strong> 9152987821
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <strong>Snehi Foundation:</strong> 91-22-27546669
                </p>
              </div>
              <p className="mt-3 text-sm">
                If you're experiencing a mental health emergency, please call 112 (emergency services) or go to your nearest emergency room immediately.
              </p>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Important Information</h3>
            
            <div className="space-y-3 text-sm">
              <p>
                <strong>Not a Substitute for Professional Care:</strong> MindScope is a mental health screening and support tool. It is NOT a replacement for professional medical advice, diagnosis, or treatment.
              </p>
              
              <p>
                <strong>Privacy & Confidentiality:</strong> Your responses are stored securely and privately. However, if you indicate you are at risk of harming yourself or others, we may provide emergency resources.
              </p>
              
              <p>
                <strong>Assessment Accuracy:</strong> Our assessments use scientifically validated screening tools (PHQ-9, GAD-7, PSS-10), but only a qualified healthcare provider can provide an official diagnosis.
              </p>
              
              <p>
                <strong>Data Usage:</strong> Your assessment data is used to provide personalized recommendations and track your progress over time. We do not share your data with third parties.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <Checkbox 
              id="consent" 
              checked={hasAccepted}
              onCheckedChange={(checked) => setHasAccepted(checked as boolean)}
            />
            <label 
              htmlFor="consent" 
              className="text-sm cursor-pointer leading-relaxed"
            >
              I understand that MindScope is not a substitute for professional mental health care. I acknowledge that I have read the emergency resources and disclaimer above. I consent to use this application for mental health screening and support.
            </label>
          </div>

          <Button 
            onClick={onAccept}
            disabled={!hasAccepted}
            className="w-full"
            size="lg"
          >
            Continue to MindScope
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
