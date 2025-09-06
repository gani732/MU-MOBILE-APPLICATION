import React, { useState, useEffect } from 'react';
import MobileContainer from '../components/MobileContainer';
import StudentBottomNav from '../components/student/StudentBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Loader2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { collection, query, where, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { seedDatabase } from '@/utils/seedData';

interface AttendanceRecord {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  createdAt: string;
}

interface AttendanceDetails {
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late';
}

const Attendance: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [attendanceDetails, setAttendanceDetails] = useState<AttendanceDetails>({
    date: '',
    subject: '',
    status: 'present'
  });

  // Calculate semester-wise attendance
  const calculateSemesterAttendance = (records: AttendanceRecord[]) => {
    const semesterData = new Map<string, { total: number; present: number }>();
    
    records.forEach(record => {
      const semester = record.subject || 'Unknown';
      
      if (!semesterData.has(semester)) {
        semesterData.set(semester, { total: 0, present: 0 });
      }
      
      const data = semesterData.get(semester)!;
      data.total++;
      if (record.status === 'present') {
        data.present++;
      }
    });

    return Array.from(semesterData.entries()).map(([semester, data]) => ({
      semester,
      total: data.total,
      present: data.present,
      percentage: Math.round((data.present / data.total) * 100),
      status: getStatus(Math.round((data.present / data.total) * 100))
    }));
  };

  const getStatus = (percentage: number) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Good';
    return 'Needs Improvement';
  };

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

  const handleSeedDatabase = async () => {
    if (!user?.uid) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive"
      });
      return;
    }

    try {
      setSeeding(true);
      await seedDatabase();
      toast({
        title: "Success",
        description: "Sample data added successfully",
      });
      fetchAttendance();
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: "Error",
        description: "Failed to add sample data",
        variant: "destructive"
      });
    } finally {
      setSeeding(false);
    }
  };

  // Fetch attendance data
  const fetchAttendance = async () => {
    if (!user?.uid) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const attendanceRef = collection(db, 'attendance');
      const q = query(
        attendanceRef,
        where('studentId', '==', user.uid),
        orderBy('date', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AttendanceRecord[];
      
      setAttendanceRecords(records);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setError('Failed to fetch attendance records');
      toast({
        title: "Error",
        description: "Failed to fetch attendance records",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [user?.uid]);

  const handleAddAttendance = async () => {
    if (!attendanceDetails.date || !attendanceDetails.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const attendanceRef = collection(db, 'attendance');
      const newAttendance = {
        ...attendanceDetails,
        studentId: user?.uid,
        createdAt: new Date().toISOString()
      };

      await addDoc(attendanceRef, newAttendance);
      
      toast({
        title: "Success",
        description: `Added ${attendanceDetails.status} attendance for ${attendanceDetails.subject}`,
      });
      
      setOpen(false);
      // Reset form
      setAttendanceDetails({
        date: '',
        subject: '',
        status: 'present'
      });
      
      // Refresh attendance data
      fetchAttendance();
    } catch (err) {
      console.error('Error adding attendance:', err);
      toast({
        title: "Error",
        description: "Failed to add attendance record",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry
            </Button>
            <Button 
              onClick={handleSeedDatabase} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={seeding}
            >
              {seeding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adding Sample Data...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Add Sample Data
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const attendanceData = calculateSemesterAttendance(attendanceRecords);
  const totalClasses = attendanceRecords.length;
  const totalPresent = attendanceRecords.filter(r => r.status === 'present').length;
  const averageAttendance = totalClasses > 0 
    ? Math.round((totalPresent / totalClasses) * 100) 
    : 0;

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-4 pb-20 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Attendance Overview</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleSeedDatabase}
                disabled={seeding}
              >
                {seeding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Database className="h-4 w-4" />
                )}
              </Button>
              <Button 
                onClick={() => setOpen(true)}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] flex items-center gap-2"
                size="sm"
              >
                <PlusCircle size={16} />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>
          
          {/* Summary Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Average</p>
                  <p className="text-xl font-bold text-green-600">{averageAttendance}%</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-xl font-bold text-blue-600">{totalPresent}</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-lg col-span-2 sm:col-span-1">
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-xl font-bold text-yellow-600">{totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Semester-wise Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Subject</TableHead>
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
                  onChange={(e) => setAttendanceDetails({
                    ...attendanceDetails, 
                    status: e.target.value as AttendanceDetails['status']
                  })}
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
