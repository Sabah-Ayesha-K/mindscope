import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Brain, Heart, Activity, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const isMBTI = (type?: string) => (type ?? '').toLowerCase() === 'mbti';

interface Assessment {
  id: string;
  assessment_type: string;
  score: number|null;
  severity_level: string;
  created_at: string;
  result_data?: any;
}


const Results = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      // Fetch assessments
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (assessmentsError) throw assessmentsError;
      setAssessments(assessmentsData || []);

      // Fetch recommendations
      const { data: recsData, error: recsError } = await supabase
        .from('recommendations')
        .select('*')
        .in('assessment_id', (assessmentsData || []).map(a => a.id));

      if (recsError) throw recsError;

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load results data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('MindScope Assessment Report', 20, 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Summary
    doc.setFontSize(14);
    doc.text('Assessment Summary', 20, 45);
    
    const summaryData = assessments.slice(0, 10).map(a => [
      a.assessment_type.toUpperCase(),
      a.score.toString(),
      a.severity_level || 'N/A',
      new Date(a.created_at).toLocaleDateString()
    ]);
    
    autoTable(doc, {
      startY: 50,
      head: [['Type', 'Score', 'Severity', 'Date']],
      body: summaryData,
    });
    
    doc.save('mindscope-report.pdf');
    
    toast({
      title: 'PDF Generated',
      description: 'Your report has been downloaded successfully'
    });
  };

  const getChartDataByType = (type: string) => {
    return assessments
      .filter(a => a.assessment_type === type)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .slice(-10)
      .map(a => ({
        date: new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: a.score,
        severity: a.severity_level
      }));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'stress': return <Activity className="h-5 w-5" />;
      case 'anxiety': return <Heart className="h-5 w-5" />;
      case 'depression': return <Brain className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Results Dashboard</h1>
            <p className="text-muted-foreground">Track your mental health journey over time</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="flex items-center gap-2">
              Return to Dashboard
            </Button>
            <Button onClick={generatePDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF Report
            </Button>
          </div>
        </div>

        {assessments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No assessments completed yet</p>
              <Button onClick={() => navigate('/dashboard')}>Take Your First Assessment</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assessments.length}</div>
                  <p className="text-xs text-muted-foreground">Completed evaluations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {(() => {
                    const latest = assessments[0];
                    if (!latest || isMBTI(latest.assessment_type)) {
                      return (
                        <>
                          <div className="text-2xl font-bold">—</div>
                          <p className="text-xs text-muted-foreground">No numeric score for MBTI</p>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="text-2xl font-bold">{latest.score}</div>
                        <p className="text-xs text-muted-foreground">
                          {latest.assessment_type.toUpperCase()} - {latest.severity_level}
                        </p>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            {/* Trend Charts by Type */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Stress Trends */}
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-chart-1" />
                    <CardTitle>Stress Trends</CardTitle>
                  </div>
                  <CardDescription>PSS-10 scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getChartDataByType('stress')}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: 'var(--shadow-soft)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-1))', r: 5 }}
                        activeDot={{ r: 7, strokeWidth: 2 }}
                        name="Stress Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Anxiety Trends */}
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-chart-2" />
                    <CardTitle>Anxiety Trends</CardTitle>
                  </div>
                  <CardDescription>GAD-7 scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getChartDataByType('anxiety')}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: 'var(--shadow-soft)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-2))', r: 5 }}
                        activeDot={{ r: 7, strokeWidth: 2 }}
                        name="Anxiety Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Depression Trends */}
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-chart-3" />
                    <CardTitle>Depression Trends</CardTitle>
                  </div>
                  <CardDescription>PHQ-9 scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getChartDataByType('depression')}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem',
                          boxShadow: 'var(--shadow-soft)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-3))', r: 5 }}
                        activeDot={{ r: 7, strokeWidth: 2 }}
                        name="Depression Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>Your latest evaluation results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessments.slice(0, 5).map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getIconForType(assessment.assessment_type)}
                        <div>
                          <p className="font-medium">{assessment.assessment_type.toUpperCase()}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(assessment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {isMBTI(assessment.assessment_type) ? (
                          <>
                            <p className="text-xl font-bold">
                              {assessment.result_data?.details?.type ?? '—'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {assessment.result_data?.details?.name ?? 'Personality Result'}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-2xl font-bold">{assessment.score}</p>
                            <p className="text-sm text-muted-foreground">{assessment.severity_level}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
