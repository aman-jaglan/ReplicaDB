
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  FileText,
  Download,
  Lock,
  Unlock,
  BarChart2,
  Tag,
  Briefcase,
  Stethoscope,
  ShoppingCart,
  GraduationCap,
  Globe,
  ChevronDown,
} from "lucide-react";
import DataCard, { Dataset } from "../components/DataCard";

// Sample datasets for demonstration
const fakeDatasets: Dataset[] = [
  {
    id: "1",
    title: "US Stock Market Data",
    description:
      "Historical daily prices and volumes of all US stocks and ETFs trading on NYSE, NASDAQ, and AMEX.",
    tags: ["Finance", "Stocks", "Free"],
    rows: 15000000,
    columns: 7,
    created: "2023-10-15",
    fileSize: "2.3 GB",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: "2",
    title: "Financial Statement Fundamentals",
    description:
      "Comprehensive database of financial statements from public companies, including income statements, balance sheets, and cash flow statements.",
    tags: ["Finance", "Accounting", "Paid"],
    rows: 500000,
    columns: 120,
    created: "2023-11-20",
    fileSize: "4.7 GB",
    imageUrl: "https://images.unsplash.com/photo-1638913662735-a13cfc1dd8d4",
  },
  {
    id: "3",
    title: "US Healthcare Claims",
    description:
      "Anonymized healthcare claims data from US insurance providers, including diagnosis codes, procedures, and costs.",
    tags: ["Healthcare", "Insurance", "Paid"],
    rows: 8500000,
    columns: 35,
    created: "2023-09-05",
    fileSize: "12.1 GB",
    imageUrl: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
  },
  {
    id: "4",
    title: "Global COVID-19 Dataset",
    description:
      "Comprehensive COVID-19 data including cases, deaths, tests, and vaccinations by country and region.",
    tags: ["Healthcare", "Epidemiology", "Free"],
    rows: 250000,
    columns: 22,
    created: "2023-12-01",
    fileSize: "450 MB",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
  },
  {
    id: "5",
    title: "E-Commerce Sales Transactions",
    description:
      "Anonymous e-commerce transaction data with customer behavior, product details, and sales metrics.",
    tags: ["Retail", "E-Commerce", "Paid"],
    rows: 3500000,
    columns: 18,
    created: "2023-08-15",
    fileSize: "2.8 GB",
    imageUrl: "https://images.unsplash.com/photo-1511296265581-c2450046447d",
  },
  {
    id: "6",
    title: "Global Weather Patterns",
    description:
      "Historical weather data from thousands of stations worldwide, including temperature, precipitation, and wind measurements.",
    tags: ["Environment", "Climate", "Free"],
    rows: 12000000,
    columns: 12,
    created: "2023-07-10",
    fileSize: "8.5 GB",
    imageUrl: "https://images.unsplash.com/photo-1532178910-7815d6919572",
  },
];

// Categories with their respective icons
const categories = [
  { id: "finance", name: "Finance", icon: Briefcase },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope },
  { id: "retail", name: "Retail", icon: ShoppingCart },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "global", name: "Global", icon: Globe },
];

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>(fakeDatasets);
  const [showFilters, setShowFilters] = useState(false);

  // Handle search and filtering
  const handleSearch = () => {
    let results = fakeDatasets;

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (dataset) =>
          dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      results = results.filter((dataset) =>
        dataset.tags.some((tag) =>
          selectedCategories.some(
            (category) => category.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    // Filter by payment type (free or paid)
    if (selectedPaymentTypes.length > 0) {
      results = results.filter((dataset) =>
        dataset.tags.some((tag) =>
          selectedPaymentTypes.some(
            (type) => type.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    setFilteredDatasets(results);
  };

  // Handle dataset interactions
  const handleViewDataset = (dataset: Dataset) => {
    console.log("Viewing dataset:", dataset.title);
    // Implement view functionality
  };

  const handleDownloadDataset = (dataset: Dataset) => {
    console.log("Downloading dataset:", dataset.title);
    // Implement download functionality
  };

  const handleAnalyzeDataset = (dataset: Dataset) => {
    console.log("Analyzing dataset:", dataset.title);
    // Implement analyze functionality
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle payment type selection
  const togglePaymentType = (type: string) => {
    setSelectedPaymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero section */}
        <div className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-4">Discover Datasets</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Explore our curated collection of datasets from various domains and
                find the perfect data for your research or analysis needs.
              </p>

              {/* Search bar */}
              <div className="flex gap-2 max-w-xl mx-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    className="pl-9 h-11"
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button className="h-11" onClick={handleSearch}>
                  Search
                </Button>
                <Button
                  variant="outline"
                  className="h-11"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="mt-6 bg-background rounded-lg p-6 shadow-soft max-w-2xl mx-auto animate-slide-down text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.name)}
                                onCheckedChange={() => toggleCategory(category.name)}
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="flex items-center text-sm font-medium cursor-pointer"
                              >
                                <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                                {category.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">License Type</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type-free"
                            checked={selectedPaymentTypes.includes("Free")}
                            onCheckedChange={() => togglePaymentType("Free")}
                          />
                          <label
                            htmlFor="type-free"
                            className="flex items-center text-sm font-medium cursor-pointer"
                          >
                            <Unlock className="w-4 h-4 mr-2 text-muted-foreground" />
                            Free Datasets
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type-paid"
                            checked={selectedPaymentTypes.includes("Paid")}
                            onCheckedChange={() => togglePaymentType("Paid")}
                          />
                          <label
                            htmlFor="type-paid"
                            className="flex items-center text-sm font-medium cursor-pointer"
                          >
                            <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                            Paid Datasets
                          </label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-3">File Size</h3>
                        {/* Size range filter could be added here */}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedPaymentTypes([]);
                        setSearchQuery("");
                        setFilteredDatasets(fakeDatasets);
                      }}
                    >
                      Reset
                    </Button>
                    <Button size="sm" onClick={handleSearch}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Datasets section */}
        <div className="container mx-auto px-4 py-10">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Datasets</TabsTrigger>
                <TabsTrigger value="free">Free</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>

              <div className="text-sm text-muted-foreground">
                Showing {filteredDatasets.length} datasets
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDatasets.map((dataset) => (
                  <DataCard
                    key={dataset.id}
                    dataset={dataset}
                    onView={handleViewDataset}
                    onDownload={handleDownloadDataset}
                    onAnalyze={handleAnalyzeDataset}
                  />
                ))}
              </div>
              {filteredDatasets.length === 0 && (
                <div className="text-center py-20">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No datasets found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find more datasets.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="free" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDatasets
                  .filter((dataset) =>
                    dataset.tags.some((tag) => tag.toLowerCase() === "free")
                  )
                  .map((dataset) => (
                    <DataCard
                      key={dataset.id}
                      dataset={dataset}
                      onView={handleViewDataset}
                      onDownload={handleDownloadDataset}
                      onAnalyze={handleAnalyzeDataset}
                    />
                  ))}
              </div>
              {filteredDatasets.filter((dataset) =>
                dataset.tags.some((tag) => tag.toLowerCase() === "free")
              ).length === 0 && (
                <div className="text-center py-20">
                  <Unlock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No free datasets found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find free datasets.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="paid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDatasets
                  .filter((dataset) =>
                    dataset.tags.some((tag) => tag.toLowerCase() === "paid")
                  )
                  .map((dataset) => (
                    <DataCard
                      key={dataset.id}
                      dataset={dataset}
                      onView={handleViewDataset}
                      onDownload={handleDownloadDataset}
                      onAnalyze={handleAnalyzeDataset}
                    />
                  ))}
              </div>
              {filteredDatasets.filter((dataset) =>
                dataset.tags.some((tag) => tag.toLowerCase() === "paid")
              ).length === 0 && (
                <div className="text-center py-20">
                  <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No paid datasets found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find paid datasets.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Featured collections */}
        <div className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-medium mb-8">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-medium transition-shadow"
                    onClick={() => {
                      setSelectedCategories([category.name]);
                      handleSearch();
                    }}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {
                          fakeDatasets.filter((d) =>
                            d.tags.some(
                              (t) => t.toLowerCase() === category.name.toLowerCase()
                            )
                          ).length
                        }{" "}
                        datasets
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discovery;
