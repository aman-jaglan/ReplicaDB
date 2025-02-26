import { useEffect, useState } from "react";
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { InputPopover } from "@/components/input-popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTheme } from "@/hooks/use-theme";
import { ModeToggle } from "@/components/mode-toggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { setTheme } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [inputValue, setInputValue] = useState("");
  const [sliderValue, setSliderValue] = useState([50]);
  const [selectedRadio, setSelectedRadio] = useState("option1");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkTheme(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setIsDarkTheme(!isDarkTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Added functionality for various components
  const handleFileUpload = () => {
    toast({
      title: "File uploaded",
      description: "Your data file has been uploaded successfully",
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Item deleted",
      description: "The selected item has been removed",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lightbulb className="h-6 w-6" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Analytics insights</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ModeToggle />
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Advanced Filters</DrawerTitle>
                <DrawerDescription>Apply custom filters to your data</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 grid gap-4">
                <div>
                  <Label>Date Range</Label>
                  <DatePicker selected={date} onSelect={setDate} />
                </div>
                <div>
                  <Label>Data Types</Label>
                  <Checkbox
                    checked={checkedItems.includes("sales")}
                    onCheckedChange={(checked) =>
                      setCheckedItems(prev =>
                        checked ? [...prev, "sales"] : prev.filter(item => item !== "sales")
                      )
                    }
                  />
                  <Label className="ml-2">Sales Data</Label>
                </div>
                <Slider value={sliderValue} onValueChange={setSliderValue} />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                View Options
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Chart Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                <BarChart2 className="mr-2 h-4 w-4" />
                Bar Chart
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <ScatterChart className="mr-2 h-4 w-4" />
                Scatter Plot
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Data Section */}
        <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
          <ResizablePanel defaultSize={70}>
            <div className="pr-4">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Total Users", value: "1,234", icon: <GitBranch className="h-6 w-6" /> },
                    { title: "Revenue", value: "$4,567", icon: <Calculator className="h-6 w-6" /> },
                    { title: "Active Sessions", value: "876", icon: <Activity className="h-6 w-6" /> },
                    { title: "Conversion Rate", value: "12.4%", icon: <Sigma className="h-6 w-6" /> }
                  ].map((metric, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>{metric.title}</CardTitle>
                          <CardDescription>Last 30 days</CardDescription>
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

              <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">User Analytics</h2>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Select Date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                    <Button variant="outline" onClick={handleFileUpload}>
                      <Upload className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </div>
                </div>

                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={60}>
                    <Card>
                      <CardHeader>
                        <CardTitle>User Engagement</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="option1" id="option1" />
                              <Label htmlFor="option1">Daily</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="option2" id="option2" />
                              <Label htmlFor="option2">Weekly</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <LineChart className="h-64 w-full" />
                      </CardContent>
                    </Card>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={40}>
                    <Card className="ml-4">
                      <CardHeader>
                        <CardTitle>Data Summary</CardTitle>
                        <CardDescription>Key statistics overview</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Box className="mr-2 h-4 w-4" />
                            <span>Total Storage Used: 256GB</span>
                          </div>
                          <div className="flex items-center">
                            <Network className="mr-2 h-4 w-4" />
                            <span>Active Connections: 42</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </section>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <div className="pl-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Data Explorer</CardTitle>
                  <CardDescription>Interactive data table</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: 20 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>Category {index + 1}</TableCell>
                            <TableCell>{(Math.random() * 1000).toFixed(2)}</TableCell>
                            <TableCell>
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>

                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Additional Components Section */}
        <section className="mt-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Advanced Settings
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Label>Visualization Options</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">
                          <BarChart className="mr-2 h-4 w-4" />
                          Bar Chart
                        </SelectItem>
                        <SelectItem value="line">
                          <LineChart className="mr-2 h-4 w-4" />
                          Line Chart
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch id="data-labels" />
                      <Label htmlFor="data-labels">Show Data Labels</Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Additional Tools</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        Geospatial
                      </Button>
                      <Button variant="outline" size="sm">
                        <Radar className="mr-2 h-4 w-4" />
                        Radar Scan
                      </Button>
                    </div>
                    <Textarea placeholder="Enter custom analysis query..." />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;