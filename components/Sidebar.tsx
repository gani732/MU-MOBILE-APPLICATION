import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bell,
  MapPin,
  FileText,
  Calendar,
  BarChart,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Faculty', path: '/admin/faculty', icon: Users },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const facultyNavItems = [
    { name: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
    { name: 'Students', path: '/faculty/students', icon: Users },
    { name: 'Courses', path: '/faculty/courses', icon: BookOpen },
    { name: 'Assignments', path: '/faculty/assignments', icon: FileText },
    { name: 'Attendance', path: '/faculty/attendance', icon: Calendar },
    { name: 'Announcements', path: '/faculty/announcements', icon: Bell },
    { name: 'Reports', path: '/faculty/reports', icon: BarChart }
  ];

  const parentNavItems = [
    { name: 'Dashboard', path: '/parent', icon: LayoutDashboard },
    { name: 'My Children', path: '/parent/children', icon: Users },
    { name: 'Location', path: '/parent/location', icon: MapPin },
    { name: 'Assignments', path: '/parent/assignments', icon: FileText },
    { name: 'Attendance', path: '/parent/attendance', icon: Calendar },
    { name: 'Announcements', path: '/parent/announcements', icon: Bell }
  ];

  const getNavItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'admin':
        return adminNavItems;
      case 'faculty':
        return facultyNavItems;
      case 'parent':
        return parentNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.role === 'admin' ? 'Admin Panel' : 
             user?.role === 'faculty' ? 'Faculty Portal' : 
             'Parent Portal'}
          </h2>
        </div>
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100',
                      location.pathname === item.path && 'bg-gray-100 font-medium'
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 