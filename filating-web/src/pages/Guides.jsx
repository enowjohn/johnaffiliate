import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { 
  ClockIcon, 
  StarIcon, 
  ChartBarIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const popularGuides = [
  {
    title: "How to Replace Brake Pads",
    difficulty: "Intermediate",
    time: "2 hours",
    views: "15K",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=300&fit=crop",
    category: "Brakes",
    content: "Step-by-step guide for replacing brake pads, including safety precautions and required tools."
  },
  {
    title: "Oil Change Guide",
    difficulty: "Beginner",
    time: "30 minutes",
    views: "25K",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500&h=300&fit=crop",
    category: "Maintenance",
    content: "Complete guide to changing your vehicle's oil, including oil selection and disposal tips."
  },
  {
    title: "Spark Plug Replacement",
    difficulty: "Beginner",
    time: "1 hour",
    views: "12K",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&h=300&fit=crop",
    category: "Engine",
    content: "Learn how to replace spark plugs and improve engine performance with this detailed guide."
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

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const DURATION_FILTERS = {
  any: 'Any length',
  short: 'Under 4 minutes',
  medium: '4-20 minutes',
  long: 'Over 20 minutes'
};

const SORT_OPTIONS = {
  relevance: 'Most relevant',
  date: 'Newest first',
  viewCount: 'Most viewed',
  rating: 'Top rated'
};

const searchYouTubeVideos = async (query, category = '', sortBy = 'relevance') => {
  if (!query) return [];
  const searchTerm = category ? `${query} ${category} auto parts tutorial` : `${query} auto parts tutorial`;
  
  try {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      part: 'snippet',
      maxResults: 8,
      q: searchTerm,
      type: 'video',
      key: YOUTUBE_API_KEY,
      order: sortBy,
    }
  });

  // Get video details to get duration
  const videoIds = response.data.items.map(item => item.id.videoId).join(',');
  const detailsResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
    params: {
      part: 'contentDetails,statistics',
      id: videoIds,
      key: YOUTUBE_API_KEY
    }
  });

  // Combine search results with video details
  return response.data.items.map(item => ({
    ...item,
    details: detailsResponse.data.items.find(detail => detail.id === item.id.videoId)
  }));
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch videos');
  }
};

// Convert ISO 8601 duration to minutes
const getDurationInMinutes = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 60 + minutes + seconds / 60;
};

const Guides = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('any');
  const [sortBy, setSortBy] = useState('relevance');
  const [favorites, setFavorites] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const { data: videos = [], isLoading, error } = useQuery({
    queryKey: ['videos', searchQuery, selectedCategory, sortBy],
    queryFn: async () => {
      try {
        if (!searchQuery) return [];
        return await searchYouTubeVideos(searchQuery, selectedCategory, sortBy);
      } catch (err) {
        throw new Error(err.response?.data?.error?.message || 'Failed to fetch videos');
      }
    },
    enabled: Boolean(searchQuery),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000 // 30 minutes
  });

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('videoFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('videoFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (video) => {
    setFavorites(prev => {
      const exists = prev.some(v => v.id.videoId === video.id.videoId);
      if (exists) {
        return prev.filter(v => v.id.videoId !== video.id.videoId);
      } else {
        return [...prev, video];
      }
    });
  };

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
            <div className="relative w-full max-w-2xl mx-auto space-y-4">
              <div className="flex gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-lg text-gray-900 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="px-4 py-3 rounded-lg text-gray-900 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {Object.entries(DURATION_FILTERS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search video guides..."
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={() => setSearchQuery('')}
                  className={`px-6 py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors ${!searchQuery && 'opacity-50 cursor-not-allowed'}`}
                  disabled={!searchQuery}
                >
                  Clear
                </button>
              </div>
            </div>
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
                    <button 
                      className="flex items-center text-blue-600 hover:text-blue-700"
                      onClick={() => {
                        setSearchQuery(guide.title);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }}
                    >
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
                <div 
                  className={`flex items-center justify-between cursor-pointer ${!selectedCategory ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
                  onClick={() => setSelectedCategory('')}
                >
                  <span>All Categories</span>
                </div>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between cursor-pointer ${selectedCategory === category.name ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'}`}
                    onClick={() => setSelectedCategory(category.name)}
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
      {/* Popular Guides Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Installation Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {popularGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={guide.image} alt={guide.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {guide.time}
                    </span>
                    <span className="flex items-center">
                      <StarIcon className="w-4 h-4 mr-1" />
                      {guide.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{guide.difficulty}</span>
                    <button
                      onClick={() => setSelectedGuide(guide)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors"
                    >
                      Read Guide
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="relative">
              <img src={selectedGuide.image} alt={selectedGuide.title} className="w-full h-64 object-cover" />
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedGuide.title}</h2>
              <div className="flex items-center gap-6 mb-6 text-gray-600">
                <span className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  {selectedGuide.time}
                </span>
                <span className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2" />
                  {selectedGuide.rating}
                </span>
                <span className="text-blue-600 font-medium">{selectedGuide.difficulty}</span>
              </div>
              <p className="text-gray-700 mb-6">{selectedGuide.content}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Tutorials Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Video Tutorials</h2>
          
          {selectedVideo && (
            <div className="mb-12">
              <div className="max-w-4xl mx-auto aspect-video">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center">{selectedVideo.snippet.title}</h3>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center mb-8">
              {error instanceof Error ? error.message : 'An error occurred while fetching videos'}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-4 flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : showFavorites ? (
              favorites.length === 0 ? (
                <div className="col-span-4 text-center py-12 text-gray-600">
                  No favorite videos yet. Click the heart icon on videos to save them here.
                </div>
              ) : (
                favorites.map((video) => (
                  <VideoCard
                    key={video.id.videoId}
                    video={video}
                    onSelect={() => setSelectedVideo(video)}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(video)}
                  />
                ))
              )
            ) : !videos || videos.length === 0 ? (
              <div className="col-span-4 text-center py-12 text-gray-600">
                {searchQuery ? 'No videos found. Try a different search term.' : 'Start searching for auto parts videos!'}
              </div>
            ) : videos
              .filter(video => {
                if (durationFilter === 'any') return true;
                const duration = getDurationInMinutes(video.details.contentDetails.duration);
                switch (durationFilter) {
                  case 'short': return duration < 4;
                  case 'medium': return duration >= 4 && duration <= 20;
                  case 'long': return duration > 20;
                  default: return true;
                }
              })
              .map((video) => (
                <div 
                  key={video.id.videoId} 
                  className="bg-gray-900 rounded-xl overflow-hidden group"
                >
                  <div className="aspect-video relative cursor-pointer" onClick={() => setSelectedVideo(video)}>
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-opacity">
                      <VideoCameraIcon className="w-12 h-12 text-white opacity-75" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(video);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors"
                    >
                      <svg
                        className={`w-6 h-6 ${favorites.some(v => v.id.videoId === video.id.videoId) ? 'text-yellow-500' : 'text-white'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 text-white">
                    <h3 className="font-semibold line-clamp-2">{video.snippet.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                      <span>{video.snippet.channelTitle}</span>
                      <span>{Math.round(getDurationInMinutes(video.details.contentDetails.duration))}m</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span>{parseInt(video.details.statistics.viewCount).toLocaleString()} views</span>
                      <span>{parseInt(video.details.statistics.likeCount).toLocaleString()} likes</span>
                    </div>
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
