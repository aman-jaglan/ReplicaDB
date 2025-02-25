
import { Link } from 'react-router-dom';
import { Database, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Database className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-medium text-xl">DataSynth</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Discover, synthesize, and analyze data with our all-in-one platform.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/discovery" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Data Discovery
                </Link>
              </li>
              <li>
                <Link to="/synthesizer" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Data Synthesizer
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} DataSynth. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
