import { Link } from "react-router-dom";
import { 
  StarIcon, 
  MagnifyingGlassIcon, 
  ChatBubbleLeftIcon, 
  XMarkIcon,
  BellIcon,
  CubeTransparentIcon,
  VideoCameraIcon,
  WrenchScrewdriverIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import VehicleCompatibilityChecker from '../components/VehicleCompatibilityChecker';
import ProductComparison from '../components/ProductComparison';

const carParts = [
  {
    name: "Performance Exhaust Systems",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=300&auto=format&fit=crop",
    price: "$299.99",
    description: "High-flow performance exhaust systems for maximum power",
    specs: {
      material: "Stainless Steel",
      horsepowerGain: "+25HP",
      warranty: "Lifetime"
    }
  },
  {
    name: "LED Headlight Kit",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&auto=format&fit=crop",
    price: "$199.99",
    description: "Ultra-bright LED headlight conversion kits",
    specs: {
      brightness: "12000LM",
      lifespan: "50000 hours",
      colorTemp: "6000K"
    }
  },
  {
    name: "Sport Brake Kit",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=300&auto=format&fit=crop",
    price: "$499.99",
    description: "High-performance brake systems for superior stopping power",
    specs: {
      stoppingDistance: "-20%",
      padMaterial: "Ceramic",
      rotorType: "Drilled & Slotted"
    }
  },
  {
    name: "Custom Wheels",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&h=300&auto=format&fit=crop",
    price: "$899.99",
    description: "Premium alloy wheels for style and performance",
    specs: {
      material: "Forged Aluminum",
      weight: "15lbs",
      finish: "Matte Black"
    }
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Auto Parts Retailer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    content: "This platform has transformed my auto parts business. I've seen a 300% increase in my earnings within just 3 months!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Car Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    content: "The analytics and tracking tools are incredible. It's never been easier to monitor my performance and optimize my car parts sales.",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Automotive Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    content: "The platform's support for automotive products is amazing. Perfect for car enthusiasts!",
    rating: 5
  }
];

const features = [
  {
    title: "Genuine Parts Guarantee",
    description: "All parts are verified and guaranteed authentic",
    icon: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=100&h=100&auto=format&fit=crop"
  },
  {
    title: "Smart Inventory Management",
    description: "Track your parts inventory and sales in real-time",
    icon: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=100&h=100&auto=format&fit=crop"
  },
  {
    title: "Automated Order Processing",
    description: "Streamlined order fulfillment and tracking",
    icon: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&h=100&auto=format&fit=crop"
  }
];

const stats = [
  { label: "Active Sellers", value: "10,000+" },
  { label: "Parts Listed", value: "100,000+" },
  { label: "Monthly Sales", value: "$2M+" },
  { label: "Customer Satisfaction", value: "98%" }
];

const howItWorks = [
  {
    title: "List Your Parts",
    description: "Upload your auto parts inventory with detailed specifications",
    icon: "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?w=100&h=100&auto=format&fit=crop"
  },
  {
    title: "Connect with Buyers",
    description: "Reach thousands of potential customers looking for quality parts",
    icon: "https://images.unsplash.com/photo-1552960226-639240203497?w=100&h=100&auto=format&fit=crop"
  },
  {
    title: "Grow Your Business",
    description: "Track performance and scale your auto parts business",
    icon: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=100&h=100&auto=format&fit=crop"
  }
];

const brands = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_logo.svg/200px-Mercedes-Benz_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Toyota_Motor_North_America_logo.svg/200px-Toyota_Motor_North_America_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png"
];

const categories = [
  {
    name: "Engine Parts",
    icon: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=120&h=120&auto=format&fit=crop",
    count: "25,000+ items"
  },
  {
    name: "Brake Systems",
    icon: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=120&h=120&auto=format&fit=crop",
    count: "15,000+ items"
  },
  {
    name: "Transmission",
    icon: "https://images.unsplash.com/photo-1537027511592-d3c4ea3cec0f?w=120&h=120&auto=format&fit=crop",
    count: "10,000+ items"
  },
  {
    name: "Suspension",
    icon: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=120&h=120&auto=format&fit=crop",
    count: "8,000+ items"
  },
  {
    name: "Electrical",
    icon: "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?w=120&h=120&auto=format&fit=crop",
    count: "20,000+ items"
  },
  {
    name: "Body Parts",
    icon: "https://images.unsplash.com/photo-1552960226-639240203497?w=120&h=120&auto=format&fit=crop",
    count: "12,000+ items"
  }
];

const blogPosts = [
  {
    title: "Top 10 Performance Parts for Your Vehicle",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=250&auto=format&fit=crop",
    excerpt: "Discover the best performance upgrades to enhance your vehicle's power and handling.",
    date: "May 20, 2025"
  },
  {
    title: "Guide to OEM vs Aftermarket Parts",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=250&auto=format&fit=crop",
    excerpt: "Learn the pros and cons of OEM and aftermarket parts to make informed decisions.",
    date: "May 18, 2025"
  },
  {
    title: "Maintaining Your Car's Performance",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=250&auto=format&fit=crop",
    excerpt: "Essential maintenance tips to keep your vehicle running at peak performance.",
    date: "May 15, 2025"
  }
];

const comparisonFeatures = [
  "Genuine Parts Verification",
  "24/7 Customer Support",
  "Secure Payment Processing",
  "Fast Shipping",
  "Easy Returns",
  "Price Match Guarantee"
];

const popularSearches = [
  "BMW M3 Performance Parts",
  "Honda Civic Brake Kit",
  "Toyota Camry LED Lights",
  "Ford F150 Suspension",
  "Audi A4 Engine Parts"
];

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Sports Car",
  "Motorcycle",
  "Van"
];

const installationGuides = [
  {
    title: "Brake Pad Replacement",
    duration: "45 mins",
    difficulty: "Intermediate",
    views: "15K",
    thumbnail: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=300&h=200&auto=format&fit=crop"
  },
  {
    title: "Oil Filter Change",
    duration: "30 mins",
    difficulty: "Beginner",
    views: "25K",
    thumbnail: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&auto=format&fit=crop"
  },
  {
    title: "Spark Plug Installation",
    duration: "20 mins",
    difficulty: "Beginner",
    views: "18K",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&auto=format&fit=crop"
  }
];

const LandingPage = () => {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);
  const [garageItems, setGarageItems] = useState([
    { name: "2022 BMW M3", parts: 5 },
    { name: "2021 Honda Civic", parts: 3 }
  ]);

  // Mock search suggestions based on query
  const getSearchSuggestions = (query) => {
    return popularSearches.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClick = () => setShowSearchSuggestions(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Advanced Search */}
      <div className="min-h-screen w-screen min-w-xl overflow-hidden flex items-center flex-col relative bg-gradient-to-br from-blue-600 to-purple-700">
        {/* Vehicle Compatibility Checker */}
        <div className="container mx-auto px-6 mt-8">
          <VehicleCompatibilityChecker />
        </div>

        {/* Product Comparison Section */}
        <div className="container mx-auto px-6 mt-8">
          <ProductComparison products={carParts} />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        
        <nav className="relative container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-3xl font-bold">JOHNAutopart</div>
            <div className="space-x-4">
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative container mx-auto px-6 pt-32 pb-20">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8">
              Find the Perfect Auto Parts for Your Vehicle
            </h1>
            <p className="text-xl mb-12 text-gray-200">
              Access thousands of quality auto parts from trusted sellers worldwide
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                  <select
                    value={selectedVehicleType}
                    onChange={(e) => setSelectedVehicleType(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchSuggestions(true);
                    }}
                    placeholder="Search for auto parts..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => setIsAddVehicleOpen(true)}
                    className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                </div>
                {showSearchSuggestions && searchQuery && (
                  <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-100">
                    {getSearchSuggestions(searchQuery).map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-left"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSearchSuggestions(false);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="font-semibold">Popular:</span>
                  {popularSearches.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="hover:text-blue-600"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Parts Section - Enhanced Grid */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Auto Parts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {carParts.map((part, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img src={part.image} alt={part.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{part.name}</h3>
                  <p className="text-gray-600 mb-4">{part.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{part.price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <img src={category.icon} alt={category.name} className="w-20 h-20 mx-auto rounded-lg object-cover mb-4" />
                <h3 className="text-lg font-semibold text-center mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 text-center">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <img src={step.icon} alt={step.title} className="w-20 h-20 mx-auto rounded-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Tool Section */}
      <div className="bg-gray-900 py-20 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Why Choose AutoPartsHub?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop"
                alt="Auto parts comparison"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-700/50 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="bg-white py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link to="/blog" className="text-blue-600 font-semibold hover:text-blue-700">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Modified */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6 p-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4 p-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic p-6">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Top Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <img src={brand} alt="Brand logo" className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Virtual Garage Section */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Your Virtual Garage</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {garageItems.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{vehicle.name}</h3>
                      <p className="text-sm text-gray-600">{vehicle.parts} saved parts</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      View Parts
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="bg-white py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AR Part Preview */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="mb-4">
                <CubeTransparentIcon className="h-12 w-12 mx-auto text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AR Part Preview</h3>
              <p className="text-gray-600 mb-6">View parts in 3D and see how they'll fit your vehicle</p>
              <button
                onClick={() => setShowARPreview(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Try AR Preview
              </button>
            </div>

            {/* Price Alerts */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="mb-4">
                <BellIcon className="h-12 w-12 mx-auto text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Price Alerts</h3>
              <p className="text-gray-600 mb-6">Get notified when parts you want go on sale</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Set Alert
              </button>
            </div>

            {/* Installation Videos */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="mb-4">
                <VideoCameraIcon className="h-12 w-12 mx-auto text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Installation Videos</h3>
              <p className="text-gray-600 mb-6">Watch expert installation guides</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Watch Guides
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Guides */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Installation Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {installationGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={guide.thumbnail} alt={guide.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{guide.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <WrenchScrewdriverIcon className="h-4 w-4 mr-1" />
                      {guide.difficulty}
                    </span>
                    <span>{guide.duration}</span>
                    <span>{guide.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      {showChat && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-xl shadow-2xl z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 rounded-t-xl">
            <h3 className="text-lg font-semibold text-white">Live Chat Support</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            {/* Chat messages would go here */}
            <div className="text-center text-gray-500">
              Connect with our support team for assistance
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      {/* AR Preview Modal */}
      {showARPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">AR Part Preview</h3>
              <button
                onClick={() => setShowARPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500">AR Preview would load here</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowARPreview(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 border-b border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Stay Updated</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on new auto parts, industry trends, and special offers.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* CTA Section */}
      <div className="min-h-screen bg-blue-600 py-20 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Grow Your Auto Parts Business?
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Join our community of successful auto parts retailers and start earning
            more today. We provide all the tools you need to succeed.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl transform hover:scale-105 duration-200"
          >
            Create Your Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">AutoPartsHub</h3>
              <p className="text-gray-400">
                Your trusted partner in auto parts sales success.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/guides" className="hover:text-white">Guides</Link></li>
                <li><Link to="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>Email: support@autopartshub.com</li>
                <li>Phone: (+237) 652340197</li>
                <li>Address: Douala bonaberi cameroon </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2025 JOHNAutoParts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;