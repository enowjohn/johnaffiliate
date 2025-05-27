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
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { api } from '../services/api';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const response = await api.get('/analytics/dashboard');
            setAnalyticsData(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            setError('Failed to load analytics data');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold">{error}</p>
                    <button 
                        onClick={fetchAnalyticsData}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!analyticsData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
            <div className="container mx-auto px-8 max-w-[1920px]">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 px-2">Analytics Dashboard</h1>
                
                {/* Overview Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-8 shadow-xl">
                        <h3 className="text-2xl font-semibold mb-3">Total Products</h3>
                        <p className="text-4xl font-bold">{analyticsData.totalProducts}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-8 shadow-xl">
                        <h3 className="text-2xl font-semibold mb-3">Total Sales</h3>
                        <p className="text-4xl font-bold">{analyticsData.totalSales}</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-xl p-8 shadow-xl">
                        <h3 className="text-2xl font-semibold mb-3">Monthly Revenue</h3>
                        <p className="text-4xl font-bold">${analyticsData.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-purple-500 text-white rounded-xl p-8 shadow-xl">
                        <h3 className="text-2xl font-semibold mb-3">Active Users</h3>
                        <p className="text-4xl font-bold">{analyticsData.activeUsers}</p>
                    </div>
                </div>

                {/* Sales Chart */}
                {analyticsData.salesChart && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 shadow-xl">
                        <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Sales Trend</h3>
                        <div className="h-[600px]">
                            <Line
                                data={{
                                    labels: analyticsData.salesChart.map(item => item.date),
                                    datasets: [
                                        {
                                            label: 'Sales',
                                            data: analyticsData.salesChart.map(item => item.sales),
                                            borderColor: '#4F46E5',
                                            backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                            borderWidth: 3,
                                            fill: true
                                        },
                                        {
                                            label: 'Revenue',
                                            data: analyticsData.salesChart.map(item => item.revenue),
                                            borderColor: '#7C3AED',
                                            backgroundColor: 'rgba(124, 58, 237, 0.1)',
                                            borderWidth: 3,
                                            fill: true
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                            labels: {
                                                font: {
                                                    size: 14
                                                },
                                                padding: 20
                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                font: {
                                                    size: 12
                                                }
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                font: {
                                                    size: 12
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Top Products and Category Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {analyticsData.topProducts && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Top Products</h3>
                            <div className="space-y-6">
                                {analyticsData.topProducts.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">{product.name}</p>
                                            <p className="text-base text-gray-500 dark:text-gray-400">{product.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">${product.revenue.toLocaleString()}</p>
                                            <p className="text-base text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {analyticsData.categoryPerformance && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Category Performance</h3>
                            <Bar
                                data={{
                                    labels: analyticsData.categoryPerformance.map(cat => cat.category),
                                    datasets: [
                                        {
                                            label: 'Revenue',
                                            data: analyticsData.categoryPerformance.map(cat => cat.revenue),
                                            backgroundColor: 'rgba(79, 70, 229, 0.5)',
                                        },
                                        {
                                            label: 'Sales',
                                            data: analyticsData.categoryPerformance.map(cat => cat.sales),
                                            backgroundColor: 'rgba(124, 58, 237, 0.5)',
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Category Distribution Pie Chart and Sales Pivot Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {analyticsData.categoryPerformance && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Category Distribution</h3>
                            <div className="h-[500px]">
                                <Pie
                                    data={{
                                        labels: analyticsData.categoryPerformance.map(cat => cat.category),
                                        datasets: [{
                                            data: analyticsData.categoryPerformance.map(cat => cat.sales),
                                            backgroundColor: [
                                                '#4F46E5',
                                                '#7C3AED',
                                                '#EC4899',
                                                '#8B5CF6',
                                                '#6366F1'
                                            ]
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'right',
                                                labels: {
                                                    font: {
                                                        size: 14
                                                    },
                                                    padding: 20
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {analyticsData.categoryPerformance && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Sales Performance Matrix</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-2 py-2 text-left text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                            <th className="px-2 py-2 text-left text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sales</th>
                                            <th className="px-2 py-2 text-left text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                                            <th className="px-2 py-2 text-left text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {analyticsData.categoryPerformance.map((category, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}>
                                                <td className="px-2 py-2 whitespace-nowrap text-base text-gray-900 dark:text-gray-300">{category.category}</td>
                                                <td className="px-2 py-2 whitespace-nowrap text-base text-gray-900 dark:text-gray-300">{category.sales}</td>
                                                <td className="px-2 py-2 whitespace-nowrap text-base text-gray-900 dark:text-gray-300">${category.revenue.toLocaleString()}</td>
                                                <td className="px-2 py-2 whitespace-nowrap text-base text-gray-900 dark:text-gray-300">
                                                    ${(category.revenue / category.sales).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Popular Brands and Regional Sales */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {analyticsData.popularBrands && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Popular Brands</h3>
                            <Doughnut
                                data={{
                                    labels: analyticsData.popularBrands.map(brand => brand.name),
                                    datasets: [{
                                        data: analyticsData.popularBrands.map(brand => brand.revenue),
                                        backgroundColor: [
                                            '#4F46E5',
                                            '#7C3AED',
                                            '#EC4899',
                                            '#8B5CF6',
                                            '#6366F1'
                                        ]
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}

                    {analyticsData.regionalSales && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Regional Sales</h3>
                            <Bar
                                data={{
                                    labels: analyticsData.regionalSales.map(region => region.region),
                                    datasets: [
                                        {
                                            label: 'Revenue',
                                            data: analyticsData.regionalSales.map(region => region.revenue),
                                            backgroundColor: 'rgba(79, 70, 229, 0.5)',
                                        },
                                        {
                                            label: 'Sales',
                                            data: analyticsData.regionalSales.map(region => region.sales),
                                            backgroundColor: 'rgba(124, 58, 237, 0.5)',
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Analysis Tracking Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Performance Analysis Tracking</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Revenue Analysis */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Revenue Analysis</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Monthly Revenue</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ${analyticsData.monthlyRevenue.toLocaleString()}
                                    </p>
                                    <div className={`flex items-center mt-2 ${analyticsData.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className="text-base font-medium">
                                            {analyticsData.revenueGrowth >= 0 ? '↑' : '↓'} {Math.abs(analyticsData.revenueGrowth).toFixed(1)}%
                                        </span>
                                        <span className="text-base text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                                <div>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Average Order Value</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ${(analyticsData.monthlyRevenue / analyticsData.totalSales).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sales Analysis */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Sales Analysis</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Total Sales</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                        {analyticsData.totalSales.toLocaleString()}
                                    </p>
                                </div>
                                <div className="h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                                <div>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Daily Average Sales</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                        {(analyticsData.salesChart.reduce((acc, day) => acc + day.sales, 0) / analyticsData.salesChart.length).toFixed(1)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Category Analysis */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Category Analysis</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Top Performing Category</p>
                                    {analyticsData.categoryPerformance && (
                                        <>
                                            <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                                {analyticsData.categoryPerformance.reduce((prev, current) => 
                                                    (current.revenue > prev.revenue) ? current : prev
                                                ).category}
                                            </p>
                                            <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                                                By revenue
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                                <div>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Category Distribution</p>
                                    <div className="mt-2 space-y-6">
                                        {analyticsData.categoryPerformance && 
                                            analyticsData.categoryPerformance
                                                .sort((a, b) => b.sales - a.sales)
                                                .slice(0, 3)
                                                .map((cat, index) => (
                                                    <div key={index} className="flex items-center justify-between">
                                                        <span className="text-base text-gray-600 dark:text-gray-300">{cat.category}</span>
                                                        <span className="text-base font-medium text-gray-900 dark:text-white">
                                                            {((cat.sales / analyticsData.totalSales) * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
