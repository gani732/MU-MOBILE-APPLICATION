
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, MessageSquare, User } from 'lucide-react';

const FacultyBottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
      <div className="max-w-[430px] mx-auto grid grid-cols-5 gap-1">
        <Link 
          to="/faculty/home" 
          className={`flex flex-col items-center justify-center ${isActive('/faculty/home') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <LayoutDashboard size={20} />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>

        <Link 
          to="/faculty/timetable" 
          className={`flex flex-col items-center justify-center ${isActive('/faculty/timetable') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <CalendarDays size={20} />
          <span className="text-xs mt-1">Timetable</span>
        </Link>

        <Link 
          to="/faculty/students" 
          className={`flex flex-col items-center justify-center ${isActive('/faculty/students') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <Users size={20} />
          <span className="text-xs mt-1">Students</span>
        </Link>

        <Link 
          to="/faculty/announcements" 
          className={`flex flex-col items-center justify-center ${isActive('/faculty/announcements') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <MessageSquare size={20} />
          <span className="text-xs mt-1">Announcements</span>
        </Link>

        <Link 
          to="/faculty/profile" 
          className={`flex flex-col items-center justify-center ${isActive('/faculty/profile') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default FacultyBottomNav;
