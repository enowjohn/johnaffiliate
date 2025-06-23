import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import { PlusIcon, TrashIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const AffiliateLinks = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({
    productName: '',
    originalUrl: '',
    category: '',
    commissionRate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalConversions: 0,
    totalEarnings: 0,
    conversionRate: 0
  });

  useEffect(() => {
    fetchLinks();
    fetchStats();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await api.get('/affiliate/links');
      setLinks(response.data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/affiliate/stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const createLink = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/affiliate/links', {
        ...newLink,
        commissionRate: parseFloat(newLink.commissionRate)
      });
      toast.success('Affiliate link created successfully!');
      setNewLink({
        productName: '',
        originalUrl: '',
        category: '',
        commissionRate: ''
      });
      fetchLinks();
    } catch (error) {
      console.error('Failed to create link:', error);
      toast.error(error.response?.data?.message || 'Failed to create affiliate link');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Affiliate Links</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Conversion Rate: {stats.conversionRate}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowPathIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Earnings: ${stats.totalEarnings}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Link</h2>
        <form onSubmit={createLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={newLink.productName}
              onChange={(e) => setNewLink({ ...newLink, productName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Original URL</label>
            <input
              type="url"
              value={newLink.originalUrl}
              onChange={(e) => setNewLink({ ...newLink, originalUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="https://example.com/product"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={newLink.category}
              onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="auto-parts">Auto Parts</option>
              <option value="accessories">Accessories</option>
              <option value="tools">Tools</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input
              type="number"
              value={newLink.commissionRate}
              onChange={(e) => setNewLink({ ...newLink, commissionRate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              max="100"
              step="0.1"
              placeholder="Enter commission rate (e.g., 5.5)"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Link
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link._id}>
                <td className="px-6 py-4 whitespace-nowrap">{link.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="truncate max-w-md">{link.affiliateUrl}</span>
                    <button
                      onClick={() => copyToClipboard(link.affiliateUrl)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      Copy
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{link.clicks}</td>
                <td className="px-6 py-4 whitespace-nowrap">${link.earnings}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => copyToClipboard(link.affiliateUrl)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Copy Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AffiliateLinks;