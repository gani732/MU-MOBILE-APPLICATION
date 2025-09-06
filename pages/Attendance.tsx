
import React, { useState } from 'react';
import MobileContainer from '../components/MobileContainer';
import StudentBottomNav from '../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';

const Attendance: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState({
    date: '',
    subject: '',
    status: 'present'
  });
  
  const attendanceData = [
    {
      semester: "SEM-I",
      total: 120,
      present: 108,
      percentage: 90,
      status: "Excellent"
    },
    {
      semester: "SEM-II",
      total: 115,
      present: 98,
      percentage: 85,
      status: "Good"
    },
    {
      semester: "SEM-III",
      total: 125,
      present: 112,
      percentage: 89,
      status: "Excellent"
    },
    {
      semester: "SEM-IV",
      total: 118,
      present: 95,
      percentage: 81,
      status: "Good"
    },
    {
      semester: "SEM-V",
      total: 110,
      present: 92,
      percentage: 84,
      status: "Good"
    },
    {
      semester: "SEM-VI",
      total: 122,
      present: 115,
      percentage: 94,
      status: "Excellent"
    },
    {
      semester: "SEM-VII",
      total: 116,
      present: 98,
      percentage: 84,
      status: "Good"
    },
    {
      semester: "SEM-VIII",
      total: 120,
      present: 108,
      percentage: 90,
      status: "Excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

  const handleAddAttendance = () => {
    if (!attendanceDetails.date || !attendanceDetails.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Attendance Added",
      description: `Added ${attendanceDetails.status} attendance for ${attendanceDetails.subject}`,
    });
    setOpen(false);
    // Reset form
    setAttendanceDetails({
      date: '',
      subject: '',
      status: 'present'
    });
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-4 pb-20 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Attendance Overview</h1>
            <Button 
              onClick={() => setOpen(true)}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] flex items-center gap-2"
              size="sm"
            >
              <PlusCircle size={16} />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
          
          {/* Summary Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average</p>
                  <p className="text-xl font-bold text-green-600">87%</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-xl font-bold text-blue-600">826</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-lg col-span-2 sm:col-span-1">
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-xl font-bold text-yellow-600">946</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Semester-wise Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Semester</TableHead>
                  <TableHead className="text-right">Present</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.semester}</TableCell>
                    <TableCell className="text-right">{item.present}</TableCell>
                    <TableCell className="text-right">{item.total}</TableCell>
                    <TableCell className="text-right">{item.percentage}%</TableCell>
                    <TableCell className={`text-right ${getStatusColor(item.status)}`}>
                      {item.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Add Attendance Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Attendance Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input 
                  type="date"
                  value={attendanceDetails.date} 
                  onChange={(e) => setAttendanceDetails({...attendanceDetails, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  value={attendanceDetails.subject} 
                  onChange={(e) => setAttendanceDetails({...attendanceDetails, subject: e.target.value})}
                  placeholder="Enter subject name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={attendanceDetails.status}
                  onChange={(e) => setAttendanceDetails({...attendanceDetails, status: e.target.value})}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAttendance}>Add Record</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <StudentBottomNav />
      </MobileContainer>
    </div>
  );
};

export default Attendance;
