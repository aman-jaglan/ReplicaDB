
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Database, LayoutDashboard, BarChart3, Menu, X } from "lucide-react";

const NavItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-secondary'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-black/80 blur-backdrop shadow-soft py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Database className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-medium text-xl">DataSynth</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem 
            to="/discovery" 
            icon={LayoutDashboard} 
            label="Discovery" 
            isActive={location.pathname === '/discovery'} 
          />
          <NavItem 
            to="/synthesizer" 
            icon={Database} 
            label="Synthesizer" 
            isActive={location.pathname === '/synthesizer'} 
          />
          <NavItem 
            to="/analytics" 
            icon={BarChart3} 
            label="Analytics" 
            isActive={location.pathname === '/analytics'} 
          />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            <Link to="/discovery" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
              <LayoutDashboard className="w-4 h-4" />
              <span>Discovery</span>
            </Link>
            <Link to="/synthesizer" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
              <Database className="w-4 h-4" />
              <span>Synthesizer</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
