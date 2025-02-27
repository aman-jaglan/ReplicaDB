import { Dataset } from "../components/DataCard";

// Interface for external dataset sources
interface DatasetSource {
  id: string;
  name: string;
  icon: string;
  url: string;
  description: string;
}

// Interface for dataset search parameters
interface DatasetSearchParams {
  query?: string;
  category?: string;
  limit?: number;
  page?: number;
  licenseType?: string;
}

// Define the available external dataset sources
export const datasetSources: DatasetSource[] = [
  {
    id: "kaggle",
    name: "Kaggle",
    icon: "https://www.kaggle.com/static/images/site-logo.png",
    url: "https://www.kaggle.com/datasets",
    description: "The world's largest data science community with powerful tools and resources to help you achieve your data science goals."
  },
  {
    id: "uci",
    name: "UCI Machine Learning Repository",
    icon: "https://archive.ics.uci.edu/static/assets/logo/cropped-logo.png",
    url: "https://archive.ics.uci.edu/",
    description: "Center for Machine Learning and Intelligent Systems at University of California, Irvine."
  },
  {
    id: "data-gov",
    name: "Data.gov",
    icon: "https://www.data.gov/wp-content/themes/roots-nextdatagov/assets/img/logo.svg",
    url: "https://data.gov/",
    description: "The U.S. Government's open data platform with over 300,000 datasets spanning across various domains."
  },
  {
    id: "google-dataset-search",
    name: "Google Dataset Search",
    icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    url: "https://datasetsearch.research.google.com/",
    description: "A search engine from Google that helps researchers locate online data that is freely available for use."
  },
  {
    id: "aws-open-data",
    name: "AWS Open Data Registry",
    icon: "https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_stacked.61d334f1a1a427ea597afa54be359ca5a5aaad5f.png",
    url: "https://registry.opendata.aws/",
    description: "A registry of public datasets available on AWS, making it easy to find datasets made available via AWS resources."
  }
];

// Function to fetch datasets from an external source
export const fetchExternalDatasets = async (
  sourceId: string,
  params: DatasetSearchParams = {}
): Promise<Dataset[]> => {
  // In a real implementation, this would make API calls to the respective services
  // For demonstration purposes, we're returning mock data

  console.log(`Fetching datasets from ${sourceId} with params:`, params);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock data based on the source
  switch (sourceId) {
    case "kaggle":
      return mockKaggleDatasets.filter(dataset =>
        !params.query ||
        dataset.title.toLowerCase().includes(params.query.toLowerCase()) ||
        dataset.description.toLowerCase().includes(params.query.toLowerCase())
      ).slice(0, params.limit || 10);

    case "uci":
      return mockUCIDatasets.filter(dataset =>
        !params.query ||
        dataset.title.toLowerCase().includes(params.query.toLowerCase()) ||
        dataset.description.toLowerCase().includes(params.query.toLowerCase())
      ).slice(0, params.limit || 10);

    case "data-gov":
      return mockDataGovDatasets.filter(dataset =>
        !params.query ||
        dataset.title.toLowerCase().includes(params.query.toLowerCase()) ||
        dataset.description.toLowerCase().includes(params.query.toLowerCase())
      ).slice(0, params.limit || 10);

    default:
      return [];
  }
};

// Function to search across all integrated sources
export const searchAllDatasets = async (
  params: DatasetSearchParams = {}
): Promise<{source: string, datasets: Dataset[]}[]> => {
  // In a production app, we might want to implement parallel requests with Promise.all
  const results = [];

  for (const source of datasetSources.slice(0, 3)) { // Limit to first 3 sources for demo
    const datasets = await fetchExternalDatasets(source.id, params);
    if (datasets.length > 0) {
      results.push({
        source: source.name,
        datasets
      });
    }
  }

  return results;
};

// Mock datasets from Kaggle
const mockKaggleDatasets: Dataset[] = [
  {
    id: "k1",
    title: "COVID-19 Global Dataset",
    description: "Comprehensive dataset containing global COVID-19 cases, deaths, and recoveries data updated daily.",
    tags: ["Health", "Epidemiology", "Free"],
    rows: 150000,
    columns: 15,
    created: "2023-03-15",
    fileSize: "45 MB",
    imageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57",
    source: "Kaggle"
  },
  {
    id: "k2",
    title: "Netflix Movies and TV Shows",
    description: "A comprehensive dataset of all Netflix movies and TV shows available as of 2021, including details like cast, directors, ratings, etc.",
    tags: ["Entertainment", "Media", "Free"],
    rows: 8000,
    columns: 12,
    created: "2023-02-10",
    fileSize: "5.2 MB",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    source: "Kaggle"
  },
  {
    id: "k3",
    title: "World Happiness Report",
    description: "Dataset from the annual World Happiness Report, containing happiness scores and rankings for countries around the world.",
    tags: ["Social Science", "Economics", "Free"],
    rows: 1500,
    columns: 20,
    created: "2023-04-01",
    fileSize: "3.1 MB",
    imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d",
    source: "Kaggle"
  },
  {
    id: "k4",
    title: "Amazon Product Reviews",
    description: "A dataset containing millions of Amazon product reviews across various categories for sentiment analysis.",
    tags: ["E-commerce", "Text Analysis", "Free"],
    rows: 5000000,
    columns: 10,
    created: "2023-01-05",
    fileSize: "2.3 GB",
    imageUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2",
    source: "Kaggle"
  },
  {
    id: "k5",
    title: "NYC Taxi Trips",
    description: "Dataset containing trip records for New York City taxis, including pickup/dropoff times, locations, fares, etc.",
    tags: ["Transportation", "Urban", "Free"],
    rows: 1200000,
    columns: 18,
    created: "2023-05-12",
    fileSize: "1.5 GB",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    source: "Kaggle"
  }
];

// Mock datasets from UCI ML Repository
const mockUCIDatasets: Dataset[] = [
  {
    id: "u1",
    title: "Iris Dataset",
    description: "The famous Iris flower dataset for classification tasks, containing 3 classes of 50 instances each.",
    tags: ["Classification", "Beginner", "Free"],
    rows: 150,
    columns: 5,
    created: "1936-06-01",
    fileSize: "4 KB",
    imageUrl: "https://images.unsplash.com/photo-1532938562344-fc8c5feeb79c",
    source: "UCI ML Repository"
  },
  {
    id: "u2",
    title: "Wine Recognition",
    description: "Using chemical analysis to determine the origin of wines from three different cultivars.",
    tags: ["Classification", "Chemistry", "Free"],
    rows: 178,
    columns: 14,
    created: "1991-10-01",
    fileSize: "10 KB",
    imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78755f4",
    source: "UCI ML Repository"
  },
  {
    id: "u3",
    title: "Adult Census Income",
    description: "Predict whether income exceeds $50K/yr based on census data.",
    tags: ["Classification", "Demographics", "Free"],
    rows: 48842,
    columns: 14,
    created: "1996-05-01",
    fileSize: "3.8 MB",
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
    source: "UCI ML Repository"
  },
  {
    id: "u4",
    title: "Bank Marketing",
    description: "Related with direct marketing campaigns of a Portuguese banking institution.",
    tags: ["Classification", "Marketing", "Free"],
    rows: 45211,
    columns: 17,
    created: "2012-08-01",
    fileSize: "4.5 MB",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    source: "UCI ML Repository"
  },
  {
    id: "u5",
    title: "Heart Disease",
    description: "Database containing 76 attributes, but all published experiments refer to using a subset of 14 of them.",
    tags: ["Health", "Classification", "Free"],
    rows: 303,
    columns: 14,
    created: "1988-07-01",
    fileSize: "22 KB",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c",
    source: "UCI ML Repository"
  }
];

// Mock datasets from Data.gov
const mockDataGovDatasets: Dataset[] = [
  {
    id: "d1",
    title: "U.S. Climate Data",
    description: "Historical climate data for the United States, including temperature, precipitation, and extreme weather events.",
    tags: ["Climate", "Environmental", "Free"],
    rows: 2500000,
    columns: 12,
    created: "2023-01-20",
    fileSize: "4.2 GB",
    imageUrl: "https://images.unsplash.com/photo-1516044734145-9c39b9e89e51",
    source: "Data.gov"
  },
  {
    id: "d2",
    title: "Federal Education Budget",
    description: "Annual education budget allocation data across various educational programs and institutions.",
    tags: ["Education", "Finance", "Free"],
    rows: 10000,
    columns: 25,
    created: "2023-04-10",
    fileSize: "15 MB",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    source: "Data.gov"
  },
  {
    id: "d3",
    title: "National Parks Visitor Statistics",
    description: "Monthly visitor statistics for all U.S. National Parks over the last 10 years.",
    tags: ["Tourism", "Parks", "Free"],
    rows: 45000,
    columns: 10,
    created: "2023-03-05",
    fileSize: "8.5 MB",
    imageUrl: "https://images.unsplash.com/photo-1519143835305-28b31ba1d9b0",
    source: "Data.gov"
  },
  {
    id: "d4",
    title: "FDA Drug Approvals",
    description: "Dataset containing information about all FDA-approved drugs, including approval dates, indications, and manufacturers.",
    tags: ["Healthcare", "Pharmaceuticals", "Free"],
    rows: 35000,
    columns: 20,
    created: "2023-02-15",
    fileSize: "28 MB",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de",
    source: "Data.gov"
  },
  {
    id: "d5",
    title: "U.S. Crime Statistics by State",
    description: "Annual crime statistics broken down by state, type of crime, and demographic factors.",
    tags: ["Crime", "Social", "Free"],
    rows: 75000,
    columns: 30,
    created: "2023-05-01",
    fileSize: "120 MB",
    imageUrl: "https://images.unsplash.com/photo-1453873531674-2151bcd01707",
    source: "Data.gov"
  }
];