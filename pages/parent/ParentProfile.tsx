import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import ParentBottomNav from '../../components/parent/ParentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, Settings, LogOut, ChevronRight, Bell, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '@/utils/auth';
import { toast } from "sonner";

const ParentProfile: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout(navigate);
    toast.success("Logged out successfully");
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Settings className="h-6 w-6 text-mu-blue" />
          </div>

          {/* User info */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Robert Smith</h2>
                <p className="text-gray-500">Parent of John Smith</p>
                <p className="text-sm text-mu-blue">robert.smith@example.com</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Relationship</p>
                <p className="font-medium">Father</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Contact</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Student info */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-3">Student Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">John Smith</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Student ID</span>
                <span className="font-medium">MU221034</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Course</span>
                <span className="font-medium">B.Tech CSE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Year</span>
                <span className="font-medium">2nd Year (2024-25)</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <Link to="/parent/notifications-settings" className="menu-item">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-3 text-mu-blue" />
                <span>Notification Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link to="/parent/privacy" className="menu-item">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-mu-blue" />
                <span>Privacy & Security</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link to="/parent/help" className="menu-item">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-3 text-mu-blue" />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>

          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </div>
        <ParentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default ParentProfile;
