
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import FacultyBottomNav from '../../components/faculty/FacultyBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const submissionsData = [
  {
    id: 1,
    studentName: 'John Doe',
    rollNo: 'CSE001',
    subject: 'Computer Networks',
    assignment: 'Network Protocols',
    submittedOn: '2025-04-25',
    status: 'submitted'
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    rollNo: 'CSE002',
    subject: 'Database Systems',
    assignment: 'SQL Queries',
    submittedOn: '2025-04-24',
    status: 'graded'
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    rollNo: 'CSE003',
    subject: 'Software Engineering',
    assignment: 'UML Diagrams',
    submittedOn: '2025-04-23',
    status: 'pending'
  }
];

const FacultySubmissions = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Assignment Submissions</h1>
            <FileText className="h-6 w-6 text-mu-blue" />
          </div>

          <div className="space-y-4">
            {submissionsData.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{submission.studentName}</h3>
                      <p className="text-sm text-gray-500">{submission.rollNo}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      submission.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                      submission.status === 'graded' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-mu-blue">{submission.subject}</p>
                    <p className="text-sm text-gray-600">{submission.assignment}</p>
                    <p className="text-xs text-gray-500 mt-2">Submitted: {submission.submittedOn}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <FacultyBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FacultySubmissions;
