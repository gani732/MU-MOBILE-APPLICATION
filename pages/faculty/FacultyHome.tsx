
import React from 'react';
import { Link } from 'react-router-dom';
import MobileContainer from '../../components/MobileContainer';
import FacultyBottomNav from '../../components/faculty/FacultyBottomNav';
import { Bell, Calendar, Users, BarChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const FacultyHome: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hello, Professor</h1>
              <p className="text-gray-500">Welcome back to your dashboard</p>
            </div>
            <Link to="/faculty/announcements" className="relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Timetable Tile */}
            <Link to="/faculty/timetable">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Calendar className="h-8 w-8 text-mu-blue mb-2" />
                  <h3 className="text-base font-semibold text-center">Today's Classes</h3>
                  <p className="text-sm font-medium mt-2">4 Classes</p>
                  <p className="text-xs text-gray-500">Next: 10:30 AM</p>
                </CardContent>
              </Card>
            </Link>

            {/* Students Tile */}
            <Link to="/faculty/students">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Users className="h-8 w-8 text-mu-green mb-2" />
                  <h3 className="text-base font-semibold text-center">My Students</h3>
                  <p className="text-sm font-medium mt-2">125 Students</p>
                  <p className="text-xs text-gray-500">3 Classes</p>
                </CardContent>
              </Card>
            </Link>

            {/* Class Performance Tile */}
            <Link to="/faculty/class-average">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <BarChart className="h-8 w-8 text-mu-yellow mb-2" />
                  <h3 className="text-base font-semibold text-center">Performance</h3>
                  <p className="text-sm font-medium mt-2">85% Average</p>
                  <p className="text-xs text-gray-500">Last Assessment</p>
                </CardContent>
              </Card>
            </Link>

            {/* Announcements Tile */}
            <Link to="/faculty/announcements">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Bell className="h-8 w-8 text-mu-red mb-2" />
                  <h3 className="text-base font-semibold text-center">Announcements</h3>
                  <p className="text-sm font-medium mt-2">2 New</p>
                  <p className="text-xs text-gray-500">Notifications</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Today's Schedule</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Database Systems</p>
                  <p className="text-xs text-gray-500">CSE-A, Room 401</p>
                </div>
                <p className="text-sm">10:30 - 11:30 AM</p>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Data Structures</p>
                  <p className="text-xs text-gray-500">CSE-B, Room 302</p>
                </div>
                <p className="text-sm">1:00 - 2:00 PM</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Algorithm Design</p>
                  <p className="text-xs text-gray-500">CSE-C, Room 405</p>
                </div>
                <p className="text-sm">3:30 - 4:30 PM</p>
              </div>
            </div>
          </div>
        </div>
        <FacultyBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FacultyHome;
