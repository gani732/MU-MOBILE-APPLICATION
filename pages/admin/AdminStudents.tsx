
import React from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const studentsData = [
  {
    id: 1,
    name: "John Doe",
    rollNo: "CSE001",
    year: "3rd Year",
    department: "Computer Science",
    attendance: "85%",
    cgpa: "8.5"
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNo: "CSE002",
    year: "3rd Year",
    department: "Computer Science",
    attendance: "92%",
    cgpa: "9.2"
  },
  {
    id: 3,
    name: "Mike Johnson",
    rollNo: "CSE003",
    year: "3rd Year",
    department: "Computer Science",
    attendance: "78%",
    cgpa: "7.8"
  },
  {
    id: 4,
    name: "Sarah Williams",
    rollNo: "CSE004",
    year: "3rd Year",
    department: "Computer Science",
    attendance: "88%",
    cgpa: "8.9"
  }
];

const AdminStudents = () => {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Students List</h1>
            <Users className="h-6 w-6 text-mu-blue" />
          </div>

          <div className="space-y-4">
            {studentsData.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.rollNo}</p>
                    </div>
                    <span className="text-mu-blue font-medium">
                      {student.department}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Year: </span>
                      <span className="font-medium">{student.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">CGPA: </span>
                      <span className="font-medium">{student.cgpa}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Attendance: </span>
                      <span className={`font-medium ${
                        parseInt(student.attendance) < 80 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {student.attendance}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default AdminStudents;
