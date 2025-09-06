import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, FileText, Calendar, Bell, User } from 'lucide-react';

const StudentBottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
      <div className="max-w-[430px] mx-auto grid grid-cols-5 gap-1">
        <Link 
          to="/student/home" 
          className={`flex flex-col items-center justify-center ${isActive('/student/home') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/student/subjects" 
          className={`flex flex-col items-center justify-center ${isActive('/student/subjects') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Subjects</span>
        </Link>
        
        <Link 
          to="/student/assignments" 
          className={`flex flex-col items-center justify-center ${isActive('/student/assignments') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <FileText size={20} />
          <span className="text-xs mt-1">Tasks</span>
        </Link>
        
        <Link 
          to="/student/announcements" 
          className={`flex flex-col items-center justify-center ${isActive('/student/announcements') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <Bell size={20} />
          <span className="text-xs mt-1">Announcements</span>
        </Link>
        
        <Link 
          to="/student/profile" 
          className={`flex flex-col items-center justify-center ${isActive('/student/profile') ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentBottomNav;
