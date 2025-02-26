
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Move, Download, Settings, Copy, LayoutDashboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChartConfig {
  id: string;
  type: string;
  title: string;
  xAxis: string;
  yAxis: string;
  aggregation: string;
  filter?: string;
  color?: string;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  charts: ChartConfig[];
  created: Date;
  lastModified: Date;
}

interface DashboardBuilderProps {
  dashboard: Dashboard;
  onSave: (dashboard: Dashboard) => void;
  onCancel: () => void;
}

const DashboardBuilder = ({ dashboard, onSave, onCancel }: DashboardBuilderProps) => {
  const [editedDashboard, setEditedDashboard] = useState<Dashboard>({...dashboard});
  const [layout, setLayout] = useState<'grid' | 'rows'>('grid');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDashboard({
      ...editedDashboard,
      name: e.target.value
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDashboard({
      ...editedDashboard,
      description: e.target.value
    });
  };

  const removeChart = (chartId: string) => {
    setEditedDashboard({
      ...editedDashboard,
      charts: editedDashboard.charts.filter(chart => chart.id !== chartId)
    });
    
    toast({
      title: "Chart Removed",
      description: "The chart has been removed from your dashboard."
    });
  };

  const saveDashboard = () => {
    if (!editedDashboard.name.trim()) {
      toast({
        title: "Dashboard Name Required",
        description: "Please enter a name for your dashboard.",
        variant: "destructive"
      });
      return;
    }
    
    onSave({
      ...editedDashboard,
      lastModified: new Date()
    });
    
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard has been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">Dashboard Builder</h2>
          <p className="text-sm text-muted-foreground">
            Design and organize your analytics dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={saveDashboard}>Save Dashboard</Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Dashboard Name</label>
              <Input 
                className="mt-1" 
                value={editedDashboard.name} 
                onChange={handleNameChange}
                placeholder="My Analytics Dashboard" 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input 
                className="mt-1" 
                value={editedDashboard.description} 
                onChange={handleDescriptionChange}
                placeholder="A dashboard tracking key metrics and KPIs" 
              />
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Layout</h3>
              <div className="flex border rounded-md overflow-hidden">
                <button 
                  className={`px-3 py-1.5 text-sm ${layout === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}
                  onClick={() => setLayout('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm ${layout === 'rows' ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}
                  onClick={() => setLayout('rows')}
                >
                  Rows
                </button>
              </div>
            </div>
            
            {editedDashboard.charts.length > 0 ? (
              <div className={layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
                {editedDashboard.charts.map((chart) => (
                  <Card key={chart.id} className="border-dashed border-2 relative group">
                    <div className="absolute top-2 right-2 hidden group-hover:flex gap-1 bg-background/80 backdrop-blur-sm rounded p-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Move className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => removeChart(chart.id)}
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm">{chart.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 h-32 flex items-center justify-center bg-muted/30">
                      <p className="text-xs text-muted-foreground">
                        {chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} chart visualization
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <LayoutDashboard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Charts Added Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add charts from the Visualize tab to build your dashboard
                </p>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Chart
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={saveDashboard}>Save Dashboard</Button>
      </div>
    </div>
  );
};

export default DashboardBuilder;
