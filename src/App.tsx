
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discovery from "./pages/Discovery";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/synthesizer" element={<Synthesizer />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
