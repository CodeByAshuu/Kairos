import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  History,
  Settings,
  User,
  LogOut,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

const Dashboard = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleTailorResume = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Resumatch
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-muted rounded-lg px-4 py-2">
                <Zap className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">3 Credits</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 text-primary bg-primary/10 rounded-lg px-4 py-3 font-medium">
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg px-4 py-3 transition-colors">
                  <History className="w-5 h-5" />
                  <span>History</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg px-4 py-3 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg px-4 py-3 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </a>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome */}
            <div className="card-feature">
              <h1 className="text-3xl font-bold font-poppins mb-2">Welcome back, John!</h1>
              <p className="text-muted-foreground">Ready to tailor your resume for your next dream job?</p>
            </div>

            {/* Upload Resume Section */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-poppins">Step 1: Upload Your Resume</h2>
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
                    className="min-h-[200px] border-input-border focus:border-primary"
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="mt-6">
                  <div className="border-2 border-dashed border-input-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your resume here</p>
                    <p className="text-muted-foreground">or click to browse files</p>
                    <p className="text-sm text-muted-foreground mt-2">Supports PDF, DOCX, TXT</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Job Description Section */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-poppins">Step 2: Paste Job Description</h2>
              </div>
              
              <Textarea
                placeholder="Paste the job description you're applying for..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] border-input-border focus:border-primary"
              />
            </Card>

            {/* Tailor Button */}
            <div className="text-center">
              <Button 
                onClick={handleTailorResume}
                disabled={!resumeText || !jobDescription || isAnalyzing}
                className="btn-hero text-xl px-12 py-4"
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
                  <h2 className="text-2xl font-bold font-poppins mb-4">
                    {isAnalyzing ? "Analyzing Your Resume..." : "Your Tailored Results"}
                  </h2>
                  {isAnalyzing && (
                    <p className="text-muted-foreground">This usually takes 10-30 seconds</p>
                  )}
                </div>

                {/* ATS Score */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
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
                      <Progress value={94} className="h-3 mb-4" />
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
                          <AlertCircle className="w-4 h-4 text-warning" />
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
                    <FileText className="w-5 h-5 text-primary" />
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
                        <p className="text-sm text-muted-foreground mb-2">Original:</p>
                        <p className="mb-4">"Worked on web development projects"</p>
                        <p className="text-sm text-success mb-2">Tailored:</p>
                        <p className="font-medium">"Developed 5+ responsive web applications using React.js and Node.js, increasing user engagement by 40%"</p>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-2">Original:</p>
                        <p className="mb-4">"Tested and debugged applications"</p>
                        <p className="text-sm text-success mb-2">Tailored:</p>
                        <p className="font-medium">"Implemented comprehensive testing strategies using Jest and Cypress, reducing production bugs by 60%"</p>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Cover Letter */}
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <MessageSquare className="w-5 h-5 text-primary" />
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
                        John Doe
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;