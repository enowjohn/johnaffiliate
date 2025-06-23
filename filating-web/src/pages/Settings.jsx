import React, { useState } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CogIcon,
  ShieldCheckIcon,
  XMarkIcon,
  BellIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(user?.profilePicture || '');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      profilePicture: user?.profilePicture || '',
      bio: user?.bio || ''
    },
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    currency: 'USD',
    timezone: 'UTC',
    language: 'en',
    theme: 'light',
    affiliate: {
      commissionRate: 15,
      payoutThreshold: 100,
      payoutMethod: 'paypal'
    },
    security: {
      twoFactor: false,
      passwordStrength: 'medium'
    }
  });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Image size should be less than 5MB');
        return;
      }
      
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setUploadError('');
    }
  };

  const handleProfilePictureRemove = () => {
    setProfilePicture(null);
    setProfilePicturePreview('');
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      const response = await axios.post('/api/users/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the user's profile picture in the auth context
      updateUser({ ...user, profilePicture: response.data.url });
      setUploadError('');
      setUploading(false);
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Failed to upload profile picture');
      setUploading(false);
    }
  };

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          <div className="flex items-center space-x-4">
            <UserIcon className="h-6 w-6 text-gray-400" />
          </div>
        </div>
        
        {/* Profile Picture Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profilePicturePreview ? (
                <div className="relative w-24 h-24">
                  <img
                    src={profilePicturePreview}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <button
                    onClick={handleProfilePictureRemove}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="profile-picture"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <PhotoIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload Photo</span>
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </label>
                <button
                  onClick={handleProfilePictureUpload}
                  disabled={!profilePicture || uploading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Save Photo'}
                </button>
              </div>
              {uploadError && (
                <p className="mt-2 text-sm text-red-500">{uploadError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.notifications.email}
              onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={settings.notifications.sms}
              onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={settings.profile.bio}
              onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Affiliate Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Affiliate Settings</h2>
          <div className="flex items-center space-x-4">
            <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Rate
            </label>
            <select
              value={settings.affiliate.commissionRate}
              onChange={(e) => handleSettingChange('affiliate', 'commissionRate', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Method
            </label>
            <select
              value={settings.affiliate.payoutMethod}
              onChange={(e) => handleSettingChange('affiliate', 'payoutMethod', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <div className="flex items-center space-x-4">
            <BellIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Email Notifications</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.sms}
              onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">SMS Notifications</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Push Notifications</span>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Security Settings</h2>
          <div className="flex items-center space-x-4">
            <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.twoFactor}
              onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">2FA Authentication</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Strength
            </label>
            <select
              value={settings.security.passwordStrength}
              onChange={(e) => handleSettingChange('security', 'passwordStrength', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weak">Weak</option>
              <option value="medium">Medium</option>
              <option value="strong">Strong</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            // TODO: Implement save settings functionality
            console.log('Saving settings:', settings);
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
