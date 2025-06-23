import React, { useState } from 'react';
import { vehicleService } from '../services/vehicleService';

const VehicleCompatibilityChecker = ({ onPartSelected }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [partType, setPartType] = useState('');
  const [compatibleParts, setCompatibleParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const years = Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await vehicleService.getVehicleCompatibility(make, model, year, partType);
      setCompatibleParts(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePartSelect = (part) => {
    onPartSelected(part);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Vehicle Compatibility Checker</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="make" className="block text-sm font-medium">Make</label>
          <input
            type="text"
            id="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium">Model</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium">Year</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="partType" className="block text-sm font-medium">Part Type</label>
          <select
            id="partType"
            value={partType}
            onChange={(e) => setPartType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Part Type</option>
            <option value="engine">Engine Components</option>
            <option value="transmission">Transmission</option>
            <option value="brakes">Braking System</option>
            <option value="suspension">Suspension</option>
            <option value="electrical">Electrical</option>
            <option value="body">Body Parts</option>
            <option value="interior">Interior</option>
            <option value="performance">Performance Upgrades</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Find Compatible Parts'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {compatibleParts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Compatible Parts</h3>
          <div className="space-y-4">
            {compatibleParts.map((part) => (
              <div
                key={part.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePartSelect(part)}
              >
                <h4 className="font-semibold">{part.name}</h4>
                <p className="text-sm text-gray-600">{part.description}</p>
                <p className="mt-2 text-blue-600">${part.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCompatibilityChecker;
