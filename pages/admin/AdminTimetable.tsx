
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import FacultyBottomNav from '../../components/faculty/FacultyBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const timetableData = [
  {
    day: 'Monday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Computer Networks', room: 'Lab 201' },
      { time: '11:00 AM - 12:30 PM', subject: 'Database Systems', room: 'Room 302' },
      { time: '2:00 PM - 3:30 PM', subject: 'Software Engineering', room: 'Lab 105' },
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Operating Systems', room: 'Room 401' },
      { time: '11:00 AM - 12:30 PM', subject: 'Data Structures', room: 'Lab 203' },
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '10:00 AM - 11:30 AM', subject: 'Computer Networks', room: 'Lab 201' },
      { time: '2:00 PM - 3:30 PM', subject: 'Database Systems', room: 'Room 302' },
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Software Engineering', room: 'Lab 105' },
      { time: '11:00 AM - 12:30 PM', subject: 'Operating Systems', room: 'Room 401' },
    ]
  },
  {
    day: 'Friday',
    classes: [
      { time: '9:00 AM - 10:30 AM', subject: 'Data Structures', room: 'Lab 203' },
      { time: '11:00 AM - 12:30 PM', subject: 'Computer Networks', room: 'Lab 201' },
    ]
  }
];

const AdminTimetable = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const isFacultyRoute = location.pathname.startsWith('/faculty');

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Timetable</h1>
              <p className="text-gray-500">Weekly class schedule</p>
            </div>
            <Calendar className="h-6 w-6 text-mu-blue" />
          </div>
          
          <div className="space-y-4">
            {timetableData.map((day) => (
              <Card key={day.day} className="hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-mu-red">{day.day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.classes.map((classItem, index) => (
                      <div key={index} className="border-l-4 border-mu-blue pl-3 py-2">
                        <div className="font-medium text-gray-900">{classItem.time}</div>
                        <div className="text-mu-blue font-medium">{classItem.subject}</div>
                        <div className="text-gray-500 text-sm">{classItem.room}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {isFacultyRoute ? <FacultyBottomNav /> : <AdminBottomNav />}
      </MobileContainer>
    </div>
  );
};

export default AdminTimetable;
