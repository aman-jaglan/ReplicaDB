
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart2, 
  PieChart, 
  LineChart, 
  ScatterChart, 
  Activity, 
  Box, 
  Grid, 
  Map, 
  Network, 
  Radar, 
  TrendingUp, 
  TreeDeciduous, 
  GitBranch, // Replacing FlowParallel with GitBranch
  Fingerprint, 
  Layers, 
  Binary, 
  Boxes
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalyticsChartProps {
  type: string;
  title: string;
  xAxis: string;
  yAxis: string;
  data?: any[];
  theme?: 'light' | 'dark';
  customColors?: string[];
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  type, 
  title, 
  xAxis, 
  yAxis,
  data,
  theme = 'light',
  customColors,
  className
}) => {
  // Get the appropriate icon based on chart type
  const getChartIcon = () => {
    switch (type) {
      case 'bar':
      case 'bar-stacked':
      case 'bar-grouped':
        return <BarChart2 className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'line':
        return <LineChart className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'pie':
      case 'donut':
        return <PieChart className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'scatter':
        return <ScatterChart className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'histogram':
        return <Activity className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'boxplot':
        return <Box className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'heatmap':
        return <Grid className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'bubble':
        return <Boxes className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'violin':
        return <Activity className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'treemap':
        return <TreeDeciduous className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'sankey':
        return <GitBranch className="w-16 h-16 text-muted-foreground mb-2" />; // Using GitBranch instead
      case 'radar':
        return <Radar className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'choropleth':
        return <Map className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'pca':
        return <Fingerprint className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'regression':
        return <TrendingUp className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'clustering':
        return <Layers className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'decision-tree':
        return <Network className="w-16 h-16 text-muted-foreground mb-2" />;
      case 'feature-importance':
        return <Binary className="w-16 h-16 text-muted-foreground mb-2" />;
      default:
        return <BarChart2 className="w-16 h-16 text-muted-foreground mb-2" />;
    }
  };

  const getChartTypeLabel = () => {
    switch (type) {
      case 'bar': return 'Bar Chart';
      case 'bar-stacked': return 'Stacked Bar Chart';
      case 'bar-grouped': return 'Grouped Bar Chart';
      case 'line': return 'Line Chart';
      case 'pie': return 'Pie Chart';
      case 'donut': return 'Donut Chart';
      case 'scatter': return 'Scatter Plot';
      case 'histogram': return 'Histogram';
      case 'boxplot': return 'Box Plot';
      case 'heatmap': return 'Heatmap';
      case 'bubble': return 'Bubble Chart';
      case 'violin': return 'Violin Plot';
      case 'treemap': return 'Treemap';
      case 'sankey': return 'Sankey Diagram';
      case 'radar': return 'Radar Chart';
      case 'choropleth': return 'Choropleth Map';
      case 'pca': return 'PCA Visualization';
      case 'regression': return 'Regression Analysis';
      case 'clustering': return 'Clustering';
      case 'decision-tree': return 'Decision Tree';
      case 'feature-importance': return 'Feature Importance';
      default: return 'Chart';
    }
  };

  // Determine if the chart is an advanced type
  const isAdvancedChart = ['heatmap', 'bubble', 'violin', 'treemap', 'sankey', 'radar', 'choropleth'].includes(type);
  
  // Determine if the chart is an AI-driven visualization
  const isAIChart = ['pca', 'regression', 'clustering', 'decision-tree', 'feature-importance'].includes(type);

  return (
    <Card className={`overflow-hidden ${theme === 'dark' ? 'bg-gray-800 text-white' : ''} ${className}`}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-base flex items-center justify-between">
          <span>{title}</span>
          <div className="flex gap-1">
            {isAdvancedChart && (
              <Badge variant="secondary" className="text-xs">Advanced</Badge>
            )}
            {isAIChart && (
              <Badge variant="outline" className="text-xs">AI-Driven</Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[300px]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {getChartIcon()}
            <p className="text-sm text-muted-foreground">
              {getChartTypeLabel()} of {yAxis} by {xAxis}
            </p>
            
            {isAIChart && (
              <div className="mt-3 px-4 text-center">
                <p className="text-xs text-muted-foreground italic">
                  {type === 'pca' && 'Principal components explaining 78% of variance'}
                  {type === 'regression' && 'R² = 0.87, p < 0.001'}
                  {type === 'clustering' && '3 clusters identified'}
                  {type === 'decision-tree' && 'Tree depth: 4, Accuracy: 85%'}
                  {type === 'feature-importance' && 'Top 5 features shown by importance'}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
