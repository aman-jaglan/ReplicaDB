
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Database, BarChart2, LayoutDashboard } from "lucide-react";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 25%, rgba(0, 0, 0, 0.05) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 75%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)`
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Introducing DataSynth Platform
              </span>
            </div>
            
            <h1 
              className="text-balance font-medium mb-6 leading-tight animate-fade-in"
            >
              Discover, Synthesize, and Analyze Data with Precision
            </h1>
            
            <p 
              className="text-xl text-muted-foreground mb-10 text-balance animate-slide-up"
            >
              A comprehensive platform that helps you find the right datasets, 
              generate synthetic data to your specifications, and gain valuable insights through advanced analytics.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button size="lg" asChild>
                <Link to="/discovery">
                  Explore Datasets <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/synthesizer">
                  Generate Data
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Discovery</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Find and explore curated datasets from various domains and sources.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Synthesis</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Generate custom synthetic datasets tailored to your specific requirements.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Analytics</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Analyze and visualize data to extract meaningful insights and patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">Powerful Tools for Your Data Needs</h2>
            <p className="text-muted-foreground text-lg">
              Our comprehensive suite of tools helps you manage the entire data lifecycle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Dataset Repository</h3>
              <p className="text-muted-foreground mb-4">
                Access a vast collection of curated datasets from various domains, all in one place.
              </p>
              <Link to="/discovery" className="text-primary hover:underline inline-flex items-center">
                Browse datasets <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Synthetic Data Generation</h3>
              <p className="text-muted-foreground mb-4">
                Create realistic synthetic datasets with customizable parameters to meet your specific needs.
              </p>
              <Link to="/synthesizer" className="text-primary hover:underline inline-flex items-center">
                Generate data <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Analyze your data with powerful visualization tools and extract meaningful insights.
              </p>
              <Link to="/analytics" className="text-primary hover:underline inline-flex items-center">
                Analyze data <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-4">Ready to Transform Your Data Experience?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join thousands of researchers, analysts, and data scientists who use DataSynth to power their data workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/discovery">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                <Link to="#">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
