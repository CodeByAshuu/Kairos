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

// Define proper TypeScript interfaces for real data
interface ResumeAnalysis {
  id: string;
  created_at: string;
  resume_text: string;
  job_description: string;
  ats_score: number;
  improvements: Array<{ original: string; improved: string }>;
  cover_letter: string;
}

const History = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyData, setHistoryData] = useState<ResumeAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
      fetchHistory(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
        fetchHistory(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchHistory = async (userId: string) => {
  try {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching history:", error);
      return;
    }

    setHistoryData(data || []);
  } catch (error) {
    console.error("Error fetching history:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredHistory = historyData.filter(item =>
    item.job_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-yellow-600";
    return "text-destructive";
  };

  const handleView = (id: string) => {
    // Navigate to detailed view
    navigate(`/analysis/${id}`);
  };

  const handleRerun = async (analysis: ResumeAnalysis) => {
    // Re-run analysis with the same data
    navigate("/dashboard", {
      state: {
        resumeText: analysis.resume_text,
        jobDescription: analysis.job_description
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resume_analyses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting analysis:", error);
        return;
      }

      // Remove from local state
      setHistoryData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting analysis:", error);
    }
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
              placeholder="Search by job description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* History Cards */}
          <div className="grid gap-4">
            {isLoading ? (
              <Card className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Loading history...</h3>
              </Card>
            ) : filteredHistory.length === 0 ? (
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
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Job Title - Extract from job description */}
                    <div className="md:col-span-2">
                      <span className="text-sm text-foreground font-medium">
                        {item.job_description.substring(0, 50)}...
                      </span>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <Badge 
                        variant="outline" 
                        className={`font-bold ${getScoreColor(item.ats_score)}`}
                      >
                        {item.ats_score}%
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
                        onClick={() => handleRerun(item)}
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