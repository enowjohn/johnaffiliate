import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  LinkIcon, 
  UserGroupIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Analytics', icon: ChartBarIcon, path: '/dashboard/analytics' },
    { name: 'Affiliate Links', icon: LinkIcon, path: '/dashboard/links' },
    { name: 'Referrals', icon: UserGroupIcon, path: '/dashboard/referrals' },
    { name: 'Settings', icon: CogIcon, path: '/dashboard/settings' },
  ];

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full text-gray-400 hover:text-white"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <item.icon className="w-6 h-6" />
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;