import React, { useState, useEffect } from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  rollNo: string;
  department: string;
  batch: string;
  section: string;
}

const AdminStudentsList: React.FC = () => {
  const isMobile = useIsMobile();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogMode, setDialogMode] = useState<'edit' | 'password' | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editValues, setEditValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return;
    
    if (currentUser.role !== 'admin' || !currentUser.isAdmin) {
      toast.error('Only administrators can access this page');
      return;
    }

    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const studentsRef = collection(db, 'users');
        const q = query(studentsRef, where('role', '==', 'student'));
        const snapshot = await getDocs(q);
        
        const fetchedStudents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Student[];

        setStudents(fetchedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
        if (error instanceof Error && error.message.includes('permission-denied')) {
          toast.error('You do not have permission to view students. Please ensure you are logged in as an admin.');
        } else {
          toast.error('Failed to fetch students');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [currentUser, authLoading]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setEditValues({
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      password: ''
    });
    setDialogMode('edit');
  };

  const handleResetPassword = (student: Student) => {
    setSelectedStudent(student);
    setEditValues(prev => ({ ...prev, password: '' }));
    setDialogMode('password');
  };

  const handleSaveEdit = async () => {
    if (!selectedStudent || !currentUser || currentUser.role !== 'admin' || !currentUser.isAdmin) {
      toast.error('Unauthorized action');
      return;
    }

    try {
      const studentRef = doc(db, 'users', selectedStudent.id);
      await updateDoc(studentRef, {
        name: editValues.name,
        email: editValues.email,
        phone: editValues.phone,
        updatedAt: new Date(),
        updatedBy: currentUser.uid
      });

      // Update local state
      setStudents(prev => prev.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, ...editValues }
          : student
      ));

      toast.success(`Updated details for ${selectedStudent.name}`);
      setDialogMode(null);
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student details');
    }
  };

  const handleSavePassword = async () => {
    if (!selectedStudent || !currentUser || currentUser.role !== 'admin' || !currentUser.isAdmin) {
      toast.error('Unauthorized action');
      return;
    }

    try {
      // Here you would typically call an API endpoint to reset the password
      // For security reasons, password reset should be handled by a backend service
      toast.success(`Password reset request sent for ${selectedStudent.name}`);
      setDialogMode(null);
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please log in to access this page</p>
      </div>
    );
  }

  if (currentUser.role !== 'admin' || !currentUser.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Only administrators can access this page</p>
      </div>
    );
  }

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Students List</h1>
            <User className="h-6 w-6 text-primary" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                      {student.rollNo}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{student.department}</p>
                    <p className="text-sm text-gray-600">Batch: {student.batch} | Section: {student.section}</p>
                  </div>
                  <div className="mt-3 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(student)}
                    >
                      Edit Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResetPassword(student)}
                    >
                      Reset Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No students found matching your search.
              </div>
            )}
          </div>
        </div>

        <Dialog open={dialogMode === 'edit'} onOpenChange={() => setDialogMode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editValues.name}
                  onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={editValues.email}
                  onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={editValues.phone}
                  onChange={(e) => setEditValues(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogMode(null)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={dialogMode === 'password'} onOpenChange={() => setDialogMode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={editValues.password}
                  onChange={(e) => setEditValues(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogMode(null)}>Cancel</Button>
              <Button onClick={handleSavePassword}>Reset Password</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default AdminStudentsList;
