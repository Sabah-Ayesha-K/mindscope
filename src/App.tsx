import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConsentScreen } from "@/components/ConsentScreen";
import { ChatInterface } from "@/components/ChatInterface";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import StressAssessment from "./pages/assessments/StressAssessment";
import DepressionAssessment from "./pages/assessments/DepressionAssessment";
import AnxietyAssessment from "./pages/assessments/AnxietyAssessment";
import MBTIAssessment from "./pages/assessments/MBTIAssessment";
import EQAssessment from "./pages/assessments/EQAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mindscope_consent');
    if (consent === 'true') {
      setHasConsented(true);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('mindscope_consent', 'true');
    setHasConsented(true);
  };

  if (!hasConsented) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ConsentScreen onAccept={handleAcceptConsent} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/results" element={<Results />} />
            <Route path="/assessment/stress" element={<StressAssessment />} />
            <Route path="/assessment/depression" element={<DepressionAssessment />} />
            <Route path="/assessment/anxiety" element={<AnxietyAssessment />} />
            <Route path="/assessment/mbti" element={<MBTIAssessment />} />
            <Route path="/assessment/eq" element={<EQAssessment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
