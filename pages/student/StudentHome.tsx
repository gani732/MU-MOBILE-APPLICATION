import React from 'react';
import { Link } from 'react-router-dom';
import MobileContainer from '../../components/MobileContainer';
import StudentBottomNav from '../../components/student/StudentBottomNav';
import { Bell, BookOpen, FileText, Calendar, Award, QrCode, Book, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";

const StudentHome: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hello, John</h1>
              <p className="text-gray-500">Welcome back to campus</p>
            </div>
            <Link to="/student/notifications" className="relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Attendance Tile */}
            <Link to="/student/attendance">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Clock className="h-8 w-8 text-mu-blue mb-2" />
                  <h3 className="text-base font-semibold text-center">Attendance</h3>
                  <p className="text-sm text-green-600 font-medium mt-2">89%</p>
                  <p className="text-xs text-gray-500">This Semester</p>
                </CardContent>
              </Card>
            </Link>

            {/* Announcements Tile */}
            <Link to="/student/announcements">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Bell className="h-8 w-8 text-mu-yellow mb-2" />
                  <h3 className="text-base font-semibold text-center">Announcements</h3>
                  <p className="text-sm font-medium mt-2">3 New</p>
                  <p className="text-xs text-gray-500">View All</p>
                </CardContent>
              </Card>
            </Link>

            {/* Mark Attendance Tile */}
            <Link to="/student/mark-attendance">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <QrCode className="h-8 w-8 text-mu-green mb-2" />
                  <h3 className="text-base font-semibold text-center">Mark Attendance</h3>
                  <p className="text-xs text-gray-500 mt-2">Scan QR Code</p>
                </CardContent>
              </Card>
            </Link>

            {/* Assignments Tile */}
            <Link to="/student/assignments">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-mu-yellow mb-2" />
                  <h3 className="text-base font-semibold text-center">Assignments</h3>
                  <p className="text-sm font-medium mt-2">4 Pending</p>
                  <p className="text-xs text-red-500">2 Due Today</p>
                </CardContent>
              </Card>
            </Link>

            {/* Academic Performance Tile */}
            <Link to="/student/grades">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Award className="h-8 w-8 text-mu-maroon mb-2" />
                  <h3 className="text-base font-semibold text-center">Grades</h3>
                  <p className="text-sm font-medium mt-2">CGPA: 8.7/10</p>
                  <p className="text-xs text-gray-500">Semester 4</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Today's Schedule Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-mu-blue" />
                    <div>
                      <p className="font-medium">Mathematics</p>
                      <p className="text-xs text-gray-500">Prof. Wilson</p>
                    </div>
                  </div>
                  <p className="text-sm">8:30 - 9:30 AM</p>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Book className="h-5 w-5 text-mu-green" />
                    <div>
                      <p className="font-medium">Physics Lab</p>
                      <p className="text-xs text-gray-500">Prof. Johnson</p>
                    </div>
                  </div>
                  <p className="text-sm">10:00 - 12:00 PM</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-mu-yellow" />
                    <div>
                      <p className="font-medium">Computer Science</p>
                      <p className="text-xs text-gray-500">Prof. Smith</p>
                    </div>
                  </div>
                  <p className="text-sm">2:00 - 3:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/student/subjects">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <BookOpen className="h-5 w-5 text-mu-blue" />
                    <span className="text-sm font-medium">Subjects</span>
                  </div>
                </Link>
                <Link to="/student/schedule">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <Calendar className="h-5 w-5 text-mu-green" />
                    <span className="text-sm font-medium">Schedule</span>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default StudentHome;
