import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
// import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  History,
  User,
  LogOut,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "../hooks/use-toast";

const Dashboard = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [credits, setCredits] = useState(3);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleTailorResume = async () => {
    if (credits <= 0) {
      toast({
        variant: "destructive",
        title: "No credits remaining",
        description: "You need to purchase more credits to continue.",
      });
      return;
    }

    setCredits(credits - 1);
    setIsAnalyzing(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      await response.json();
      
      setIsAnalyzing(false);
      setHasResults(true);
      toast({
        title: "Resume analyzed successfully!",
        description: "Your tailored results are ready.",
      });
    } catch {
      setIsAnalyzing(false);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      navigate("/");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative">
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

        {/* Credits */}
        <div className="flex items-center justify-between bg-muted rounded-lg px-4 py-3 mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Credits</span>
          </div>
          <span className="text-lg font-bold text-foreground">{credits}</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 text-foreground bg-muted rounded-lg px-4 py-3 font-medium">
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <button 
            onClick={() => navigate("/history")}
            className="flex items-center space-x-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-4 py-3 transition-colors w-full text-left"
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>
          
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
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Welcome */}
          <div className="card-feature">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
              Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-muted-foreground">Ready to tailor your resume for your next dream job?</p>
          </div>

          {/* Upload Resume Section */}
          <Card className="p-4 md:p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Upload className="w-5 h-5 text-foreground" />
              <h2 className="text-lg md:text-xl font-semibold font-poppins">Step 1: Upload Your Resume</h2>
            </div>
            
            <Tabs defaultValue="paste" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">Paste Text</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste" className="mt-6">
                <Textarea
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[200px] border-input-border focus:border-ring"
                />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-6">
                <div 
                  className="border-2 border-dashed border-input-border rounded-xl p-12 text-center hover:border-ring transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      const file = files[0];
                      setUploadedFileName(file.name);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const text = e.target?.result as string;
                        setResumeText(text);
                      };
                      reader.readAsText(file);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  {uploadedFileName ? (
                    <div className="text-center">
                      <p className="text-lg font-medium mb-2 text-success">File uploaded successfully!</p>
                      <p className="text-muted-foreground">{uploadedFileName}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg font-medium mb-2">Drop your resume here</p>
                      <p className="text-muted-foreground">or click to browse files</p>
                      <p className="text-sm text-muted-foreground mt-2">Supports PDF, DOCX, TXT</p>
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadedFileName(file.name);
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const text = e.target?.result as string;
                          setResumeText(text);
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Job Description Section */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="w-5 h-5 text-foreground" />
              <h2 className="text-lg md:text-xl font-semibold font-poppins">Step 2: Paste Job Description</h2>
            </div>
            
            <Textarea
              placeholder="Paste the job description you're applying for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] border-input-border focus:border-ring"
            />
          </Card>

          {/* Tailor Button */}
          <div className="text-center">
            <Button 
              onClick={handleTailorResume}
              disabled={!resumeText || !jobDescription || isAnalyzing || credits <= 0}
              className="btn-hero text-lg md:text-xl px-8 md:px-12 py-3 md:py-4"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Tailor My Resume
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          {(isAnalyzing || hasResults) && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold font-poppins mb-4">
                  {isAnalyzing ? "Analyzing Your Resume..." : "Your Tailored Results"}
                </h2>
                {isAnalyzing && (
                  <p className="text-muted-foreground">This usually takes 10-30 seconds</p>
                )}
              </div>

              {/* ATS Score */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-foreground" />
                    <h3 className="text-lg font-semibold font-poppins">ATS Compatibility Score</h3>
                  </div>
                  {!isAnalyzing && (
                    <span className="text-2xl font-bold text-success">94%</span>
                  )}
                </div>
                
                {isAnalyzing ? (
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full animate-pulse"></div>
                    <p className="text-sm text-muted-foreground">Calculating compatibility...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-full bg-muted rounded-full h-3 mb-4">
                      <div className="bg-foreground h-3 rounded-full w-[94%]"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Keywords optimized</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Format ATS-friendly</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span>Add 2 more skills</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Length appropriate</span>
                      </div>
                    </div>
                  </>
                )}
              </Card>

              {/* Tailored Bullets */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FileText className="w-5 h-5 text-foreground" />
                  <h3 className="text-lg font-semibold font-poppins">Tailored Resume Bullets</h3>
                </div>
                
                {isAnalyzing ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
                          Before
                        </span>
                      </div>
                      <p className="mb-4">"Worked on web development projects"</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                          After
                        </span>
                      </div>
                      <p className="font-medium">"Developed 5+ responsive web applications using React.js and Node.js, increasing user engagement by 40%"</p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
                          Before
                        </span>
                      </div>
                      <p className="mb-4">"Tested and debugged applications"</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                          After
                        </span>
                      </div>
                      <p className="font-medium">"Implemented comprehensive testing strategies using Jest and Cypress, reducing production bugs by 60%"</p>
                    </div>
                  </div>
                )}
              </Card>

              {/* Cover Letter */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-foreground" />
                  <h3 className="text-lg font-semibold font-poppins">Generated Cover Letter</h3>
                </div>
                
                {isAnalyzing ? (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{width: `${60 + Math.random() * 40}%`}}></div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-6">
                    <p className="leading-relaxed">
                      Dear Hiring Manager,<br/><br/>
                      
                      I am excited to apply for the Software Engineer position at your company. With my proven track record of developing responsive web applications and implementing robust testing strategies, I am confident I can contribute significantly to your engineering team.<br/><br/>
                      
                      My experience developing 5+ web applications using React.js and Node.js aligns perfectly with your requirements for modern JavaScript frameworks. Additionally, my success in reducing production bugs by 60% through comprehensive testing demonstrates my commitment to code quality...<br/><br/>
                      
                      Best regards,<br/>
                      {user.user_metadata?.full_name || user.email}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;