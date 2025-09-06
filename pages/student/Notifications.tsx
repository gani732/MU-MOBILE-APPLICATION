
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import StudentBottomNav from '@/components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, BellDot, BellRing } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-4 sm:p-6 pb-24 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-mu-blue" />
            <h1 className="text-xl sm:text-2xl font-bold">Notifications</h1>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Push Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BellDot className="h-5 w-5 text-gray-500" />
                    <Label htmlFor="all-notifications">All Notifications</Label>
                  </div>
                  <Switch id="all-notifications" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label htmlFor="assignments">Assignments</Label>
                      <p className="text-sm text-gray-500">Get notified about new assignments</p>
                    </div>
                  </div>
                  <Switch id="assignments" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label htmlFor="grades">Grades</Label>
                      <p className="text-sm text-gray-500">Get notified about grade updates</p>
                    </div>
                  </div>
                  <Switch id="grades" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BellRing className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label htmlFor="announcements">Announcements</Label>
                      <p className="text-sm text-gray-500">Get notified about new announcements</p>
                    </div>
                  </div>
                  <Switch id="announcements" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Notifications;

