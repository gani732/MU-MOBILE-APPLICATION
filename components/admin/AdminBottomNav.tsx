import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, User, Calendar, Link as LinkIcon } from 'lucide-react';

const AdminBottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="bottom-nav">
      <Link to="/admin/home" className={`bottom-nav-item ${isActive('/admin/home') ? 'active' : ''}`}>
        <LayoutDashboard size={24} />
        <span className="text-xs mt-1">Dashboard</span>
      </Link>
      <Link to="/admin/users" className={`bottom-nav-item ${isActive('/admin/users') ? 'active' : ''}`}>
        <Users size={24} />
        <span className="text-xs mt-1">All Users</span>
      </Link>
      <Link to="/admin/manage-student-parent" className={`bottom-nav-item ${isActive('/admin/manage-student-parent') ? 'active' : ''}`}>
        <LinkIcon size={24} />
        <span className="text-xs mt-1">Links</span>
      </Link>
      <Link to="/admin/timetable" className={`bottom-nav-item ${isActive('/admin/timetable') ? 'active' : ''}`}>
        <Calendar size={24} />
        <span className="text-xs mt-1">Timetable</span>
      </Link>
      <Link to="/admin/announcements" className={`bottom-nav-item ${isActive('/admin/announcements') ? 'active' : ''}`}>
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Announcements</span>
      </Link>
      <Link to="/admin/profile" className={`bottom-nav-item ${isActive('/admin/profile') ? 'active' : ''}`}>
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default AdminBottomNav;
