
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, BarChart2, LayoutDashboard } from "lucide-react";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      { ref: headingRef, delay: 100 },
      { ref: paragraphRef, delay: 300 },
      { ref: buttonsRef, delay: 500 },
      { ref: decorationRef, delay: 700 }
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translateY(0)';
          }
        }, delay);
      }
    });
  }, []);

  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div 
        ref={decorationRef}
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
            ref={headingRef}
            className="text-balance font-medium mb-6 leading-tight"
          >
            Discover, Synthesize, and Analyze Data with Precision
          </h1>
          
          <p 
            ref={paragraphRef}
            className="text-xl text-muted-foreground mb-10 text-balance"
          >
            A comprehensive platform that helps you find the right datasets, 
            generate synthetic data to your specifications, and gain valuable insights through advanced analytics.
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
  );
};

export default Hero;
