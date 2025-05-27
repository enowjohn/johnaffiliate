import React from 'react';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

const featuredPosts = [
  {
    title: "10 Essential Tools for Auto Parts Sellers",
    excerpt: "Discover the must-have tools and software that can help streamline your auto parts business operations.",
    author: "John Smith",
    date: "March 15, 2024",
    category: "Business Tips",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=400&fit=crop"
  },
  {
    title: "The Future of Auto Parts E-commerce",
    excerpt: "Learn about emerging trends and technologies shaping the future of online auto parts sales.",
    author: "Sarah Johnson",
    date: "March 12, 2024",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=400&fit=crop"
  },
  {
    title: "Maximizing Profits with Dynamic Pricing",
    excerpt: "How to implement dynamic pricing strategies to optimize your auto parts business revenue.",
    author: "Michael Chen",
    date: "March 10, 2024",
    category: "Sales Strategy",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop"
  }
];

const recentPosts = [
  {
    title: "5 Ways to Improve Your Parts Photography",
    excerpt: "Professional product photography tips for auto parts sellers.",
    date: "March 8, 2024",
    category: "Marketing"
  },
  {
    title: "Understanding Cross-Border Shipping",
    excerpt: "A comprehensive guide to international auto parts shipping.",
    date: "March 5, 2024",
    category: "Logistics"
  },
  {
    title: "Customer Service Best Practices",
    excerpt: "How to provide excellent customer service in the auto parts industry.",
    date: "March 3, 2024",
    category: "Customer Service"
  },
  {
    title: "Inventory Management Strategies",
    excerpt: "Tips for efficient auto parts inventory management.",
    date: "March 1, 2024",
    category: "Operations"
  }
];

const categories = [
  { name: "Business Tips", count: 15 },
  { name: "Industry Trends", count: 12 },
  { name: "Sales Strategy", count: 8 },
  { name: "Marketing", count: 10 },
  { name: "Logistics", count: 6 },
  { name: "Customer Service", count: 9 },
  { name: "Operations", count: 7 }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Auto Parts Industry Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Expert advice, industry trends, and success stories from the auto parts community
          </p>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                    <CalendarIcon className="w-4 h-4 ml-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-blue-600">
                    <TagIcon className="w-4 h-4 mr-2" />
                    <span>{post.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
            <div className="space-y-8">
              {recentPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <TagIcon className="w-4 h-4 mr-2" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between hover:text-blue-600 cursor-pointer"
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6">
                Get the latest auto parts industry news and tips delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-4"
              />
              <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Share Your Story</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you an auto parts seller with insights to share? We'd love to feature your story on our blog.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Submit Your Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
