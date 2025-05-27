import React from 'react';
import {
  ChartBarIcon,
  CubeTransparentIcon,
  ShoppingCartIcon,
  TruckIcon,
  CogIcon,
  ChartPieIcon,
  BellAlertIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "Real-Time Analytics",
    description: "Track your sales, inventory, and performance metrics in real-time with detailed dashboards and reports.",
    icon: ChartBarIcon,
    color: "bg-blue-500"
  },
  {
    title: "AR Part Preview",
    description: "Let customers visualize parts in 3D and check compatibility with their vehicles using AR technology.",
    icon: CubeTransparentIcon,
    color: "bg-purple-500"
  },
  {
    title: "Smart Inventory",
    description: "Automatically track stock levels, get low inventory alerts, and manage multiple warehouses efficiently.",
    icon: ShoppingCartIcon,
    color: "bg-green-500"
  },
  {
    title: "Shipping Integration",
    description: "Seamless integration with major shipping carriers for automated shipping label generation and tracking.",
    icon: TruckIcon,
    color: "bg-yellow-500"
  },
  {
    title: "Price Optimization",
    description: "AI-powered pricing suggestions based on market trends and competitor analysis.",
    icon: CogIcon,
    color: "bg-red-500"
  },
  {
    title: "Performance Reports",
    description: "Detailed insights into your business performance with customizable reports and analytics.",
    icon: ChartPieIcon,
    color: "bg-indigo-500"
  },
  {
    title: "Price Alerts",
    description: "Set up automated alerts for price changes and inventory updates for your watched items.",
    icon: BellAlertIcon,
    color: "bg-pink-500"
  },
  {
    title: "Mobile App",
    description: "Manage your business on the go with our powerful mobile application.",
    icon: DevicePhoneMobileIcon,
    color: "bg-teal-500"
  }
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$49",
    features: [
      "Basic Analytics",
      "Up to 100 Listed Parts",
      "Email Support",
      "Basic Reporting"
    ]
  },
  {
    name: "Professional",
    price: "$99",
    features: [
      "Advanced Analytics",
      "Unlimited Parts Listing",
      "Priority Support",
      "AR Part Preview",
      "Price Optimization"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Pro Features",
      "Custom Integration",
      "Dedicated Account Manager",
      "Custom Analytics",
      "API Access"
    ]
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for Auto Parts Sellers
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to grow your auto parts business in one platform.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg p-3 mb-6`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">See It In Action</h2>
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
            <div className="aspect-video relative">
              {/* This would be replaced with an actual video or interactive demo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl">Interactive Platform Demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  {tier.price}
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Partners */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Integration Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Add partner logos here */}
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Partner Logo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
