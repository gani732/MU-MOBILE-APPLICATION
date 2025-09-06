
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import StudentBottomNav from '../../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue';
}

const Assignments: React.FC = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = React.useState<Date>(new Date());

  const assignments: Assignment[] = [
    { id: '1', title: 'Database Design Project', subject: 'CSE202', dueDate: 'Apr 30, 2025', status: 'pending' },
    { id: '2', title: 'Operating Systems Lab', subject: 'CSE201', dueDate: 'May 5, 2025', status: 'pending' },
    { id: '3', title: 'Mathematics Assignment', subject: 'MATH201', dueDate: 'Apr 25, 2025', status: 'submitted' },
    { id: '4', title: 'Physics Lab Report', subject: 'PHY101', dueDate: 'Apr 20, 2025', status: 'overdue' },
  ];

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <h1 className="text-2xl font-bold mb-6">Assignments</h1>
          
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border w-full bg-white"
            />
          </div>

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      assignment.status === 'pending' ? 'bg-blue-100' :
                      assignment.status === 'submitted' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        assignment.status === 'pending' ? 'text-blue-600' :
                        assignment.status === 'submitted' ? 'text-green-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">{assignment.subject}</p>
                      <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    assignment.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                    assignment.status === 'submitted' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Assignments;
