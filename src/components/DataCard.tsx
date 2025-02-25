
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2, Download, Eye, FileText } from "lucide-react";

export interface Dataset {
  id: string;
  title: string;
  description: string;
  tags: string[];
  rows: number;
  columns: number;
  created: string;
  fileSize: string;
  imageUrl?: string;
}

interface DataCardProps {
  dataset: Dataset;
  onView: (dataset: Dataset) => void;
  onDownload: (dataset: Dataset) => void;
  onAnalyze: (dataset: Dataset) => void;
}

const DataCard = ({ dataset, onView, onDownload, onAnalyze }: DataCardProps) => {
  // Determine if dataset is free or paid
  const isPaid = dataset.tags.some(tag => tag.toLowerCase() === 'paid');

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      {dataset.imageUrl ? (
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ backgroundImage: `url(${dataset.imageUrl})` }}
        >
          <div className="w-full h-full bg-black/30 p-4 flex items-end">
            <h3 className="text-white font-medium text-lg line-clamp-2">{dataset.title}</h3>
          </div>
        </div>
      ) : (
        <div className="h-40 bg-secondary/50 p-4 flex items-center justify-center">
          <FileText className="w-12 h-12 text-muted-foreground" />
        </div>
      )}
      
      <CardContent className="flex-grow p-4">
        {!dataset.imageUrl && <h3 className="font-medium text-lg mb-2">{dataset.title}</h3>}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {dataset.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {dataset.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant={tag.toLowerCase() === 'free' ? 'outline' : tag.toLowerCase() === 'paid' ? 'secondary' : 'default'}
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Rows</p>
            <p className="font-medium">{dataset.rows.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Columns</p>
            <p className="font-medium">{dataset.columns}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">{new Date(dataset.created).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="font-medium">{dataset.fileSize}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 gap-2 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1"
          onClick={() => onView(dataset)}
        >
          <Eye className="w-4 h-4 mr-1" /> View
        </Button>
        <Button 
          variant={isPaid ? "secondary" : "outline"} 
          size="sm" 
          className="flex-1"
          onClick={() => onDownload(dataset)}
        >
          <Download className="w-4 h-4 mr-1" /> {isPaid ? "Purchase" : "Download"}
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onAnalyze(dataset)}
        >
          <BarChart2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataCard;
