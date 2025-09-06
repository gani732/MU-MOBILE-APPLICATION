import React from 'react';
import { Link } from 'react-router-dom';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { Bell, Users, BarChart, Calendar, MessageSquare, Settings, Link as LinkIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";

const AdminHome: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hello, Admin</h1>
              <p className="text-gray-500">Manage your institution</p>
            </div>
            <Link to="/admin/announcements" className="relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Students Overview Tile */}
            <Link to="/admin/students">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Users className="h-8 w-8 text-mu-blue mb-2" />
                  <h3 className="text-base font-semibold text-center">Students</h3>
                  <p className="text-sm font-medium mt-2">2,450 Total</p>
                  <p className="text-xs text-gray-500">125 New This Month</p>
                </CardContent>
              </Card>
            </Link>

            {/* Faculty Stats Tile */}
            <Link to="/admin/faculty">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <BarChart className="h-8 w-8 text-mu-red mb-2" />
                  <h3 className="text-base font-semibold text-center">Faculty</h3>
                  <p className="text-sm font-medium mt-2">180 Members</p>
                  <p className="text-xs text-gray-500">15 Departments</p>
                </CardContent>
              </Card>
            </Link>

            {/* Student-Parent Links Tile */}
            <Link to="/admin/manage-student-parent">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <LinkIcon className="h-8 w-8 text-mu-purple mb-2" />
                  <h3 className="text-base font-semibold text-center">Student-Parent Links</h3>
                  <p className="text-sm font-medium mt-2">Manage Relationships</p>
                  <p className="text-xs text-gray-500">Link students to parents</p>
                </CardContent>
              </Card>
            </Link>

            {/* Timetable Management */}
            <Link to="/admin/timetable">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Calendar className="h-8 w-8 text-mu-green mb-2" />
                  <h3 className="text-base font-semibold text-center">Timetable</h3>
                  <p className="text-xs text-gray-500 mt-2">Manage Schedule</p>
                </CardContent>
              </Card>
            </Link>

            {/* Settings Tile */}
            <Link to="/admin/profile">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Settings className="h-8 w-8 text-mu-gray mb-2" />
                  <h3 className="text-base font-semibold text-center">Settings</h3>
                  <p className="text-xs text-gray-500 mt-2">System Configuration</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Recent Announcements</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Exam Schedule Update</p>
                  <p className="text-xs text-gray-500">Posted 2 hours ago</p>
                </div>
                <MessageSquare className="text-mu-blue h-5 w-5" />
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Faculty Meeting</p>
                  <p className="text-xs text-gray-500">Posted 5 hours ago</p>
                </div>
                <MessageSquare className="text-mu-blue h-5 w-5" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Holiday Notice</p>
                  <p className="text-xs text-gray-500">Posted 1 day ago</p>
                </div>
                <MessageSquare className="text-mu-blue h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default AdminHome;
