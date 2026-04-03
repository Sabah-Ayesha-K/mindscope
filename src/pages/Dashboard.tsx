import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, ClipboardList, TrendingUp, LogOut, User, HeartPulse, Activity, AlertCircle, BarChart3, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        
        // Always show welcome for first-time users (both new signups and after consent)
        const hasSeenWelcome = localStorage.getItem('mindscope_welcome_seen');
        const hasConsented = localStorage.getItem('mindscope_consent');
        
        // Show welcome if user hasn't seen it OR just consented for the first time
        if (!hasSeenWelcome || (hasConsented && !hasSeenWelcome)) {
          setTimeout(() => setShowWelcome(true), 500);
        }
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  const handleCloseWelcome = () => {
    localStorage.setItem('mindscope_welcome_seen', 'true');
    setShowWelcome(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Brain className="h-6 w-6 text-primary" />
              Welcome to MindScope!
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Here's how to get the most out of your mental health journey:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Chat with our AI Assistant</h4>
                <p className="text-sm text-muted-foreground">
                  Start by using the AI Support Chat to discuss your concerns and get personalized recommendations.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Take Recommended Assessments</h4>
                <p className="text-sm text-muted-foreground">
                  Based on the chat, take the mental health screening tests (PSS-10, PHQ-9, or GAD-7) recommended by the AI.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Share Your Results</h4>
                <p className="text-sm text-muted-foreground">
                  Return to the chat and share your test scores to receive personalized insights and next steps.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleCloseWelcome} className="w-full">
            Get Started
          </Button>
        </DialogContent>
      </Dialog>
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">MindScope</span>
          </div>
          
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Continue your mental health journey</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer" onClick={() => navigate('/chat')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                AI Support Chat
              </CardTitle>
              <CardDescription>
                Get personalized test recommendations and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer" onClick={() => navigate('/results')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Results Dashboard
              </CardTitle>
              <CardDescription>
                View your progress and charts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Results
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Mental Health Screening
              </CardTitle>
              <CardDescription>
                Screen for stress, anxiety, and depression
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/assessment/stress">
                <Button variant="outline" className="w-full justify-start">
                  <HeartPulse className="h-4 w-4 mr-2" />
                  Stress (PSS-10)
                </Button>
              </Link>
              <Link to="/assessment/depression">
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Depression (PHQ-9)
                </Button>
              </Link>
              <Link to="/assessment/anxiety">
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Anxiety (GAD-7)
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-secondary" />
                Personality & Cognitive
              </CardTitle>
              <CardDescription>
                Discover your personality and abilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/assessment/mbti">
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="h-4 w-4 mr-2" />
                  MBTI Assessment
                </Button>
              </Link>
              <Link to="/assessment/eq">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  EQ Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                Profile
              </CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/profile">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
