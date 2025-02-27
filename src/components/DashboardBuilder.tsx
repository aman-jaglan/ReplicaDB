import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, ChevronDown, Grid, Layout, LayoutDashboard, Plus, Save, Share2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnalyticsChart from "./AnalyticsChart";

interface DashboardBuilderProps {
  data: any[];
  title?: string;
}

interface DashboardItem {
  id: string;
  type: "chart" | "metric" | "table";
  title: string;
  chartType?: "bar" | "line" | "pie" | "area";
  xAxis?: string;
  yAxis?: string;
  size: "small" | "medium" | "large" | "full";
}

const DashboardBuilder = ({ data, title = "Custom Dashboard" }: DashboardBuilderProps) => {
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [dashboardTitle, setDashboardTitle] = useState(title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { toast } = useToast();

  // Get available columns from data
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const numericColumns = data.length > 0 
    ? columns.filter(column => typeof data[0][column] === "number") 
    : [];

  const addChart = (type: "bar" | "line" | "pie" | "area") => {
    if (numericColumns.length === 0) {
      toast({
        title: "Cannot add chart",
        description: "No numeric columns found in the data",
        variant: "destructive"
      });
      return;
    }

    const newItem: DashboardItem = {
      id: `item-${Date.now()}`,
      type: "chart",
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      chartType: type,
      xAxis: columns[0],
      yAxis: numericColumns[0],
      size: "medium"
    };

    setDashboardItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setDashboardItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItemTitle = (id: string, title: string) => {
    setDashboardItems(prev => 
      prev.map(item => item.id === id ? { ...item, title } : item)
    );
  };

  const updateItemSize = (id: string, size: "small" | "medium" | "large" | "full") => {
    setDashboardItems(prev => 
      prev.map(item => item.id === id ? { ...item, size } : item)
    );
  };

  const updateChartConfig = (
    id: string, 
    updates: {
      chartType?: "bar" | "line" | "pie" | "area";
      xAxis?: string;
      yAxis?: string;
    }
  ) => {
    setDashboardItems(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small": return "col-span-1";
      case "medium": return "col-span-2";
      case "large": return "col-span-3";
      case "full": return "col-span-full";
      default: return "col-span-2";
    }
  };

  const saveDashboard = () => {
    // In a real application, this would save to a database
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard configuration has been saved",
    });
  };

  const shareDashboard = () => {
    // In a real application, this would generate a sharing link
    toast({
      title: "Dashboard Shared",
      description: "Shareable link has been copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={dashboardTitle}
                onChange={(e) => setDashboardTitle(e.target.value)}
                className="text-xl font-bold h-10"
                autoFocus
              />
              <Button 
                size="sm" 
                onClick={() => setIsEditingTitle(false)}
              >
                Save
              </Button>
            </div>
          ) : (
            <h2 
              className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setIsEditingTitle(true)}
            >
              {dashboardTitle}
            </h2>
          )}
          <p className="text-muted-foreground">
            Build your custom analytics dashboard
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Visualization
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => addChart("bar")}>
                <BarChart2 className="mr-2 h-4 w-4" />
                Bar Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addChart("line")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L8.5 6.5L14 12L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Line Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addChart("area")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L8.5 6.5L14 12L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12L8.5 6.5L14 12L21 5V19H3V12Z" fill="currentColor" fillOpacity="0.2"/>
                </svg>
                Area Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addChart("pie")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 12L12 3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 12L18 15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Pie Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" onClick={saveDashboard}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          
          <Button variant="outline" onClick={shareDashboard}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      {dashboardItems.length === 0 ? (
        <Card className="h-64 flex flex-col items-center justify-center">
          <div className="text-center p-6">
            <LayoutDashboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your Dashboard is Empty</h3>
            <p className="text-muted-foreground mb-4">
              Click "Add Visualization" to start building your dashboard
            </p>
            <Button onClick={() => addChart("bar")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Chart
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {dashboardItems.map((item) => (
            <Card 
              key={item.id} 
              className={`${getSizeClass(item.size)} transition-all duration-300 h-auto`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Input
                    value={item.title}
                    onChange={(e) => updateItemTitle(item.id, e.target.value)}
                    className="font-medium border-0 px-0 h-8 focus-visible:ring-0 text-base"
                  />
                  <div className="flex gap-1">
                    <Select 
                      value={item.size}
                      onValueChange={(value) => updateItemSize(item.id, value as any)}
                    >
                      <SelectTrigger className="h-8 w-[80px]">
                        <Grid className="h-4 w-4" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {item.type === "chart" && (
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <Select 
                        value={item.chartType}
                        onValueChange={(value) => updateChartConfig(item.id, { chartType: value as any })}
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {item.chartType !== "pie" && (
                        <>
                          <Select 
                            value={item.xAxis}
                            onValueChange={(value) => updateChartConfig(item.id, { xAxis: value })}
                          >
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="X Axis" />
                            </SelectTrigger>
                            <SelectContent>
                              {columns.map(column => (
                                <SelectItem key={column} value={column}>{column}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            value={item.yAxis}
                            onValueChange={(value) => updateChartConfig(item.id, { yAxis: value })}
                          >
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Y Axis" />
                            </SelectTrigger>
                            <SelectContent>
                              {numericColumns.map(column => (
                                <SelectItem key={column} value={column}>{column}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </>
                      )}
                      
                      {item.chartType === "pie" && (
                        <Select 
                          value={item.xAxis}
                          onValueChange={(value) => updateChartConfig(item.id, { xAxis: value })}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {columns.map(column => (
                              <SelectItem key={column} value={column}>{column}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    
                    <AnalyticsChart
                      data={data}
                      title=""
                      type={item.chartType || "bar"}
                      xAxis={item.xAxis || columns[0]}
                      yAxis={item.yAxis || numericColumns[0]}
                      height={200}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardBuilder;