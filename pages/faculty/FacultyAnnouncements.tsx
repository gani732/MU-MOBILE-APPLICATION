import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileContainer from '../../components/MobileContainer';
import FacultyBottomNav from '../../components/faculty/FacultyBottomNav';
import { Bell, Plus } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { getAnnouncements, Announcement } from '../../services/announcements';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const FacultyAnnouncements: React.FC = () => {
  const isMobile = useIsMobile();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Set up real-time listener for announcements
    const unsubscribe = getAnnouncements('Faculty', (data) => {
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
            <div>
              <h1 className="text-2xl font-bold">Announcements</h1>
              <p className="text-gray-500">View and manage announcements</p>
            </div>
            <Link to="/faculty/post-announcement" className="bg-blue-600 text-white p-2 rounded-full">
              <Plus size={20} />
            </Link>
          </div>

          <div className="space-y-4">
            {announcements.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center text-gray-500">
                  No announcements available
                </CardContent>
              </Card>
            ) : (
              announcements.map(announcement => (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {announcement.targetAudience}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Posted on: {new Date(announcement.postedOn).toLocaleDateString()}
                    </p>
                    <p className="text-sm">{announcement.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Posted by: {announcement.createdBy}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <FacultyBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FacultyAnnouncements;
