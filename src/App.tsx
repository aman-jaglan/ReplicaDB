import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/AuthProvider";
import RequireAuth from "@/components/RequireAuth";
import Index from "./pages/Index";
import Discovery from "./pages/Discovery";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Placeholder pages (to be implemented)
const Synthesizer = () => (
  <div className="min-h-screen pt-20 px-4">
    <div className="container mx-auto py-8">
      <h1 className="mb-8">Data Synthesizer</h1>
      <p className="text-muted-foreground mb-4">
        Generate synthetic data based on your specifications. This page will be implemented soon.
      </p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route path="/discovery" element={<RequireAuth><Discovery /></RequireAuth>} />
              <Route path="/synthesizer" element={<RequireAuth><Synthesizer /></RequireAuth>} />
              <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
              <Route path="/blog" element={<RequireAuth><Blog /></RequireAuth>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;