import React, { useState, useEffect } from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  createStudentParentLink, 
  getStudentParentLinks, 
  deleteStudentParentLink,
  StudentParent 
} from '../../services/studentParent';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { auth } from '../../services/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent';
}

const ManageStudentParent: React.FC = () => {
  const isMobile = useIsMobile();
  const { user, loading: authLoading } = useAuth();
  const [links, setLinks] = useState<StudentParent[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [parents, setParents] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    parentId: '',
    relationship: 'father' as 'father' | 'mother' | 'guardian'
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    
    // Check for both admin role and admin claims
    if (!user.isAdmin || user.role !== 'admin') {
      toast.error('You do not have permission to perform this action. Please ensure you are logged in as an admin.');
      return;
    }

    let unsubscribe: () => void;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Verify admin token before proceeding
        const idTokenResult = await auth.currentUser?.getIdTokenResult();
        if (!idTokenResult?.claims.admin) {
          throw new Error('Admin permissions not set. Please try logging out and in again.');
        }

        // Fetch all active student-parent links
        unsubscribe = getStudentParentLinks((data) => {
          setLinks(data);
          setIsLoading(false);
        });

        // Fetch all students and parents
        const studentsQuery = query(
          collection(db, 'users'),
          where('role', '==', 'student')
        );
        const parentsQuery = query(
          collection(db, 'users'),
          where('role', '==', 'parent')
        );

        const [studentsSnapshot, parentsSnapshot] = await Promise.all([
          getDocs(studentsQuery),
          getDocs(parentsQuery)
        ]);

        setStudents(studentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[]);

        setParents(parentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[]);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error instanceof Error) {
          if (error.message.includes('permission-denied')) {
            toast.error('You do not have permission to access this data. Please ensure you are logged in as an admin.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error('Failed to fetch data');
        }
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || user.role !== 'admin' || !user.isAdmin) {
      toast.error('Only administrators can perform this action');
      return;
    }

    try {
      setIsSubmitting(true);

      // Verify admin token before proceeding
      const idTokenResult = await auth.currentUser?.getIdTokenResult();
      if (!idTokenResult?.claims.admin) {
        throw new Error('Admin permissions not set. Please try logging out and in again.');
      }

      const selectedStudent = students.find(s => s.id === formData.studentId);
      const selectedParent = parents.find(p => p.id === formData.parentId);

      if (!selectedStudent || !selectedParent) {
        toast.error('Please select both student and parent');
        return;
      }

      if (!formData.relationship) {
        toast.error('Please select a relationship');
        return;
      }

      await createStudentParentLink({
        studentId: formData.studentId,
        parentId: formData.parentId,
        studentName: selectedStudent.name,
        parentName: selectedParent.name,
        studentEmail: selectedStudent.email,
        parentEmail: selectedParent.email,
        relationship: formData.relationship,
        status: 'active'
      });

      toast.success('Student-Parent link created successfully');
      setFormData({
        studentId: '',
        parentId: '',
        relationship: 'father' as 'father' | 'mother' | 'guardian'
      });
    } catch (error) {
      console.error('Error creating link:', error);
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          toast.error('You do not have permission to create student-parent links. Please ensure you are logged in as an admin.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to create link');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user || user.role !== 'admin' || !user.isAdmin) {
      toast.error('Only administrators can perform this action');
      return;
    }

    try {
      // Verify admin token before proceeding
      const idTokenResult = await auth.currentUser?.getIdTokenResult();
      if (!idTokenResult?.claims.admin) {
        throw new Error('Admin permissions not set. Please try logging out and in again.');
      }

      await deleteStudentParentLink(id);
      toast.success('Link deleted successfully');
    } catch (error) {
      console.error('Error deleting link:', error);
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          toast.error('You do not have permission to delete student-parent links. Please ensure you are logged in as an admin.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to delete link');
      }
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please log in to access this page</p>
      </div>
    );
  }

  if (user.role !== 'admin' || !user.isAdmin) {
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
          <h1 className="text-2xl font-bold mb-6">Manage Student-Parent Links</h1>

          {/* Create New Link Form */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Create New Link</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Student</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Parent</Label>
                  <Select
                    value={formData.parentId}
                    onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {parents.map(parent => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {parent.name} ({parent.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => setFormData({ ...formData, relationship: value as 'father' | 'mother' | 'guardian' })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Link'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Links */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Existing Links</h2>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : links.length === 0 ? (
                  <p className="text-center text-gray-500">No links found</p>
                ) : (
                  links.map(link => (
                    <div key={link.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{link.studentName}</p>
                          <p className="text-sm text-gray-500">{link.studentEmail}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{link.parentName}</p>
                          <p className="text-sm text-gray-500">{link.parentEmail}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Relationship: {link.relationship}
                        </span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(link.id!)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default ManageStudentParent; 