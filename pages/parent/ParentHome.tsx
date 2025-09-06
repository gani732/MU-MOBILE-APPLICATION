
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import ParentBottomNav from '../../components/parent/ParentBottomNav';
import { Bell, MapPin, CreditCard, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

const ParentHome: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hello, Parent</h1>
              <p className="text-gray-500">Monitor your child's progress</p>
            </div>
            <Link to="/parent/announcements" className="relative">
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Fee Payment Tile */}
            <Link to="/parent/fee-payment">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <CreditCard className="h-8 w-8 text-mu-blue mb-2" />
                  <h3 className="text-base font-semibold text-center">Fee Payment</h3>
                  <p className="text-sm text-mu-red font-medium mt-2">₹45,000 due</p>
                  <p className="text-xs text-gray-500">Due: May 15, 2025</p>
                </CardContent>
              </Card>
            </Link>

            {/* Student Geo-Location Tile */}
            <Link to="/parent/location">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <MapPin className="h-8 w-8 text-mu-green mb-2" />
                  <h3 className="text-base font-semibold text-center">Location</h3>
                  <p className="text-xs text-gray-500 mt-2">Last seen: 10:30 AM</p>
                  <p className="text-xs text-gray-500">Main Building</p>
                </CardContent>
              </Card>
            </Link>

            {/* Marks Overview Tile */}
            <Link to="/parent/marks">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Award className="h-8 w-8 text-mu-yellow mb-2" />
                  <h3 className="text-base font-semibold text-center">Marks</h3>
                  <p className="text-sm font-medium mt-2">CGPA: 8.7/10</p>
                  <p className="text-xs text-gray-500">Semester 4</p>
                </CardContent>
              </Card>
            </Link>

            {/* Faculty Contacts Tile */}
            <Link to="/parent/faculty">
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-mu-maroon mb-2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <h3 className="text-base font-semibold text-center">Faculty</h3>
                  <p className="text-xs text-gray-500 mt-2">15 Faculty Members</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Today's Schedule</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Mathematics</p>
                  <p className="text-xs text-gray-500">Prof. Wilson</p>
                </div>
                <p className="text-sm">8:30 - 9:30 AM</p>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Physics Lab</p>
                  <p className="text-xs text-gray-500">Prof. Johnson</p>
                </div>
                <p className="text-sm">10:00 - 12:00 PM</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Computer Science</p>
                  <p className="text-xs text-gray-500">Prof. Smith</p>
                </div>
                <p className="text-sm">2:00 - 3:30 PM</p>
              </div>
            </div>
          </div>
        </div>
        <ParentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default ParentHome;
