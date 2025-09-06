
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import StudentBottomNav from '@/components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Bell, 
  Moon,
  Volume2,
  Languages,
  Smartphone,
  BadgeHelp
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-4 sm:p-6 pb-24 max-w-2xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-4 sm:space-y-6">
            {/* General Settings */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">General</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="sound">App Sounds</Label>
                    </div>
                    <Switch id="sound" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Languages className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="language">Language</Label>
                    </div>
                    <span className="text-sm text-gray-500">English</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Settings */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Mobile</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="mobile-data">Use Mobile Data</Label>
                    </div>
                    <Switch id="mobile-data" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Help & Support</h2>
                <div className="flex items-center gap-3 text-blue-600">
                  <BadgeHelp className="h-5 w-5" />
                  <span className="text-sm sm:text-base">Get Help</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Settings;

