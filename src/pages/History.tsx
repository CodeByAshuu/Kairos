import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { 
  FileText, 
  History as HistoryIcon,
  User,
  LogOut,
  Search,
  Eye,
  RefreshCw,
  Trash2,
  Calendar,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Define proper TypeScript interfaces
interface HistoryItem {
  id: number;
  date: string;
  resumeName: string;
  jobTitle: string;
  matchScore: number;
}

// Mock data for demonstration
const mockHistoryData: HistoryItem[] = [
  {
    id: 1,
    date: "2024-01-15",
    resumeName: "john_doe_resume.pdf",
    jobTitle: "Senior Frontend Developer @ Meta",
    matchScore: 92,
  },
  {
    id: 2,
    date: "2024-01-14",
    resumeName: "john_doe_resume_v2.pdf", 
    jobTitle: "Full Stack Engineer @ Stripe",
    matchScore: 89,
  },
  {
    id: 3,
    date: "2024-01-13",
    resumeName: "john_doe_resume.pdf",
    jobTitle: "Software Engineer @ Google",
    matchScore: 95,
  },
  {
    id: 4,
    date: "2024-01-12",
    resumeName: "john_doe_resume.pdf",
    jobTitle: "React Developer @ Netflix",
    matchScore: 87,
  },
  {
    id: 5,
    date: "2024-01-11",
    resumeName: "john_doe_resume.pdf",
    jobTitle: "Frontend Engineer @ Amazon",
    matchScore: 90,
  },
];

const History = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyData, setHistoryData] = useState<HistoryItem[]>(mockHistoryData);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredHistory = historyData.filter(item =>
    item.resumeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-yellow-600";
    return "text-destructive";
  };

  const handleView = (id: number) => {
    // Navigate to detailed view or open modal
    console.log("View item:", id);
  };

  const handleRerun = (id: number) => {
    // Re-run analysis
    console.log("Rerun analysis for:", id);
  };

  const handleDelete = (id: number) => {
    setHistoryData(prev => prev.filter(item => item.id !== id));
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6 flex flex-col fixed h-full overflow-hidden">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-bold font-poppins text-foreground">
            Kairos
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3 mb-8 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-background" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user.user_metadata?.full_name || user.email}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-4 py-3 transition-colors w-full text-left"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <div className="flex items-center space-x-3 text-foreground bg-muted rounded-lg px-4 py-3 font-medium">
            <HistoryIcon className="w-5 h-5" />
            <span>History</span>
          </div>
          
          {/* Sign Out */}
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-4 py-3 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 ml-64">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-poppins">
                  Resume Analysis History
                </h1>
                <p className="text-muted-foreground">
                  View and manage your previous resume analyses
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by resume name or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* History Cards */}
          <div className="grid gap-4">
            {filteredHistory.length === 0 ? (
              <Card className="p-8 text-center">
                <HistoryIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No history found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No results match your search." : "You haven't analyzed any resumes yet."}
                </p>
              </Card>
            ) : (
              filteredHistory.map((item) => (
                <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Date */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Resume Name */}
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium truncate">
                        {item.resumeName}
                      </span>
                    </div>

                    {/* Job Title */}
                    <div className="md:col-span-2">
                      <span className="text-sm text-foreground font-medium">
                        {item.jobTitle}
                      </span>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <Badge 
                        variant="outline" 
                        className={`font-bold ${getScoreColor(item.matchScore)}`}
                      >
                        {item.matchScore}%
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(item.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRerun(item.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;