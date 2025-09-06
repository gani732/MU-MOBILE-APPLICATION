import React, { useState } from 'react';
import MobileContainer from '../../components/MobileContainer';
import FacultyBottomNav from '../../components/faculty/FacultyBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Users, ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for class sections
const classSections = [
  { id: "cse-3a", name: "CSE 3A" },
  { id: "cse-3b", name: "CSE 3B" },
  { id: "ece-3a", name: "ECE 3A" },
];

// Updated mock data without submission status
const studentsBySection = {
  'cse-3a': [
    {
      id: 1,
      name: "John Doe",
      rollNo: "CSE001",
      attendance: "85%",
      performance: "Good"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "CSE002",
      attendance: "92%",
      performance: "Excellent"
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "CSE003",
      attendance: "78%",
      performance: "Average"
    },
  ],
  'cse-3b': [
    {
      id: 4,
      name: "Sarah Williams",
      rollNo: "CSE004",
      attendance: "88%",
      performance: "Good"
    },
    {
      id: 5,
      name: "Robert Brown",
      rollNo: "CSE005",
      attendance: "95%",
      performance: "Excellent"
    },
  ],
  'ece-3a': [
    {
      id: 6,
      name: "Emily Davis",
      rollNo: "ECE001",
      attendance: "79%",
      performance: "Average"
    },
    {
      id: 7,
      name: "David Miller",
      rollNo: "ECE002",
      attendance: "82%",
      performance: "Good"
    },
  ],
};

const FacultyStudents = () => {
  const isMobile = useIsMobile();
  const [selectedSection, setSelectedSection] = useState("cse-3a");
  const students = studentsBySection[selectedSection as keyof typeof studentsBySection];

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Students</h1>
            <Users className="h-6 w-6 text-blue-600" />
          </div>

          <div className="mb-6">
            <label htmlFor="section-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Class Section
            </label>
            <Select 
              value={selectedSection} 
              onValueChange={(value) => setSelectedSection(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {classSections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-4">Students in {classSections.find(s => s.id === selectedSection)?.name}</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className={parseInt(student.attendance) < 80 ? 'text-red-600' : 'text-green-600'}>
                          {student.attendance}
                        </TableCell>
                        <TableCell>{student.performance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-500 text-xs">Total Students</p>
                    <p className="font-bold">{students.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Avg Attendance</p>
                    <p className="font-bold">{
                      Math.round(students.reduce((sum, student) => 
                        sum + parseInt(student.attendance), 0) / students.length
                      )}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">High Performers</p>
                    <p className="font-bold">{
                      students.filter(s => s.performance === "Excellent").length
                    }</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <FacultyBottomNav />
      </MobileContainer>
    </div>
  );
};

export default FacultyStudents;
