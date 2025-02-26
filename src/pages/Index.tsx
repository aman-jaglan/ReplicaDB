
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Database, 
  BarChart2, 
  LayoutDashboard, 
  LineChart, 
  PieChart, 
  FileText, 
  Filter, 
  Search, 
  Layers, 
  ChevronDown, 
  DownloadCloud,
  BookOpen,
  BookMarked,
  Users,
  GraduationCap,
  Briefcase,
  FileQuestion,
  Lightbulb,
  GitBranch,
  RotateCw,
  GitCommit,
  Calendar // Add Calendar import
} from "lucide-react";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Helper function to generate HSL colors based on Perlin-like noise simulation
const generateHSL = (time: number, offset: number) => {
  // Simplified noise simulation (without actual Perlin noise implementation)
  const hue = (Math.sin(time * 0.05 + offset) * 60 + 180) % 360; // blue/purple range
  const saturation = 50 + Math.sin(time * 0.02 + offset) * 20;
  const lightness = 70 + Math.sin(time * 0.01 + offset * 2) * 15;

  return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;
};

const Index = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<HTMLDivElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Handle mouse movement for interactive color effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll position for reactive effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation loop for dynamic color effects
  useEffect(() => {
    if (!bgRef.current) return;

    // Initialize time
    timeRef.current = 0;

    // Create colorful bubbles for background with dynamic HSL colors
    const bubbleColors = [
      'hsla(210, 90%, 80%, 0.6)', // soft blue
      'hsla(280, 90%, 85%, 0.6)', // soft purple
      'hsla(340, 90%, 85%, 0.6)', // soft pink
      'hsla(180, 90%, 85%, 0.6)', // soft teal
      'hsla(40, 90%, 85%, 0.6)',  // soft gold
      'hsla(150, 90%, 85%, 0.6)'  // soft green
    ];

    // Clear any existing bubbles
    if (bgRef.current) {
      bubbleRefs.current.forEach(bubble => {
        if (bubble && bgRef.current?.contains(bubble)) {
          bgRef.current.removeChild(bubble);
        }
      });
      bubbleRefs.current = [];
    }

    // Create new dynamic bubbles
    for (let i = 0; i < 10; i++) {
      const bubble = document.createElement('div');
      const size = Math.random() * 400 + 200;
      const initialColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

      bubble.style.position = 'absolute';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.borderRadius = '50%';
      bubble.style.background = initialColor;
      bubble.style.filter = 'blur(100px)';
      bubble.style.opacity = '0.7';
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.transform = 'translate(-50%, -50%)';
      bubble.style.transition = 'all 15s ease-in-out';
      bubble.style.zIndex = '-1';

      // Store additional properties for animation
      bubble.dataset.speedX = ((Math.random() - 0.5) * 0.02).toString();
      bubble.dataset.speedY = ((Math.random() - 0.5) * 0.02).toString();
      bubble.dataset.colorOffset = (i * 1.5).toString();

      if (bgRef.current) {
        bgRef.current.appendChild(bubble);
        bubbleRefs.current.push(bubble);
      }
    }

    // Animation function for dynamic color shifts and movement
    const animate = (time: number) => {
      timeRef.current += 0.5;

      bubbleRefs.current.forEach((bubble, index) => {
        if (!bubble) return;

        // Get current position
        const rect = bubble.getBoundingClientRect();
        const speedX = parseFloat(bubble.dataset.speedX || '0.01');
        const speedY = parseFloat(bubble.dataset.speedY || '0.01');
        const colorOffset = parseFloat(bubble.dataset.colorOffset || '0');

        // Calculate new position with boundary checks
        let left = parseFloat(bubble.style.left) + speedX * (mousePosition.x * 2 - 1);
        let top = parseFloat(bubble.style.top) + speedY * (mousePosition.y * 2 - 1);

        // Apply scroll influence
        top += scrollPosition * 0.05;

        // Bounce off edges
        if (left < 0 || left > 100) {
          bubble.dataset.speedX = (-speedX).toString();
          left = Math.max(0, Math.min(100, left));
        }

        if (top < 0 || top > 100) {
          bubble.dataset.speedY = (-speedY).toString();
          top = Math.max(0, Math.min(100, top));
        }

        // Update position
        bubble.style.left = `${left}%`;
        bubble.style.top = `${top}%`;

        // Update color using HSL for smooth transitions
        bubble.style.background = generateHSL(timeRef.current, colorOffset);

        // Subtle scale pulsing
        const scale = 1 + 0.05 * Math.sin(timeRef.current * 0.01 + index);
        bubble.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);


  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Dynamic Interactive Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 -z-10 overflow-hidden"
      />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Introducing ReplicaDB Platform
              </Badge>
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
              <div className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Discovery</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Find and explore curated datasets from various domains and sources.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Synthesis</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Generate custom synthetic datasets tailored to your specific requirements.
                </p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors backdrop-blur-sm">
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

      {/* Data Challenges Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">The Data Challenge</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Finding the right data for your research, projects, or business needs can be overwhelming
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Students & Researchers</h3>
              <p className="text-muted-foreground mb-4">
                Struggle to find relevant, high-quality datasets for academic projects and research
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Limited access to specialized datasets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Time wasted searching across multiple sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Inconsistent data formats and quality</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Data Scientists</h3>
              <p className="text-muted-foreground mb-4">
                Need diverse, balanced datasets to train and validate machine learning models
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Biased or incomplete training data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Privacy concerns with sensitive data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Difficulty finding edge cases for model testing</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Business Analysts</h3>
              <p className="text-muted-foreground mb-4">
                Require accurate data to drive business decisions and strategies
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Siloed data across departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Costly commercial data subscriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Ensuring data is representative and up-to-date</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <FileQuestion className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Everyday Problems</h3>
              <p className="text-muted-foreground mb-4">
                Common data challenges faced by professionals across industries
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Overwhelming number of data sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Lack of standardization and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Need for specialized data that doesn't exist</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-medium mb-4">How DataSynth Solves These Challenges</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              Our platform provides an integrated solution for data discovery, synthetic data generation, 
              and advanced analytics to meet all your data needs
            </p>
            
            <Button size="lg" asChild>
              <Link to="/discovery">
                See Our Solution <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Data Synthesizer Detailed Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">Data Synthesizer: Create Custom Datasets</h2>
            <p className="text-muted-foreground text-lg">
              Generate synthetic data that matches your exact specifications, whether for testing, 
              training AI models, or filling gaps in your existing datasets
            </p>
          </div>
          
          <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="process">How It Works</TabsTrigger>
              <TabsTrigger value="usecases">Use Cases</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GitBranch className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Schema-Based Generation</h3>
                      <p className="text-sm text-muted-foreground">
                        Define your data structure and constraints, and our system will generate data that matches your specifications
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Specify data types, ranges, distributions, and relationships</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Create statistically realistic data that follows your rules</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Ensure privacy compliance with fully synthetic data</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GitCommit className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">AI-Enhanced Synthesis</h3>
                      <p className="text-sm text-muted-foreground">
                        Leverage advanced machine learning to create realistic, coherent data that preserves statistical properties
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Train models on existing data to generate similar samples</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Maintain complex relationships between variables</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Generate edge cases and rare scenarios for robust testing</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <RotateCw className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Customization & Control</h3>
                      <p className="text-sm text-muted-foreground">
                        Fine-tune every aspect of your synthetic data to meet your exact needs
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Control outliers, missing values, and noise levels</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Adjust correlations and dependencies between fields</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Incorporate domain-specific rules and constraints</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DownloadCloud className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Export & Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Seamlessly incorporate synthetic data into your workflows
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Export in multiple formats (CSV, JSON, Excel, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Direct API integration with your systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Schedule automatic data generation for continuous testing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="process" className="p-1">
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-8 shadow-soft backdrop-blur-sm">
                <h3 className="text-2xl font-medium mb-6 text-center">The Data Synthesis Process</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-primary font-bold text-xl">1</span>
                    </div>
                    <h4 className="text-lg font-medium mb-2">Define Schema</h4>
                    <p className="text-sm text-muted-foreground">
                      Specify your data structure, including column types, relationships, 
                      constraints, and statistical properties.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-primary font-bold text-xl">2</span>
                    </div>
                    <h4 className="text-lg font-medium mb-2">Generate & Refine</h4>
                    <p className="text-sm text-muted-foreground">
                      Our AI engines generate data according to your specifications, 
                      which you can preview and refine as needed.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-primary font-bold text-xl">3</span>
                    </div>
                    <h4 className="text-lg font-medium mb-2">Export & Use</h4>
                    <p className="text-sm text-muted-foreground">
                      Download your synthetic data in your preferred format or 
                      connect directly to your systems via API.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button size="lg" asChild>
                    <Link to="/synthesizer">
                      Try The Synthesizer <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="usecases" className="p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-medium mb-4">For Machine Learning</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Augment training data</span> - Expand limited datasets with synthetic samples
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Balance classes</span> - Generate additional examples for underrepresented classes
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Privacy-safe training</span> - Train models without exposing sensitive real data
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-medium mb-4">For Software Testing</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Realistic test data</span> - Test with data that mirrors production patterns
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Edge case generation</span> - Create unusual scenarios to test system robustness
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Load testing</span> - Generate massive datasets to test system performance
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-medium mb-4">For Education & Research</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Educational datasets</span> - Create datasets for teaching data science concepts
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Research simulation</span> - Simulate data for theoretical research scenarios
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Hypothesis testing</span> - Generate data with specific properties to test theories
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-medium mb-4">For Business & Compliance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Demo data</span> - Create realistic but non-sensitive data for demos
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">GDPR compliance</span> - Replace sensitive data with synthetic alternatives
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Data sharing</span> - Share data with partners without revealing confidential information
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="mb-2">Latest from our Blog</h2>
              <p className="text-muted-foreground">
                Insights, tips, and trends in data science and analytics
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/blog">
                View All Posts <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1074&auto=format&fit=crop" 
                  alt="Synthetic Data Blog Post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3">Synthetic Data</Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  May 15, 2023
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  The Future of Synthetic Data in Machine Learning
                </h3>
                <p className="text-muted-foreground mb-4">
                  How synthetic data is revolutionizing machine learning model training by providing diverse, privacy-compliant datasets.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary flex items-center">
                  Read More <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop" 
                  alt="Data Discovery Blog Post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3">Data Discovery</Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  June 3, 2023
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Data Discovery Tools: A Comparative Analysis
                </h3>
                <p className="text-muted-foreground mb-4">
                  An in-depth comparison of top data discovery platforms and how they accelerate the analytics workflow.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary flex items-center">
                  Read More <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1156&auto=format&fit=crop" 
                  alt="AI Ethics Blog Post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3">Ethics & AI</Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  June 22, 2023
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Ethics in AI-Generated Datasets
                </h3>
                <p className="text-muted-foreground mb-4">
                  Exploring the ethical considerations and best practices when working with AI-generated synthetic data.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary flex items-center">
                  Read More <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Showcase Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Powerful Data Analytics Tools</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Visualize and analyze your data with interactive dashboards, charts, and insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-medium mb-4">Interactive Dashboards</h3>
              <p className="text-muted-foreground mb-6">
                Create custom dashboards with drag-and-drop simplicity. Combine multiple visualizations
                for comprehensive data analysis and decision making.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <BarChart2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Multiple Chart Types</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose from bar charts, line graphs, pie charts, scatter plots and more to best represent your data.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Advanced Filtering</h4>
                    <p className="text-sm text-muted-foreground">
                      Apply filters, exclude null values, and transform your data for cleaner analysis.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <DownloadCloud className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Export & Share</h4>
                    <p className="text-sm text-muted-foreground">
                      Download your processed data or share dashboards with your team for collaborative analysis.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8" asChild>
                <Link to="/analytics">
                  Try Analytics Tools <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="p-2 border rounded-xl bg-background shadow-lg">
                <div className="rounded-lg overflow-hidden">
                  <div className="flex items-center border-b px-4 py-2 bg-secondary/30">
                    <div className="w-3 h-3 rounded-full bg-destructive/60 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/60 mr-2"></div>
                    <div className="text-sm font-medium ml-2">Sales Performance Dashboard</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 p-3 bg-secondary/10">
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium">Revenue by Product</div>
                        <BarChart2 className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="h-32 flex flex-col justify-end">
                        <div className="flex items-end h-24 gap-1">
                          <div className="bg-blue-400/70 w-6 h-[40%] rounded-t"></div>
                          <div className="bg-blue-500/70 w-6 h-[65%] rounded-t"></div>
                          <div className="bg-blue-600/70 w-6 h-[80%] rounded-t"></div>
                          <div className="bg-blue-700/70 w-6 h-[55%] rounded-t"></div>
                          <div className="bg-blue-800/70 w-6 h-[90%] rounded-t"></div>
                          <div className="bg-blue-900/70 w-6 h-[75%] rounded-t"></div>
                        </div>
                        <div className="h-1 bg-border mt-1"></div>
                      </div>
                    </div>
                    
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium">Customer Segments</div>
                        <PieChart className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="h-32 flex items-center justify-center">
                        <div className="relative w-24 h-24">
                          <div className="absolute inset-0 rounded-full border-8 border-blue-400/70" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 80% 100%)' }}></div>
                          <div className="absolute inset-0 rounded-full border-8 border-blue-600/70" style={{ clipPath: 'polygon(50% 50%, 80% 100%, 0 100%, 0 0)' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium">Monthly Trends</div>
                        <LineChart className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="h-32 flex items-end">
                        <div className="w-full h-24 flex items-end">
                          <svg className="w-full h-full" viewBox="0 0 100 60">
                            <path d="M0,60 L10,50 L20,55 L30,35 L40,40 L50,20 L60,30 L70,15 L80,25 L90,10 L100,5" fill="none" stroke="rgba(59, 130, 246, 0.7)" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md bg-background p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-medium">Top Products</div>
                        <Layers className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="h-32 py-2">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span>Product A</span>
                          <span className="font-medium">$12,450</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full mb-2">
                          <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span>Product B</span>
                          <span className="font-medium">$8,390</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full mb-2">
                          <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span>Product C</span>
                          <span className="font-medium">$6,710</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full">
                          <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-300/20 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-300/20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Showcase Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Explore Rich Data Collections</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Access a variety of datasets from different domains and sources
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="p-2 border rounded-xl bg-background shadow-lg">
                <div className="rounded-lg overflow-hidden">
                  <div className="flex items-center border-b px-4 py-2 bg-secondary/30">
                    <div className="w-3 h-3 rounded-full bg-destructive/60 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/60 mr-2"></div>
                    <div className="text-sm font-medium ml-2">Dataset Explorer</div>
                  </div>
                  
                  <div className="bg-secondary/10 p-4">
                    <div className="flex items-center px-3 py-2 bg-background rounded-lg shadow-sm mb-4">
                      <Search className="h-4 w-4 text-muted-foreground mr-2" />
                      <div className="text-xs text-muted-foreground">Search datasets...</div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Card className="overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-1">Financial Data</h4>
                          <p className="text-xs text-muted-foreground mb-2">Stock prices, company fundamentals, and economic indicators</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">Free</Badge>
                            <Badge className="text-xs bg-blue-500/80">Finance</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-green-500/30 to-teal-500/30 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-1">Healthcare Records</h4>
                          <p className="text-xs text-muted-foreground mb-2">Medical data, patient records, and health indicators</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">Premium</Badge>
                            <Badge className="text-xs bg-green-500/80">Healthcare</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-orange-500/30 to-red-500/30 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-1">Retail Sales</h4>
                          <p className="text-xs text-muted-foreground mb-2">E-commerce transactions, customer behavior, and product metrics</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">Free</Badge>
                            <Badge className="text-xs bg-orange-500/80">Retail</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-1">Educational Data</h4>
                          <p className="text-xs text-muted-foreground mb-2">Student performance, institutional rankings, and learning metrics</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">Premium</Badge>
                            <Badge className="text-xs bg-purple-500/80">Education</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-green-300/20 -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-orange-300/20 -z-10"></div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-medium mb-4">Rich Dataset Collection</h3>
              <p className="text-muted-foreground mb-6">
                Explore datasets from various domains including finance, healthcare, retail, education, and more.
                Filter by category, license type, and other attributes to find exactly what you need.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Advanced Search</h4>
                    <p className="text-sm text-muted-foreground">
                      Find datasets with powerful search and filtering capabilities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Badge className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Free & Premium</h4>
                    <p className="text-sm text-muted-foreground">
                      Access both free datasets and premium collections with enhanced data quality.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <DownloadCloud className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Easy Download</h4>
                    <p className="text-sm text-muted-foreground">
                      Download datasets in various formats or analyze them directly on the platform.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8" asChild>
                <Link to="/discovery">
                  Browse Datasets <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">Powerful Tools for Your Data Needs</h2>
            <p className="text-muted-foreground text-lg">
              Our comprehensive suite of tools helps you manage the entire data lifecycle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Dataset Repository</h3>
              <p className="text-muted-foreground">
                Browse and search through thousands of curated datasets from diverse sources and domains.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Visualization Tools</h3>
              <p className="text-muted-foreground">
                Create stunning visualizations to better understand patterns and insights hidden in your data.
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-soft backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Build customizable dashboards to monitor key metrics and track performance indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
