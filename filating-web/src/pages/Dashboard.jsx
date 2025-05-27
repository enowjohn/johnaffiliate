import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FiSearch, FiFilter, FiShoppingCart, FiCheck, FiUsers, FiDollarSign, FiPackage, FiCreditCard } from 'react-icons/fi';
import { SiMastercard, SiVisa, SiPaypal } from 'react-icons/si';
import { FaMobileAlt } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';

const getStripe = async () => {
  try {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }
    return stripe;
  } catch (error) {
    console.error('Failed to load Stripe:', error);
    return null;
  }
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });
  const [cart, setCart] = useState([]);
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalSales: 0,
    totalProducts: 0
  });
  
  // Add progress tracking
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, name: 'Browse Products', description: 'Find your auto parts' },
    { id: 2, name: 'Shopping Cart', description: 'Review your selections' },
    { id: 3, name: 'Checkout', description: 'Complete your purchase' }
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  
  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: FiCreditCard },
    { id: 'momo', name: 'Mobile Money', icon: FaMobileAlt },
    { id: 'paypal', name: 'PayPal', icon: SiPaypal }
  ];

  const [stripe, setStripe] = useState(null);
  const [stripeError, setStripeError] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const stripeInstance = await getStripe();
        if (stripeInstance) {
          setStripe(stripeInstance);
        }
      } catch (error) {
        setStripeError('Failed to initialize payment system. Please try again later.');
        console.error('Stripe initialization error:', error);
      }
    };

    initStripe();
    fetchProducts();
    fetchStats();
  }, [searchQuery, filters, pagination.currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchQuery,
        page: pagination.currentPage,
        limit: 12,
        ...filters
      });

      const response = await api.get(`/products?${params}`);
      setProducts(response.data.products);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchProducts();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product._id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const handleCheckout = async () => {
    try {
      setCurrentStep(3); // Update progress
      if (!stripe) {
        throw new Error('Stripe is not initialized');
      }
      const response = await api.post('/checkout/create-session', {
        items: cart.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {stripeError && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {stripeError}
        </div>
      )}
      {/* Header Section with Brand Colors */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">AutoPartsHub</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* Progress Tracker */}
        <div className="col-span-12 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep >= step.id 
                    ? 'border-blue-600 bg-blue-600 text-white' 
                    : 'border-gray-300 bg-white text-gray-500'}`}>
                  {currentStep > step.id ? (
                    <FiCheck className="w-6 h-6" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{step.name}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {step.id < steps.length && (
                  <div className={`w-20 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Board */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 text-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Active Users</h3>
                <p className="text-3xl font-bold">{stats.activeUsers}</p>
              </div>
              <FiUsers className="text-4xl opacity-80" />
            </div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                <p className="text-3xl font-bold">${stats.totalSales.toLocaleString()}</p>
              </div>
              <FiDollarSign className="text-4xl opacity-80" />
            </div>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
              <FiPackage className="text-4xl opacity-80" />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="col-span-12 bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search auto parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
            </div>
            
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-6 py-4 rounded-lg border border-gray-300 text-lg cursor-pointer hover:border-blue-500 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="Brakes">Brakes</option>
              <option value="Engine">Engine</option>
              <option value="Transmission">Transmission</option>
              <option value="Suspension">Suspension</option>
              <option value="Electrical">Electrical</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="px-6 py-4 rounded-lg border border-gray-300 text-lg cursor-pointer hover:border-blue-500 transition-colors"
            >
              <option value="createdAt">Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </form>
        </div>

        {/* Products Grid with Categories */}
        <div className="col-span-12">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto mb-6 pb-2 w-full no-scrollbar">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                className={`flex-shrink-0 px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 ${
                  filters.category === '' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              {['Engine', 'Brakes', 'Transmission', 'Suspension', 'Electrical', 'Accessories'].map(category => (
                <button
                  key={category}
                  onClick={() => setFilters(prev => ({ ...prev, category }))}
                  className={`flex-shrink-0 px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105 ${
                    filters.category === category 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array(12).fill(null).map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                  <div className="w-full h-72 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))
            ) : products.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
                <FiPackage className="text-6xl text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">No products found</p>
              </div>
            ) : (
              products.map(product => (
                <div key={product._id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-colors">
                  <div className="relative mb-4 group">
                    <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden">
                      <img
                        src={product.imageUrl || `https://source.unsplash.com/800x800/?${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className="object-cover w-full h-72 transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://source.unsplash.com/800x800/?autopart`;
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => {
                          addToCart(product);
                          setCurrentStep(2);
                        }}
                        className="opacity-0 group-hover:opacity-100 bg-yellow-400 text-gray-900 px-8 py-3 rounded-full transform scale-95 group-hover:scale-100 transition-all duration-300 font-semibold shadow-lg hover:bg-yellow-500"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="ml-1 font-medium">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="col-span-12 flex justify-center gap-2 mt-8">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                className={`px-6 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-105 ${
                  pagination.currentPage === i + 1
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg border border-gray-200 z-50 w-80">
          <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
          
          {/* Cart Items */}
          <div className="max-h-64 overflow-y-auto mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-3 pb-2 border-b">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Payment Method</h4>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 ${
                    selectedPaymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
                >
                  <method.icon className={`text-2xl ${
                    selectedPaymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <span className="text-xs text-center">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accepted Cards */}
          {selectedPaymentMethod === 'card' && (
            <div className="flex justify-center gap-3 mb-4">
              <SiVisa className="text-2xl text-gray-600" />
              <SiMastercard className="text-2xl text-gray-600" />
            </div>
          )}

          {/* Total and Checkout */}
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setCurrentStep(2);
                handleCheckout();
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiShoppingCart />
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;