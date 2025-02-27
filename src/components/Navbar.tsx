import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Database, 
  LayoutDashboard, 
  BarChart3, 
  Menu, 
  X, 
  BookOpen, 
  LogOut, 
  User,
  Download,
  LineChart,
  Clock,
  Calendar
} from "lucide-react";
import { useAuth } from './AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';

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
  const { user, signOut } = useAuth();

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

  const handleSignOut = () => {
    signOut();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

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
          <NavItem
            to="/blog"
            icon={BookOpen}
            label="Blog"
            isActive={location.pathname === '/blog'}
          />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user?.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* User Stats */}
                <div className="px-2 py-1.5">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="font-medium">{user.stats.datasetsDownloaded}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Dashboards:</span>
                      <span className="font-medium">{user.stats.dashboardsCreated}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last active:</span>
                      <span className="font-medium">{formatDate(user.stats.lastActive)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Joined:</span>
                      <span className="font-medium">{formatDate(user.stats.joinedDate)}</span>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
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
            <Link to="/blog" className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              {user?.isAuthenticated ? (
                <>
                  {/* Mobile User Stats */}
                  <div className="p-2 space-y-2 bg-muted rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Downloads:</span>
                        <span className="font-medium">{user.stats.datasetsDownloaded}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Dashboards:</span>
                        <span className="font-medium">{user.stats.dashboardsCreated}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;