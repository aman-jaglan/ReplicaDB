
import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Search
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define the CSV data structure
interface CSVData {
  headers: string[];
  rows: string[][];
  originalRows: string[][];
}

const Analytics = () => {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [activeView, setActiveView] = useState("table");
  const [uploadStage, setUploadStage] = useState<"initial" | "uploaded" | "processing">("initial");
  const [loading, setLoading] = useState(false);
  const [filterColumn, setFilterColumn] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [excludeNull, setExcludeNull] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setUploadStage("processing");

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        const headers = lines[0].split(",").map(header => header.trim());
        
        // Parse the rows
        const rows = lines.slice(1)
          .filter(line => line.trim() !== "")
          .map(line => line.split(",").map(cell => cell.trim()));

        setCsvData({
          headers,
          rows: [...rows],
          originalRows: [...rows]
        });
        
        setUploadStage("uploaded");
        setSelectedColumns(headers);
        toast({
          title: "File Uploaded Successfully",
          description: `${file.name} has been processed. ${rows.length} rows and ${headers.length} columns found.`
        });
      } catch (error) {
        console.error("Error parsing CSV:", error);
        toast({
          title: "Error Parsing File",
          description: "There was an error processing your CSV file. Please check the format and try again.",
          variant: "destructive"
        });
        setUploadStage("initial");
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      toast({
        title: "Error Reading File",
        description: "There was an error reading your file. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
      setUploadStage("initial");
    };

    reader.readAsText(file);
  };

  // Apply filters to the data
  const applyFilters = () => {
    if (!csvData) return;

    let filteredRows = [...csvData.originalRows];

    // Filter by column value
    if (filterColumn && filterValue) {
      const columnIndex = csvData.headers.indexOf(filterColumn);
      filteredRows = filteredRows.filter(row => 
        row[columnIndex]?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Filter out null/empty values
    if (excludeNull) {
      filteredRows = filteredRows.filter(row => !row.some(cell => cell === "" || cell === "null" || cell === "undefined"));
    }

    // Apply column selection
    if (selectedColumns.length < csvData.headers.length) {
      const selectedIndices = selectedColumns.map(col => csvData.headers.indexOf(col));
      filteredRows = filteredRows.map(row => 
        selectedIndices.map(index => row[index])
      );

      setCsvData({
        headers: selectedColumns,
        rows: filteredRows,
        originalRows: csvData.originalRows
      });
    } else {
      setCsvData({
        ...csvData,
        rows: filteredRows
      });
    }

    toast({
      title: "Filters Applied",
      description: `Showing ${filteredRows.length} of ${csvData.originalRows.length} rows after filtering.`
    });
  };

  // Reset filters
  const resetFilters = () => {
    if (!csvData) return;
    
    setCsvData({
      headers: csvData.headers,
      rows: [...csvData.originalRows],
      originalRows: csvData.originalRows
    });
    
    setFilterColumn(null);
    setFilterValue("");
    setExcludeNull(false);
    setSelectedColumns(csvData.headers);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared and data has been reset to its original state."
    });
  };

  // Toggle column selection
  const toggleColumnSelection = (column: string) => {
    if (selectedColumns.includes(column)) {
      // Don't allow deselecting the last column
      if (selectedColumns.length === 1) return;
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  // Download processed data
  const downloadProcessedData = () => {
    if (!csvData) return;
    
    // Create CSV content
    const csvContent = [
      csvData.headers.join(','),
      ...csvData.rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'processed_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your processed data is being downloaded as processed_data.csv"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="mb-2">Data Analytics</h1>
            <p className="text-muted-foreground mb-8">
              Upload your CSV data for analysis, visualization, and processing
            </p>

            {uploadStage === "initial" && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-muted rounded-lg">
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-medium mb-2">Upload Your CSV Data</h2>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      Upload your CSV file to analyze, visualize, and process your data. 
                      You can filter, clean, and transform your data before analysis.
                    </p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Select CSV File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {uploadStage === "processing" && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12">
                    <RefreshCw className="w-12 h-12 text-primary mb-4 animate-spin" />
                    <h2 className="text-xl font-medium mb-2">Processing Your Data</h2>
                    <p className="text-muted-foreground text-center">
                      Please wait while we process your CSV file...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {uploadStage === "uploaded" && csvData && (
              <>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="w-full md:w-3/4">
                    <Card>
                      <CardContent className="p-0">
                        <Tabs defaultValue="table" className="w-full" onValueChange={setActiveView}>
                          <div className="flex items-center justify-between border-b border-border p-4">
                            <TabsList>
                              <TabsTrigger value="table" className="flex items-center gap-1">
                                <TableIcon className="w-4 h-4" />
                                Table View
                              </TabsTrigger>
                              <TabsTrigger value="chart" className="flex items-center gap-1">
                                <BarChart2 className="w-4 h-4" />
                                Chart View
                              </TabsTrigger>
                            </TabsList>
                            
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={downloadProcessedData}
                                className="flex items-center gap-1.5"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Export
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setUploadStage("initial");
                                  setCsvData(null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                                className="flex items-center gap-1.5"
                              >
                                <X className="w-3.5 h-3.5" />
                                Clear
                              </Button>
                            </div>
                          </div>
                          
                          <TabsContent value="table" className="m-0">
                            <div className="overflow-auto max-h-[60vh]">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    {csvData.headers.map((header, index) => (
                                      <TableHead key={index} className="font-semibold">
                                        {header}
                                      </TableHead>
                                    ))}
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {csvData.rows.slice(0, 100).map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                      {row.map((cell, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                          {cell || <span className="text-muted-foreground italic">null</span>}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            {csvData.rows.length > 100 && (
                              <div className="p-3 text-xs text-center text-muted-foreground border-t border-border">
                                Showing 100 of {csvData.rows.length} rows
                              </div>
                            )}
                          </TabsContent>
                          
                          <TabsContent value="chart" className="m-0">
                            <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
                              {csvData.rows.length > 0 ? (
                                <div className="text-center">
                                  <BarChart2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                  <h3 className="text-lg font-medium mb-2">Chart Visualization</h3>
                                  <p className="text-muted-foreground mb-4">
                                    Select columns in the side panel to visualize your data
                                  </p>
                                  <Button>Create Visualization</Button>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <p className="text-muted-foreground">No data available for visualization</p>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                    
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <div>
                        {csvData.rows.length} rows × {csvData.headers.length} columns
                      </div>
                      <div>
                        {csvData.rows.length !== csvData.originalRows.length && (
                          <span className="text-primary">
                            Filtered: {csvData.rows.length} of {csvData.originalRows.length} rows
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/4">
                    <Card className="mb-4">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Filter className="w-4 h-4 mr-1.5" /> 
                          Data Filters
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs mb-1.5 block text-muted-foreground">
                              Filter by Column
                            </label>
                            <select 
                              className="w-full rounded-md border border-input px-3 py-1.5 text-sm"
                              value={filterColumn || ""}
                              onChange={(e) => setFilterColumn(e.target.value || null)}
                            >
                              <option value="">Select column</option>
                              {csvData.headers.map((header, index) => (
                                <option key={index} value={header}>{header}</option>
                              ))}
                            </select>
                          </div>
                          
                          {filterColumn && (
                            <div>
                              <label className="text-xs mb-1.5 block text-muted-foreground">
                                Filter Value
                              </label>
                              <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Enter filter value"
                                  className="pl-8"
                                  value={filterValue}
                                  onChange={(e) => setFilterValue(e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="exclude-null" 
                              checked={excludeNull}
                              onCheckedChange={(checked) => setExcludeNull(checked === true)}
                            />
                            <label 
                              htmlFor="exclude-null" 
                              className="text-sm leading-tight cursor-pointer"
                            >
                              Exclude null/empty values
                            </label>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={applyFilters}
                            >
                              Apply Filters
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={resetFilters}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <AlignLeft className="w-4 h-4 mr-1.5" /> 
                          Column Selection
                        </h3>
                        
                        <div className="max-h-[300px] overflow-y-auto pr-1">
                          {csvData.headers.map((header, index) => (
                            <div key={index} className="flex items-center space-x-2 py-1.5">
                              <Checkbox 
                                id={`column-${index}`} 
                                checked={selectedColumns.includes(header)}
                                onCheckedChange={() => toggleColumnSelection(header)}
                                disabled={selectedColumns.length === 1 && selectedColumns.includes(header)}
                              />
                              <label 
                                htmlFor={`column-${index}`} 
                                className="text-sm leading-none cursor-pointer truncate"
                              >
                                {header}
                              </label>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={applyFilters}
                        >
                          Apply Column Selection
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
