import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertCircle, ArrowRight, Check, PlusCircle, Sparkles, Trash2, WandSparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataCleanerProps {
  data: any[];
  onDataCleaned: (cleanedData: any[]) => void;
}

const DataCleaner = ({ data, onDataCleaned }: DataCleanerProps) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [transformations, setTransformations] = useState<{
    [column: string]: {
      rename?: string;
      fillNa?: string;
      removeOutliers?: boolean;
      convertType?: "string" | "number" | "boolean" | "date";
    };
  }>({});
  const { toast } = useToast();

  const columns = useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]);
  }, [data]);

  const columnStats = useMemo(() => {
    const stats: {
      [column: string]: {
        nullCount: number;
        uniqueCount: number;
        type: string;
        hasOutliers?: boolean;
        outlierCount?: number;
      };
    } = {};

    if (!data.length) return stats;

    columns.forEach(column => {
      const values = data.map(row => row[column]);
      const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== "");

      let type = typeof nonNullValues[0];
      if (nonNullValues.every(v => !isNaN(Number(v)))) {
        type = "number";
      }

      const uniqueValues = new Set(values);

      // Detect outliers for numeric columns
      let hasOutliers = false;
      let outlierCount = 0;

      if (type === "number") {
        const numericValues = nonNullValues.map(v => Number(v));
        // Simple IQR-based outlier detection
        numericValues.sort((a, b) => a - b);
        const q1 = numericValues[Math.floor(numericValues.length * 0.25)];
        const q3 = numericValues[Math.floor(numericValues.length * 0.75)];
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        outlierCount = numericValues.filter(v => v < lowerBound || v > upperBound).length;
        hasOutliers = outlierCount > 0;
      }

      stats[column] = {
        nullCount: values.length - nonNullValues.length,
        uniqueCount: uniqueValues.size,
        type,
        hasOutliers,
        outlierCount
      };
    });

    return stats;
  }, [data, columns]);

  const handleColumnToggle = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const handleColumnRename = (column: string, newName: string) => {
    setTransformations(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        rename: newName
      }
    }));
  };

  const handleFillNa = (column: string, value: string) => {
    setTransformations(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        fillNa: value
      }
    }));
  };

  const handleRemoveOutliers = (column: string, remove: boolean) => {
    setTransformations(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        removeOutliers: remove
      }
    }));
  };

  const handleConvertType = (column: string, type: "string" | "number" | "boolean" | "date") => {
    setTransformations(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        convertType: type
      }
    }));
  };

  const applyTransformations = () => {
    let cleanedData = [...data];

    // Apply column selection (if any)
    if (selectedColumns.length > 0) {
      cleanedData = cleanedData.map(row => {
        const newRow: any = {};
        selectedColumns.forEach(column => {
          const originalColumn = Object.keys(transformations).find(
            col => transformations[col]?.rename === column
          ) || column;
          newRow[column] = row[originalColumn];
        });
        return newRow;
      });
    }

    // Apply transformations
    Object.entries(transformations).forEach(([column, transforms]) => {
      // Skip columns that weren't selected
      if (selectedColumns.length > 0 && !selectedColumns.includes(column) &&
          !selectedColumns.includes(transforms.rename || "")) {
        return;
      }

      // Convert type
      if (transforms.convertType) {
        cleanedData = cleanedData.map(row => {
          const newRow = { ...row };
          const targetColumn = transforms.rename || column;

          try {
            switch (transforms.convertType) {
              case "number":
                newRow[targetColumn] = Number(newRow[targetColumn]);
                break;
              case "string":
                newRow[targetColumn] = String(newRow[targetColumn]);
                break;
              case "boolean":
                newRow[targetColumn] = Boolean(newRow[targetColumn]);
                break;
              case "date":
                newRow[targetColumn] = new Date(newRow[targetColumn]).toISOString();
                break;
            }
          } catch (error) {
            // Handle conversion errors
            console.error(`Error converting ${targetColumn}:`, error);
          }

          return newRow;
        });
      }

      // Fill NA values
      if (transforms.fillNa) {
        cleanedData = cleanedData.map(row => {
          const newRow = { ...row };
          const targetColumn = transforms.rename || column;

          if (newRow[targetColumn] === null ||
              newRow[targetColumn] === undefined ||
              newRow[targetColumn] === "") {
            newRow[targetColumn] = transforms.fillNa;
          }

          return newRow;
        });
      }

      // Remove outliers for numeric columns
      if (transforms.removeOutliers && columnStats[column]?.type === "number") {
        const values = cleanedData.map(row => Number(row[column])).filter(v => !isNaN(v));
        values.sort((a, b) => a - b);

        const q1 = values[Math.floor(values.length * 0.25)];
        const q3 = values[Math.floor(values.length * 0.75)];
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        cleanedData = cleanedData.filter(row => {
          const value = Number(row[column]);
          return isNaN(value) || (value >= lowerBound && value <= upperBound);
        });
      }
    });

    // Apply column renaming
    if (Object.values(transformations).some(t => t.rename)) {
      cleanedData = cleanedData.map(row => {
        const newRow: any = {};
        Object.entries(row).forEach(([column, value]) => {
          const originalColumn = Object.keys(transformations).find(
            col => transformations[col]?.rename === column
          );

          if (originalColumn) {
            newRow[transformations[originalColumn]?.rename || column] = value;
          } else {
            const newName = transformations[column]?.rename;
            newRow[newName || column] = value;
          }
        });
        return newRow;
      });
    }

    onDataCleaned(cleanedData);

    toast({
      title: "Data Cleaning Complete",
      description: `${cleanedData.length} rows of data processed`,
    });
  };

  const autoClean = () => {
    const autoTransformations: typeof transformations = {};

    columns.forEach(column => {
      const stats = columnStats[column];

      // Auto-detect transformations
      const transforms: any = {};

      // Fill NA values for columns with some nulls (but not all)
      if (stats.nullCount > 0 && stats.nullCount < data.length) {
        if (stats.type === "number") {
          // Fill with median/mean for numeric columns
          const values = data
            .map(row => row[column])
            .filter(v => v !== null && v !== undefined && v !== "")
            .map(v => Number(v));

          const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
          transforms.fillNa = String(Math.round(mean * 100) / 100);
        } else {
          // Fill with mode or "Unknown" for non-numeric
          transforms.fillNa = "Unknown";
        }
      }

      // Remove outliers for numeric columns with outliers
      if (stats.type === "number" && stats.hasOutliers) {
        transforms.removeOutliers = true;
      }

      if (Object.keys(transforms).length > 0) {
        autoTransformations[column] = transforms;
      }
    });

    setTransformations(autoTransformations);

    toast({
      title: "Auto-Cleaning Ready",
      description: "Automatic transformations have been prepared. Click 'Apply Transformations' to execute.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Data Cleaning and Transformation
        </CardTitle>
        <CardDescription>
          Clean and transform your data before analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="select">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="select">Select Columns</TabsTrigger>
            <TabsTrigger value="transform">Transform Data</TabsTrigger>
            <TabsTrigger value="stats">Data Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Select columns to include in your analysis</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedColumns([])}
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedColumns([...columns])}
                  >
                    Select All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {columns.map(column => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox
                      id={`column-${column}`}
                      checked={selectedColumns.includes(column)}
                      onCheckedChange={() => handleColumnToggle(column)}
                    />
                    <Label htmlFor={`column-${column}`} className="flex-1 truncate">
                      {column}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transform" className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Apply transformations to your data</h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={autoClean}
                >
                  <WandSparkles className="mr-2 h-4 w-4" />
                  Auto-Clean
                </Button>
              </div>

              <div className="space-y-4">
                {columns.map(column => (
                  <Sheet key={column}>
                    <SheetTrigger asChild>
                      <div className="relative flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent">
                        <div>
                          <div className="font-medium">{column}</div>
                          <div className="text-xs text-muted-foreground">
                            {columnStats[column]?.type || "unknown"} • {columnStats[column]?.nullCount} nulls
                            {columnStats[column]?.hasOutliers && ` • ${columnStats[column]?.outlierCount} outliers`}
                          </div>
                        </div>

                        {transformations[column] && Object.keys(transformations[column]).length > 0 && (
                          <div className="absolute right-12 top-1/2 -translate-y-1/2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                              {Object.keys(transformations[column]).length}
                            </div>
                          </div>
                        )}

                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Transform Column: {column}</SheetTitle>
                        <SheetDescription>
                          Apply transformations to clean and prepare this column
                        </SheetDescription>
                      </SheetHeader>

                      <div className="py-6 space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor={`rename-${column}`}>Rename Column</Label>
                          <Input
                            id={`rename-${column}`}
                            placeholder="New column name"
                            value={transformations[column]?.rename || ""}
                            onChange={(e) => handleColumnRename(column, e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`fillna-${column}`}>Fill Missing Values</Label>
                          <Input
                            id={`fillna-${column}`}
                            placeholder="Replacement value"
                            value={transformations[column]?.fillNa || ""}
                            onChange={(e) => handleFillNa(column, e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            {columnStats[column]?.nullCount} missing values found
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Convert Data Type</Label>
                          <Select
                            value={transformations[column]?.convertType || ""}
                            onValueChange={(value) => handleConvertType(column, value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Convert to type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">No conversion</SelectItem>
                              <SelectItem value="string">Text (string)</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="boolean">Boolean (true/false)</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            Current type: {columnStats[column]?.type}
                          </p>
                        </div>

                        {columnStats[column]?.type === "number" && columnStats[column]?.hasOutliers && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`outliers-${column}`}
                              checked={!!transformations[column]?.removeOutliers}
                              onCheckedChange={(checked) =>
                                handleRemoveOutliers(column, checked as boolean)
                              }
                            />
                            <Label htmlFor={`outliers-${column}`}>
                              Remove outliers ({columnStats[column]?.outlierCount} detected)
                            </Label>
                          </div>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Data Quality Statistics</h3>

              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Column</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Unique Values</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Missing Values</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Issues</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {columns.map(column => (
                      <tr key={column}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{column}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">{columnStats[column]?.type || "unknown"}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          {columnStats[column]?.uniqueCount} / {data.length}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          {columnStats[column]?.nullCount} ({Math.round(columnStats[column]?.nullCount / data.length * 100)}%)
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          {columnStats[column]?.nullCount > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mr-1">
                              Missing Values
                            </span>
                          )}
                          {columnStats[column]?.hasOutliers && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Outliers
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onDataCleaned(data)}>
          Skip Cleaning
        </Button>
        <Button onClick={applyTransformations}>
          <Check className="mr-2 h-4 w-4" />
          Apply Transformations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataCleaner;