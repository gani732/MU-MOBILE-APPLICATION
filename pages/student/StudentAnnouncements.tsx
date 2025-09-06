import React, { useState, useEffect } from 'react';
import MobileContainer from '../../components/MobileContainer';
import StudentBottomNav from '../../components/student/StudentBottomNav';
import { useIsMobile } from '../../hooks/use-mobile';
import { Bell, AlertCircle, Calendar, Info } from 'lucide-react';
import { getAnnouncements, Announcement } from '../../services/announcements';
import { useAuth } from '../../contexts/AuthContext';

const getAnnouncementIcon = (type: string) => {
  switch (type) {
    case 'meeting':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    case 'exam':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'event':
      return <Calendar className="h-5 w-5 text-green-500" />;
    case 'info':
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const StudentAnnouncements: React.FC = () => {
  const isMobile = useIsMobile();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Set up real-time listener for announcements
    const unsubscribe = getAnnouncements('Students', (data) => {
      setAnnouncements(data);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Announcements</h1>
            <Bell className="h-6 w-6 text-mu-blue" />
          </div>

          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="bg-white p-4 rounded-lg shadow-sm text-center text-gray-500">
                No announcements available
              </div>
            ) : (
              announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getAnnouncementIcon(announcement.type || 'info')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {announcement.targetAudience}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">{announcement.createdBy}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(announcement.postedOn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default StudentAnnouncements; 