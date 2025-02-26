
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  acceptedFormats?: string;
  maxSize?: number;
}

const FileUploader = ({ 
  onFileUpload, 
  acceptedFormats = ".csv", 
  maxSize = 10 
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      validateAndUploadFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndUploadFile(files[0]);
    }
  };

  const validateAndUploadFile = (file: File) => {
    // Check file format
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isAcceptedFormat = acceptedFormats.includes(`.${fileExt}`);
    
    if (!isAcceptedFormat) {
      toast({
        title: "Invalid File Format",
        description: `Only ${acceptedFormats} files are accepted.`,
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (MB)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast({
        title: "File Too Large",
        description: `Maximum file size is ${maxSize}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`,
        variant: "destructive"
      });
      return;
    }
    
    // Upload file
    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onFileUpload(file);
      setIsLoading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 1000);
  };

  return (
    <Card>
      <CardContent className="pt-6">
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
                Please wait while we upload and process your file
              </p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">
                {isDragging ? 'Drop Your File Here' : 'Upload Your File'}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Drag and drop your file here, or click the button below to select from your computer.
                Supported format{acceptedFormats.includes(',') ? 's' : ''}: {acceptedFormats}
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats}
                className="hidden"
                onChange={handleFileInput}
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                Select File
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Maximum file size: {maxSize}MB
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
