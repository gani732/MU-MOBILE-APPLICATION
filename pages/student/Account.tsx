
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import StudentBottomNav from '../../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';

const Account: React.FC = () => {
  const isMobile = useIsMobile();

  // In a real app, this would come from an API or auth context
  const studentDetails = {
    name: "Marvin McKinney",
    studentId: "2023CS0123",
    branch: "Computer Science",
    year: "3rd Year"
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <h1 className="text-2xl font-bold mb-6">Account Details</h1>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium">{studentDetails.name}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Student ID</p>
              <p className="font-medium">{studentDetails.studentId}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Branch</p>
              <p className="font-medium">{studentDetails.branch}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Year</p>
              <p className="font-medium">{studentDetails.year}</p>
            </div>
          </div>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Account;
