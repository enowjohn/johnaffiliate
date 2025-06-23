import React, { useState } from 'react';
import { productService } from '../services/productService';

const ProductComparison = ({ products }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);

  const handleCompare = async () => {
    if (products.length < 2) return;

    setLoading(true);
    setError(null);

    try {
      const data = await productService.getComparisonData(products.map(p => p.id));
      setComparisonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!comparisonData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Product Comparison</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              {comparisonData.products.map((product, index) => (
                <th key={index} className="px-6 py-3 bg-gray-50">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-8 w-8 rounded"
                    />
                    <span className="ml-2">{product.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparisonData.features.map((feature, fIndex) => (
              <tr key={fIndex}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {feature.name}
                </td>
                {comparisonData.products.map((product, pIndex) => (
                  <td key={pIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.specs[feature.key] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                Price
              </td>
              {comparisonData.products.map((product, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleCompare}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Update Comparison
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProductComparison;
