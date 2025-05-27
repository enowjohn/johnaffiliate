import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [realtimeData, setRealtimeData] = useState(null);
    const [dateRange, setDateRange] = useState('7d');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData();
        const interval = setInterval(fetchRealtimeData, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, [dateRange]);

    const fetchAnalyticsData = async () => {
        try {
            const response = await axios.get('/api/analytics/dashboard');
            setAnalyticsData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    const fetchRealtimeData = async () => {
        try {
            const response = await axios.get('/api/analytics/realtime');
            setRealtimeData(response.data);
        } catch (error) {
            console.error('Error fetching realtime data:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>
                
                {/* Date Range Filter */}
                <div className="mb-6">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-white border border-gray-300 rounded-md px-4 py-2"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                </div>

                {/* Realtime Stats */}
                {realtimeData && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-600 text-white rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
                            <p className="text-3xl font-bold">{realtimeData.activeUsers}</p>
                        </div>
                        <div className="bg-purple-600 text-white rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Current Page Views</h3>
                            <p className="text-3xl font-bold">{realtimeData.currentPageViews}</p>
                        </div>
                        <div className="bg-yellow-500 text-white rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Top Active Page</h3>
                            <p className="text-xl font-bold">{realtimeData.topCurrentPages[0]?.page}</p>
                        </div>
                    </div>
                )}

                {/* Traffic Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Object.entries(analyticsData.trafficMetrics).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600 font-semibold mb-2">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-2xl font-bold text-gray-800">{value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* User Behavior Chart */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold mb-4">Top Pages</h3>
                        <Bar
                            data={{
                                labels: analyticsData.userBehavior.topPages.map(page => page.page),
                                datasets: [{
                                    label: 'Page Views',
                                    data: analyticsData.userBehavior.topPages.map(page => page.views),
                                    backgroundColor: 'rgba(99, 102, 241, 0.5)',
                                }]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    }
                                }
                            }}
                        />
                    </div>

                    {/* Demographics Chart */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold mb-4">Device Distribution</h3>
                        <Doughnut
                            data={{
                                labels: Object.keys(analyticsData.demographics.devices),
                                datasets: [{
                                    data: Object.values(analyticsData.demographics.devices),
                                    backgroundColor: [
                                        'rgba(99, 102, 241, 0.5)',
                                        'rgba(167, 139, 250, 0.5)',
                                        'rgba(251, 191, 36, 0.5)'
                                    ]
                                }]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Conversion Metrics */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Conversion Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(analyticsData.conversions).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <h4 className="text-gray-600 mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <p className="text-2xl font-bold text-gray-800">
                                    {typeof value === 'number' && value % 1 === 0 ? value : value.toFixed(1)}
                                    {key === 'conversionRate' && '%'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
