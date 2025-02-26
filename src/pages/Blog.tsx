
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Synthetic Data in Machine Learning",
      excerpt: "How synthetic data is revolutionizing machine learning model training by providing diverse, privacy-compliant datasets.",
      author: "Dr. Emma Chen",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Synthetic Data",
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Data Discovery Tools: A Comparative Analysis",
      excerpt: "An in-depth comparison of top data discovery platforms and how they accelerate the analytics workflow.",
      author: "Michael Rodriguez",
      date: "June 3, 2023",
      readTime: "12 min read",
      category: "Data Discovery",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Ethics in AI-Generated Datasets",
      excerpt: "Exploring the ethical considerations and best practices when working with AI-generated synthetic data.",
      author: "Dr. Sarah Johnson",
      date: "June 22, 2023",
      readTime: "10 min read",
      category: "Ethics & AI",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1156&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Unlocking Hidden Insights with Advanced Analytics",
      excerpt: "How data scientists are using advanced analytics to discover patterns that traditional methods miss.",
      author: "Alex Thompson",
      date: "July 8, 2023",
      readTime: "7 min read",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "The Democratization of Data Access",
      excerpt: "How new platforms are making data more accessible to everyone, not just data scientists.",
      author: "Priya Patel",
      date: "July 29, 2023",
      readTime: "9 min read",
      category: "Data Access",
      image: "https://images.unsplash.com/photo-1584291527935-456e8e2dd734?q=80&w=1170&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Data Visualization Trends in 2023",
      excerpt: "The latest approaches to making data more understandable through effective visualization techniques.",
      author: "Jason Kim",
      date: "August 14, 2023",
      readTime: "6 min read",
      category: "Visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">DataSynth Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends, insights, and innovations in the world of data science, 
              synthetic data generation, and analytics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3">{post.category}</Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <div className="flex items-center mr-4">
                      <User className="w-3.5 h-3.5 mr-1.5" />
                      {post.author}
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-primary flex items-center">
                    Read More <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <div className="max-w-md mx-auto">
              <p className="text-muted-foreground mb-4">
                Get the latest updates on data science, AI, and analytics delivered directly to your inbox.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
