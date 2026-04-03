import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Brain, Heart, TrendingUp, Shield, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground">
              <Brain className="h-5 w-5" />
              <span className="text-sm font-medium">Your Mental Health Companion</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Understand Yourself Better
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Take scientifically-backed assessments to understand your personality, cognitive abilities, 
              and emotional wellbeing. Get personalized insights and track your progress over time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="shadow-medium">
                  Get Started Free
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Mental Health Assessments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Evidence-based tools to help you understand your mental health and personality
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personality Assessment</CardTitle>
                <CardDescription>
                  Discover your MBTI type and understand your unique personality traits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Mental Health Screening</CardTitle>
                <CardDescription>
                  Screen for stress, anxiety, depression, and sleep difficulties
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your mental health journey with detailed analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose MindScope?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Scientifically Validated</h3>
                    <p className="text-muted-foreground">
                      All assessments are based on established psychological research
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Shield className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Private & Secure</h3>
                    <p className="text-muted-foreground">
                      Your data is encrypted and never shared without your consent
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Personalized Insights</h3>
                    <p className="text-muted-foreground">
                      Get tailored recommendations based on your unique results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle>Ready to begin your journey?</CardTitle>
                <CardDescription>
                  Join thousands who have gained insights into their mental health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/auth">
                  <Button size="lg" className="w-full">
                    Start Your Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
