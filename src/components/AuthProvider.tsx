import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UserStats {
  datasetsDownloaded: number;
  dashboardsCreated: number;
  lastActive: string;
  joinedDate: string;
}

interface User {
  email: string;
  name?: string;
  isAuthenticated: boolean;
  stats: UserStats;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  updateUserStats: (stats: Partial<UserStats>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialUserStats = (): UserStats => ({
  datasetsDownloaded: 0,
  dashboardsCreated: 0,
  lastActive: new Date().toISOString(),
  joinedDate: new Date().toISOString()
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Ensure user has stats object
      if (!parsedUser.stats) {
        parsedUser.stats = getInitialUserStats();
      }
      setUser(parsedUser);

      // Update last active timestamp
      updateUserStats({ lastActive: new Date().toISOString() });
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API request
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        email,
        isAuthenticated: true,
        stats: getInitialUserStats()
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      // Redirect to the page the user was trying to access, or to home
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  const updateUserStats = (newStats: Partial<UserStats>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      stats: {
        ...user.stats,
        ...newStats
      }
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading, updateUserStats }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};