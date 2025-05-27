// App.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard';
import AffiliateLinks from './pages/AffiliateLinks';
import Analytics from './pages/Analytics';
import Referrals from './pages/Referrals';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Guides from './pages/Guides';
import Support from './pages/Support';
import ContactSales from './pages/ContactSales';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact-sales" element={<ContactSales />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="links" element={<AffiliateLinks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="referrals" element={<Referrals />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600">Page not found</p>
          </div>
        </div>
      } />
    </Routes>
    </>
  );
}

export default App;
