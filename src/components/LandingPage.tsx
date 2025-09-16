import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, FileText, Zap, Star, ArrowRight } from "lucide-react";
import { HoverEffect } from "./ui/card-hover-effect";

const features = [
  {
    title: "Resume Rewrite",
    description: "AI rewrites your bullet points to match job requirements perfectly. Transform generic statements into powerful, quantified achievements that catch recruiters' attention.",
    link: "#",
  },
  {
    title: "Cover Letter",
    description: "Generate compelling cover letters tailored to each application. Our AI analyzes the job posting and creates personalized letters that highlight your relevant experience.",
    link: ".",
  },
  {
    title: "ATS Score",
    description: "Get real-time ATS compatibility scores and improvement suggestions. Ensure your resume passes through automated screening systems used by major companies.",
    link: "#",
  },
  {
    title: "Job Match",
    description: "See how well your resume matches specific job requirements. Get detailed insights on missing keywords and skills to improve your application success rate.",
    link: ".",
  },
  {
    title: "Keyword Optimization",
    description: "Automatically optimize your resume with industry-specific keywords that hiring managers and ATS systems are looking for in top candidates.",
    link: ",",
  },
  {
    title: "Industry Insights",
    description: "Access data-driven insights about your target industry, including trending skills, salary expectations, and competitive analysis for better positioning.",
    link: "/",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dotted-grid">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-background" />
            </div>
            <span className="text-2xl font-bold font-poppins text-foreground">
              Kairos
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="font-semibold bg-foreground text-background hover:text-white hover:bg-foreground/80"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 pt-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-6">
                Tailor Your Resume{" "}
                <span className="text-foreground">
                  Instantly
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                AI-powered resume optimization that matches your experience to any job description. 
                Get tailored bullets, cover letters, and ATS scores in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
                <Button 
                  className="btn-hero text-base md:text-lg px-6 md:px-8"
                  onClick={() => navigate("/signup")}
                >
                  Start Free Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Instant results</span>
                </div>
              </div>
            </div>
            
            <div className="slide-up">
              <div className="glass-card p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Resume Analysis</h3>
                    <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-background" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>ATS Score</span>
                      <span className="text-success font-semibold">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-ats h-2 rounded-full w-[94%]"></div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Recent improvements:</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Added 5 action verbs</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Optimized for "Software Engineer"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes job descriptions and tailors your resume with precision, 
              giving you the competitive edge you need.
            </p>
          </div>

          <HoverEffect items={features} />
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins mb-4">See the Transformation</h2>
            <p className="text-xl text-muted-foreground">
              Watch how our AI turns generic resume bullets into job-winning statements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
                    Before
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    "Worked on web development projects using various technologies and frameworks"
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    "Responsible for testing and debugging applications"
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    "Participated in team meetings and collaborated with colleagues"
                  </p>
                </div>
              </Card>

              <Card className="p-8 border-success border-2">
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
                    After
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    <strong>"Developed 5+ responsive web applications</strong> using React.js and Node.js, 
                    <strong>increasing user engagement by 40%</strong>"
                  </p>
                  <p className="leading-relaxed">
                    <strong>"Implemented comprehensive testing strategies</strong> using Jest and Cypress, 
                    <strong>reducing production bugs by 60%</strong>"
                  </p>
                  <p className="leading-relaxed">
                    <strong>"Led cross-functional collaboration</strong> with 8-person development team, 
                    <strong>delivering projects 25% ahead of schedule</strong>"
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins mb-4">Trusted by Job Seekers Worldwide</h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.9/5 from 2,000+ users</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold">
                    S
                  </div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Resumatch helped me land interviews at 3 FAANG companies. The AI suggestions were spot-on!"
              </p>
            </Card>

            <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold">
                    M
                  </div>
                <div>
                  <h4 className="font-semibold">Marcus Johnson</h4>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Increased my interview rate by 300%. The tailored bullets made all the difference."
              </p>
            </Card>

            <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-background font-bold">
                    A
                  </div>
                <div>
                  <h4 className="font-semibold">Aisha Patel</h4>
                  <p className="text-sm text-muted-foreground">Data Scientist</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Finally, a tool that understands ATS systems. My resume now gets past the filters!"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl font-bold font-poppins text-background mb-6">
              Get Your Dream Job Faster
            </h2>
            <p className="text-xl text-background/90 mb-8 max-w-2xl mx-auto">
              Start tailoring your resume today with 3 free credits. No credit card required.
            </p>
            <Button 
              className="bg-background text-foreground hover:bg-background/90 font-semibold px-12 py-4 rounded-xl text-lg"
              onClick={() => navigate("/signup")}
            >
              Start Free Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-bold font-poppins">Kairos</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered resume tailoring for job seekers who want to stand out.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Kairos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;