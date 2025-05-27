import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import Chat from '../components/Chat';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const faqs = [
  {
    question: "How do I list my auto parts?",
    answer: "To list your auto parts, simply log in to your account, click on 'Add New Part', and fill in the required details including part name, description, price, and images. You can also use our bulk upload feature for multiple listings."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for business accounts. All payments are processed securely through our platform."
  },
  {
    question: "How does the AR preview feature work?",
    answer: "Our AR preview feature uses your device's camera to show how a part would look in real-world context. Simply click the 'View in AR' button on any compatible part listing and follow the on-screen instructions."
  },
  {
    question: "What are the shipping options?",
    answer: "We integrate with major shipping carriers to provide various shipping options. Sellers can set their preferred shipping methods and rates. Buyers can choose from available options at checkout."
  },
  {
    question: "How do I track my orders?",
    answer: "Once an order is shipped, you'll receive a tracking number via email. You can also view all your orders and their status in your account dashboard under 'Order History'."
  }
];

const supportCategories = [
  {
    title: "Getting Started",
    icon: DocumentTextIcon,
    description: "New to AutoPartsHub? Learn the basics here",
    articles: ["Platform Overview", "Account Setup", "First Listing Guide"]
  },
  {
    title: "Selling Guide",
    icon: VideoCameraIcon,
    description: "Tips and best practices for sellers",
    articles: ["Pricing Strategy", "Photo Guidelines", "Shipping Setup"]
  },
  {
    title: "Technical Support",
    icon: QuestionMarkCircleIcon,
    description: "Technical issues and troubleshooting",
    articles: ["Common Issues", "System Requirements", "API Documentation"]
  }
];

const Support = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    countryCode: '+1',
    subject: 'Technical Support',
    message: '',
    messageType: 'email'
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value, country) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value,
      countryCode: '+' + country.dialCode
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    // Validate that either email or phone is provided
    if (!formData.email && !formData.phoneNumber) {
      setSubmitStatus({
        type: 'error',
        message: 'Please provide either an email or phone number'
      });
      return;
    }

    try {
      const response = await api.post('/support/message', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        countryCode: '+1',
        subject: 'Technical Support',
        message: '',
        messageType: 'email'
      });
    } catch (error) {
      console.error('Support message error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
    }
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const handleStartChat = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-lg p-1">
              <input
                type="text"
                placeholder="Search for help..."
                className="flex-grow px-4 py-2 text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg p-3 mb-6">
                  <category.icon className="w-full h-full text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <DocumentTextIcon className="w-4 h-4 mr-2" />
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-start">
                    <QuestionMarkCircleIcon className="w-6 h-6 mr-2 text-blue-600 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (Optional if phone provided)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional if email provided)
                      </label>
                      <PhoneInput
                        country={'us'}
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        containerClass="w-full"
                        inputClass="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      How would you like to receive replies?
                    </label>
                    <select
                      name="messageType"
                      value={formData.messageType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="email">Email Only</option>
                      <option value="sms">SMS Only</option>
                      <option value="both">Both Email and SMS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>

                  {submitStatus.message && (
                    <div
                      className={`mt-4 p-3 rounded-lg ${
                        submitStatus.type === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <PhoneIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-gray-600">+237652340197</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-gray-600">support@autopartshub.com</p>
                        <p className="text-sm text-gray-500">24/7 Response Time</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-gray-600">Available 24/7</p>
                        <button
                          onClick={handleStartChat}
                          className="text-blue-600 text-sm hover:text-blue-700"
                        >
                          Start Chat →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Priority Support</h3>
                  <p className="mb-6">
                    Get faster response times and dedicated support with our Professional and Enterprise plans.
                  </p>
                  <button
                    onClick={handleUpgrade}
                    className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      {showChat && (
        <Chat
          onClose={() => setShowChat(false)}
          userId={localStorage.getItem('userId') || 'guest'}
        />
      )}
    </div>
  );
};

export default Support;
