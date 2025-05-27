import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const pricingPlans = [
  {
    id: 'basic',
    name: "Basic",
    price: "49",
    priceId: 'price_basic123', // Add your Stripe Price ID here
    description: "Perfect for getting started with auto parts selling",
    features: [
      "List up to 100 parts",
      "Basic analytics dashboard",
      "Email support",
      "Standard shipping labels",
      "Inventory tracking",
      "Basic reporting"
    ],
    highlighted: false
  },
  {
    id: 'professional',
    name: "Professional",
    price: "99",
    priceId: 'price_pro123', // Add your Stripe Price ID here
    description: "Everything you need for growing auto parts business",
    features: [
      "List up to 1000 parts",
      "Advanced analytics",
      "Priority email & chat support",
      "Bulk shipping labels",
      "Advanced inventory management",
      "Custom reporting",
      "API access",
      "Multiple user accounts"
    ],
    highlighted: true
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large auto parts businesses",
    features: [
      "Unlimited parts listing",
      "Enterprise analytics",
      "24/7 phone support",
      "Custom shipping integration",
      "Advanced API access",
      "Custom features",
      "Dedicated account manager",
      "Custom reporting",
      "Multi-warehouse support"
    ],
    highlighted: false
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const handleGetStarted = async (plan) => {
    try {
      setLoading(prev => ({ ...prev, [plan.id]: true }));
      setError(null);

      if (plan.price === "Custom") {
        navigate('/contact-sales', { 
          state: { planType: plan.id }
        });
        return;
      }

      // Create Stripe checkout session
      const response = await api.post('/api/subscription/create-checkout', {
        priceId: plan.priceId,
        planType: plan.id,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(prev => ({ ...prev, [plan.id]: false }));
    }
  };

  const handleStartTrial = (plan) => {
    navigate('/signup', { 
      state: { 
        trial: true,
        planType: plan.id 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the perfect plan for your auto parts business
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="transform -translate-y-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl shadow-xl p-8 ${
                  plan.highlighted
                    ? 'ring-2 ring-blue-500 transform scale-105'
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-500">/month</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleGetStarted(plan)}
                  disabled={loading[plan.id]}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } ${loading[plan.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading[plan.id] ? 'Processing...' : plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
                {plan.price !== "Custom" && (
                  <button
                    onClick={() => handleStartTrial(plan)}
                    className={`w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors`}
                  >
                    Start Free Trial
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-6">
              <div className="font-semibold">Feature</div>
              <div className="font-semibold text-center">Basic</div>
              <div className="font-semibold text-center">Professional</div>
              <div className="font-semibold text-center">Enterprise</div>
              
              {[
                "Parts Listing",
                "Analytics",
                "Support",
                "AR Preview",
                "API Access",
                "Custom Integration"
              ].map((feature, index) => (
                <React.Fragment key={index}>
                  <div className="py-2">{feature}</div>
                  <div className="text-center py-2">
                    {index < 3 ? <CheckIcon className="w-5 h-5 text-green-500 mx-auto" /> : "-"}
                  </div>
                  <div className="text-center py-2">
                    <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </div>
                  <div className="text-center py-2">
                    <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions."
                },
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Is there a free trial available?",
                  answer: "Yes, we offer a 14-day free trial for all our plans. No credit card required."
                },
                {
                  question: "What happens when I reach my parts listing limit?",
                  answer: "You'll be notified when you're approaching your limit. You can either upgrade your plan or remove some listings."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of auto parts sellers who are growing their business with AutoPartsHub
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleStartTrial(pricingPlans[1])}
              disabled={loading[pricingPlans[1].id]}
              className={`bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors ${
                loading[pricingPlans[1].id] ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading[pricingPlans[1].id] ? 'Processing...' : 'Start Free Trial'}
            </button>
            <button
              onClick={handleGetStarted}
              disabled={loading[pricingPlans[2].id]}
              className={`bg-gray-100 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors ${
                loading[pricingPlans[2].id] ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
