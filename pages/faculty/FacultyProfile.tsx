
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import FacultyBottomNav from '../../components/faculty/FacultyBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, User, Mail, Phone, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { handleLogout } from '@/utils/auth';

const FacultyProfile: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const profile = {
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@mahindra.edu",
    phone: "+1 234-567-8900",
    department: "Computer Science",
    role: "Associate Professor",
    joinDate: "2023-08-15"
  };

  const onLogout = () => {
    handleLogout(navigate);
    toast.success("Logged out successfully");
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile & Settings</h1>
            <Settings className="h-6 w-6 text-primary" />
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.role}</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Account Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{profile.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p>{profile.department}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">Change Password</Button>
            <Button variant="outline" className="w-full justify-start">Notification Settings</Button>
            <Button variant="outline" className="w-full justify-start">Privacy Settings</Button>
            <Button 
              variant="destructive" 
              className="w-full mt-6 flex items-center justify-center gap-2"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        <FacultyBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FacultyProfile;
