import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, FileType, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Papa from 'papaparse';

interface FileUploadZoneProps {
  onFileAccepted: (data: any[]) => void;
  maxSizeMB?: number;
}

const FileUploadZone = ({
  onFileAccepted,
  maxSizeMB = 10
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setError(null);

    // Check file extension
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.csv')) {
      setError("Please upload a CSV file");
      toast({
        title: "Invalid File Format",
        description: "Only CSV files are accepted",
        variant: "destructive"
      });
      return;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB`);
      toast({
        title: "File Too Large",
        description: `Maximum file size is ${maxSizeMB}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`,
        variant: "destructive"
      });
      return;
    }

    // Process CSV file
    setIsLoading(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true, // Convert numeric values to numbers
      skipEmptyLines: true,
      complete: (results) => {
        setIsLoading(false);

        if (results.errors.length > 0) {
          setError("Error parsing CSV file");
          toast({
            title: "Parse Error",
            description: results.errors[0].message,
            variant: "destructive"
          });
          return;
        }

        // Check if we have valid data
        if (results.data.length === 0) {
          setError("The CSV file has no data");
          toast({
            title: "Empty Data",
            description: "The CSV file doesn't contain any rows of data",
            variant: "destructive"
          });
          return;
        }

        onFileAccepted(results.data);
        toast({
          title: "File Uploaded",
          description: `Successfully loaded ${results.data.length} rows of data`,
        });

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      error: (error) => {
        setIsLoading(false);
        setError("Error parsing CSV file");
        toast({
          title: "Parse Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <h3 className="font-medium mb-2">Processing File...</h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we parse your CSV file
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <AlertCircle className="w-10 h-10 text-destructive mb-4" />
          <h3 className="font-medium mb-2">Upload Error</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null);
              fileInputRef.current?.click();
            }}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">
            {isDragging ? 'Drop Your CSV File Here' : 'Upload Your CSV File'}
          </h3>
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            Drag and drop your CSV file here, or click the button below to select a file from your computer.
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileInput}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <FileType className="mr-2 h-4 w-4" />
            Select CSV File
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Maximum file size: {maxSizeMB}MB
          </p>
        </>
      )}
    </div>
  );
};

export default FileUploadZone;