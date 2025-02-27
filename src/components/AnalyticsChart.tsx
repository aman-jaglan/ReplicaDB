import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Bar, 
  Line, 
  Pie, 
  Area, 
  Tooltip, 
  Legend, 
  Cell,
  CartesianGrid 
} from 'recharts';

interface AnalyticsChartProps {
  data: never[];
  title: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  xAxis: string;
  yAxis: string;
  colors?: string[];
  height?: number;
}

const defaultColors = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#06B6D4', // cyan-500
];

const AnalyticsChart = ({
  data,
  title,
  type: initialType,
  xAxis: initialXAxis,
  yAxis: initialYAxis,
  colors = defaultColors,
  height = 300
}: AnalyticsChartProps) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'area'>(initialType);
  const [xAxis, setXAxis] = useState(initialXAxis);
  const [yAxis, setYAxis] = useState(initialYAxis);

  const availableColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const numericColumns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
  }, [data]);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // For pie charts, we need to count occurrences
    if (chartType === 'pie') {
      const counts: Record<string, number> = {};
      data.forEach(item => {
        const value = String(item[xAxis] || 'Unknown');
        counts[value] = (counts[value] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }

    // For bar, line, and area charts
    return data.map(item => ({
      [xAxis]: item[xAxis],
      [yAxis]: item[yAxis],
    }));
  }, [data, xAxis, yAxis, chartType]);

  // Handle empty or invalid data
  if (!data || data.length === 0 || availableColumns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>No data available for visualization</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          No data to display
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {chartType === 'pie' 
                ? `Showing distribution of ${xAxis}` 
                : `${yAxis} by ${xAxis}`}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={chartType} onValueChange={(value) => setChartType(value as never)}>
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
            
            {chartType !== 'pie' && (
              <>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="X Axis" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColumns.map(column => (
                      <SelectItem key={column} value={column}>{column}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={yAxis} onValueChange={setYAxis}>
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
            
            {chartType === 'pie' && (
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {availableColumns.map(column => (
                    <SelectItem key={column} value={column}>{column}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'pie' ? (
  <PieChart>
    <Pie
      data={processedData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label={(entry) => entry.name}
    >
      {processedData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
) : chartType === 'bar' ? (
  <BarChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={xAxis} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey={yAxis} fill={colors[0]} />
  </BarChart>
) : chartType === 'line' ? (
  <LineChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={xAxis} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey={yAxis} stroke={colors[0]} activeDot={{ r: 8 }} />
  </LineChart>
) : (
  <AreaChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={xAxis} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Area type="monotone" dataKey={yAxis} stroke={colors[0]} fill={colors[0]} fillOpacity={0.3} />
  </AreaChart>
)}
            
            {chartType === 'pie' && (
              <PieChart>
                <Pie
                  data={processedData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => entry.name}
                >
                  {processedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;