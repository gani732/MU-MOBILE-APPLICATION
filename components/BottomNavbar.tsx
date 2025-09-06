
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, LayoutGrid, FileText, UserCircle2 } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <LayoutGrid size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/assignments" className={`bottom-nav-item ${isActive('/assignments') ? 'active' : ''}`}>
        <FileText size={24} />
        <span className="text-xs mt-1">Tasks</span>
      </Link>
      <Link to="/scheduler" className={`bottom-nav-item ${isActive('/scheduler') ? 'active' : ''}`}>
        <Calendar size={24} />
        <span className="text-xs mt-1">Schedule</span>
      </Link>
      <Link to="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <UserCircle2 size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
