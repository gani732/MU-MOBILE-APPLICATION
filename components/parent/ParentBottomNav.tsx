
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, User } from 'lucide-react';

const ParentBottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav">
      <Link to="/parent/home" className={`bottom-nav-item ${isActive('/parent/home') ? 'active' : ''}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Dashboard</span>
      </Link>
      <Link to="/parent/announcements" className={`bottom-nav-item ${isActive('/parent/announcements') ? 'active' : ''}`}>
        <Bell size={24} />
        <span className="text-xs mt-1">Announcements</span>
      </Link>
      <Link to="/parent/profile" className={`bottom-nav-item ${isActive('/parent/profile') ? 'active' : ''}`}>
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default ParentBottomNav;
