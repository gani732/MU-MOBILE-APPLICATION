
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import StudentBottomNav from '../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Settings, User, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleLogout } from '@/utils/auth';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";

const Profile: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout(navigate);
    toast.success("Logged out successfully");
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-4 sm:p-6 pb-24 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
            <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-mu-blue" />
          </div>

          {/* Profile Info */}
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold">John Smith</h2>
                <p className="text-sm sm:text-base text-gray-500">Student ID: MU221034</p>
                <p className="text-sm sm:text-base text-mu-blue">john.smith@mahindra.edu</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            <Button variant="outline" className="w-full justify-start p-4 sm:p-6 h-auto" onClick={() => navigate('/student/settings')}>
              <Settings className="mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Settings</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start p-4 sm:p-6 h-auto" onClick={() => navigate('/student/notifications')}>
              <Bell className="mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Notifications</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start p-4 sm:p-6 h-auto" onClick={() => navigate('/student/privacy')}>
              <Shield className="mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Privacy & Security</span>
            </Button>
          </div>

          <Button 
            variant="destructive" 
            className="w-full flex items-center justify-center gap-2 p-4 sm:p-6 h-auto"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Logout</span>
          </Button>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Profile;
