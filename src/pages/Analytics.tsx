import { useState } from "react";
import {
  Upload,
  FileText,
  Filter,
  Table as TableIcon,
  BarChart2,
  PieChart,
  LineChart,
  RefreshCw,
  X,
  AlignLeft,
  Download,
  Search,
  ScatterChart,
  MapPin,
  ChevronsUpDown,
  TrendingUp,
  Lightbulb,
  Share2,
  FileCode,
  Calculator,
  Sigma,
  Palette,
  BarChart,
  Plus,
  Trash2,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  ClipboardList,
  ChevronDown,
  Copy,
  Box,
  Activity,
  Grid,
  Map,
  Network,
  Radar,
  TreeDeciduous,
  GitBranch,
  Fingerprint,
  Binary,
  Boxes,
  Calendar
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import DataPreview from "@/components/DataPreview";
import AnalyticsChart from "@/components/AnalyticsChart";
import DataCleaner from "@/components/DataCleaner";
import DashboardBuilder from "@/components/DashboardBuilder";

interface DataRow {
  [key: string]: string | number;
}

const Analytics = () => {
  const [activeStep, setActiveStep] = useState<'upload' | 'clean' | 'visualize' | 'dashboard'>('upload');
  const [uploadedData, setUploadedData] = useState<DataRow[]>([]);
  const [cleanedData, setCleanedData] = useState<DataRow[]>([]);
  const [metrics, setMetrics] = useState<Array<{
    title: string;
    value: string;
    icon: React.ReactNode;
  }>>([]);
  const { toast } = useToast();

  const calculateMetrics = (data: DataRow[]) => {
    if (!data.length) return [];

    const numericColumns = Object.keys(data[0]).filter(key =>
      typeof data[0][key] === 'number'
    );

    return numericColumns.slice(0, 4).map(column => {
      const values = data.map(row => Number(row[column]));
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;

      return {
        title: column,
        value: avg.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        icon: <Calculator className="h-6 w-6" />
      };
    });
  };

  const handleDataUpload = (data: DataRow[]) => {
    setUploadedData(data);
    setCleanedData(data);
    const newMetrics = calculateMetrics(data);
    setMetrics(newMetrics);

    toast({
      title: "Data Uploaded",
      description: `Successfully loaded ${data.length} rows of data`,
    });

    setActiveStep('clean');
  };

  const handleDataCleaned = (data: DataRow[]) => {
    setCleanedData(data);
    const newMetrics = calculateMetrics(data);
    setMetrics(newMetrics);

    toast({
      title: "Data Cleaned",
      description: `${data.length} rows of clean data ready for analysis`,
    });

    setActiveStep('visualize');
  };

  const handleDelete = () => {
    setUploadedData([]);
    setCleanedData([]);
    setMetrics([]);
    setActiveStep('upload');

    toast({
      title: "Data Cleared",
      description: "All data has been removed",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Analyze and visualize your data</p>
            </div>
            <div className="flex gap-2">
              {uploadedData.length > 0 && (
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Data
                </Button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          {uploadedData.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <div
                  className={`flex flex-col items-center cursor-pointer ${activeStep === 'upload' ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => uploadedData.length > 0 && setActiveStep('upload')}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep === 'upload' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-sm font-medium">Upload</span>
                </div>

                <div className={`w-24 h-1 ${activeStep === 'upload' ? 'bg-muted' : 'bg-primary'}`} />

                <div
                  className={`flex flex-col items-center cursor-pointer ${activeStep === 'clean' ? 'text-primary' : activeStep === 'upload' ? 'text-muted-foreground' : 'text-muted-foreground'}`}
                  onClick={() => uploadedData.length > 0 && setActiveStep('clean')}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep === 'clean' ? 'bg-primary text-primary-foreground' : activeStep === 'upload' ? 'bg-muted' : 'bg-primary/30'}`}>
                    <Filter className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-sm font-medium">Clean</span>
                </div>

                <div className={`w-24 h-1 ${activeStep === 'upload' || activeStep === 'clean' ? 'bg-muted' : 'bg-primary'}`} />

                <div
                  className={`flex flex-col items-center cursor-pointer ${activeStep === 'visualize' ? 'text-primary' : activeStep === 'dashboard' ? 'text-muted-foreground' : 'text-muted-foreground'}`}
                  onClick={() => cleanedData.length > 0 && setActiveStep('visualize')}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep === 'visualize' ? 'bg-primary text-primary-foreground' : activeStep === 'dashboard' ? 'bg-primary/30' : 'bg-muted'}`}>
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-sm font-medium">Visualize</span>
                </div>

                <div className={`w-24 h-1 ${activeStep === 'dashboard' ? 'bg-primary' : 'bg-muted'}`} />

                <div
                  className={`flex flex-col items-center cursor-pointer ${activeStep === 'dashboard' ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => cleanedData.length > 0 && setActiveStep('dashboard')}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep === 'dashboard' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-sm font-medium">Dashboard</span>
                </div>
              </div>
            </div>
          )}

          {/* Upload Step */}
          {activeStep === 'upload' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Data Upload</CardTitle>
                <CardDescription>Upload your CSV file for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone onFileAccepted={handleDataUpload} />
              </CardContent>
            </Card>
          )}

          {/* Clean Step */}
          {activeStep === 'clean' && uploadedData.length > 0 && (
            <div className="space-y-8">
              {/* Key Metrics */}
              {metrics.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                      <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>{metric.title}</CardTitle>
                            <CardDescription>Average</CardDescription>
                          </div>
                          {metric.icon}
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{metric.value}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Data Preview */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
                <DataPreview data={uploadedData} />
              </section>

              {/* Data Cleaner */}
              <DataCleaner data={uploadedData} onDataCleaned={handleDataCleaned} />
            </div>
          )}

          {/* Visualize Step */}
          {activeStep === 'visualize' && cleanedData.length > 0 && (
            <div className="space-y-8">
              {/* Key Metrics */}
              {metrics.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                      <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>{metric.title}</CardTitle>
                            <CardDescription>Average</CardDescription>
                          </div>
                          {metric.icon}
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{metric.value}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* Data Preview */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Cleaned Data</h2>
                  <Button onClick={() => setActiveStep('dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Create Dashboard
                  </Button>
                </div>
                <DataPreview data={cleanedData} />
              </section>

              {/* Charts */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Visualizations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnalyticsChart
                    type="bar"
                    title="Bar Chart"
                    xAxis={Object.keys(cleanedData[0])[0]}
                    yAxis={Object.keys(cleanedData[0]).find(key => typeof cleanedData[0][key] === 'number') || Object.keys(cleanedData[0])[1]}
                    data={cleanedData}
                  />
                  <AnalyticsChart
                    type="line"
                    title="Line Chart"
                    xAxis={Object.keys(cleanedData[0])[0]}
                    yAxis={Object.keys(cleanedData[0]).find(key => typeof cleanedData[0][key] === 'number') || Object.keys(cleanedData[0])[1]}
                    data={cleanedData}
                  />
                  <AnalyticsChart
                    type="pie"
                    title="Pie Chart"
                    xAxis={Object.keys(cleanedData[0])[0]}
                    yAxis={Object.keys(cleanedData[0]).find(key => typeof cleanedData[0][key] === 'number') || Object.keys(cleanedData[0])[1]}
                    data={cleanedData}
                  />
                  <AnalyticsChart
                    type="area"
                    title="Area Chart"
                    xAxis={Object.keys(cleanedData[0])[0]}
                    yAxis={Object.keys(cleanedData[0]).find(key => typeof cleanedData[0][key] === 'number') || Object.keys(cleanedData[0])[1]}
                    data={cleanedData}
                  />
                </div>
              </section>
            </div>
          )}

          {/* Dashboard Step */}
          {activeStep === 'dashboard' && cleanedData.length > 0 && (
            <DashboardBuilder data={cleanedData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;