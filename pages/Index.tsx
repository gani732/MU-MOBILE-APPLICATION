
import React from 'react';
import { Link } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import BottomNavbar from '../components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardTile: React.FC<{ title: string; value: string; icon: React.ReactNode; link: string }> = ({ title, value, icon, link }) => {
  return (
    <Link to={link} className="bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`text-xl font-medium ${title === 'Attendance' ? 'text-mu-blue' : title === 'Assignments' ? 'text-mu-blue' : title === 'Announcements' ? 'text-mu-yellow' : 'text-gray-600'}`}>
        {value}
      </div>
      <div className="text-gray-500 text-sm">{title}</div>
    </Link>
  );
};

const Index: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Jenny Wilson</h1>
            </div>
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <DashboardTile 
              title="Scheduler" 
              value=""
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="8" cy="14" r="2" />
                </svg>
              } 
              link="/scheduler"
            />
            <DashboardTile 
              title="Attendance" 
              value="89%" 
              icon={<></>}
              link="/attendance"
            />
            <DashboardTile 
              title="Assignments" 
              value="18" 
              icon={<></>}
              link="/assignments"
            />
            <DashboardTile 
              title="Announcements" 
              value="12" 
              icon={<></>}
              link="/announcements"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <DashboardTile 
              title="Leave Application" 
              value="" 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              }
              link="/leave"
            />
            <DashboardTile 
              title="Mark Attendance" 
              value="" 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 15L8 18L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              link="/mark-attendance"
            />
            <DashboardTile 
              title="Subjects & Syllabus" 
              value="" 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              }
              link="/subjects"
            />
            <DashboardTile 
              title="Faculty Notes" 
              value="" 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              }
              link="/faculty-notes"
            />
          </div>
        </div>
        <BottomNavbar />
      </MobileContainer>
    </div>
  );
};

export default Index;
