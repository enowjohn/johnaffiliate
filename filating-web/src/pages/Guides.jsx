import React from 'react';
import { 
  ClockIcon, 
  StarIcon, 
  ChartBarIcon,
  VideoCameraIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const popularGuides = [
  {
    title: "How to Replace Brake Pads",
    difficulty: "Intermediate",
    time: "2 hours",
    views: "15K",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=300&fit=crop",
    category: "Brakes"
  },
  {
    title: "Oil Change Guide",
    difficulty: "Beginner",
    time: "30 minutes",
    views: "25K",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&h=300&fit=crop",
    category: "Maintenance"
  },
  {
    title: "Spark Plug Replacement",
    difficulty: "Beginner",
    time: "1 hour",
    views: "12K",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&h=300&fit=crop",
    category: "Engine"
  }
];

const categories = [
  { name: "Engine", count: 25 },
  { name: "Brakes", count: 18 },
  { name: "Suspension", count: 15 },
  { name: "Transmission", count: 12 },
  { name: "Electrical", count: 20 },
  { name: "Maintenance", count: 30 },
  { name: "Body & Interior", count: 16 }
];

const latestGuides = [
  {
    title: "Installing LED Headlights",
    excerpt: "Step-by-step guide to upgrading your headlights to LED.",
    category: "Electrical",
    date: "March 15, 2024"
  },
  {
    title: "Transmission Fluid Change",
    excerpt: "Complete guide to changing your transmission fluid.",
    category: "Transmission",
    date: "March 12, 2024"
  },
  {
    title: "Suspension Lowering Guide",
    excerpt: "How to safely lower your vehicle's suspension.",
    category: "Suspension",
    date: "March 10, 2024"
  },
  {
    title: "Air Filter Replacement",
    excerpt: "Quick guide to replacing your engine air filter.",
    category: "Maintenance",
    date: "March 8, 2024"
  }
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Auto Parts Installation Guides
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Step-by-step instructions and video tutorials for installing and maintaining auto parts
          </p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search guides..."
              className="w-full max-w-xl px-6 py-3 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Popular Guides */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Popular Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{guide.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{guide.time}</span>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 mr-2" />
                      <span>{guide.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <ChartBarIcon className="w-4 h-4 mr-2" />
                      <span>{guide.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600">{guide.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Latest Guides */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8">Latest Guides</h2>
            <div className="space-y-8">
              {latestGuides.map((guide, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {guide.category}
                    </span>
                    <span className="text-sm text-gray-500">{guide.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.excerpt}</p>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <DocumentTextIcon className="w-5 h-5 mr-2" />
                      Read Guide
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <VideoCameraIcon className="w-5 h-5 mr-2" />
                      Watch Video
                    </button>
                  </div>
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

            {/* Contribute CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Share Your Expertise</h3>
              <p className="mb-6">
                Help the community by contributing your own installation guides and tutorials.
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Submit a Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <VideoCameraIcon className="w-12 h-12 text-white opacity-75" />
                  </div>
                </div>
                <div className="p-4 text-white">
                  <h3 className="font-semibold">Installation Tutorial {index + 1}</h3>
                  <p className="text-gray-400 text-sm mt-2">10:30 mins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;
