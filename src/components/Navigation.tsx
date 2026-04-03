import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">MindScope</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
