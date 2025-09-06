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

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  specialization: string;
}

const AdminFacultyList: React.FC = () => {
  const isMobile = useIsMobile();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogMode, setDialogMode] = useState<'edit' | 'password' | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
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

    const fetchFaculty = async () => {
      try {
        setIsLoading(true);
        const facultyRef = collection(db, 'users');
        const q = query(facultyRef, where('role', '==', 'faculty'));
        const snapshot = await getDocs(q);
        
        const fetchedFaculty = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Faculty[];

        setFaculty(fetchedFaculty);
      } catch (error) {
        console.error('Error fetching faculty:', error);
        if (error instanceof Error && error.message.includes('permission-denied')) {
          toast.error('You do not have permission to view faculty. Please ensure you are logged in as an admin.');
        } else {
          toast.error('Failed to fetch faculty');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, [currentUser, authLoading]);

  const filteredFaculty = faculty.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (member: Faculty) => {
    setSelectedFaculty(member);
    setEditValues({
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      password: ''
    });
    setDialogMode('edit');
  };

  const handleResetPassword = (member: Faculty) => {
    setSelectedFaculty(member);
    setEditValues(prev => ({ ...prev, password: '' }));
    setDialogMode('password');
  };

  const handleSaveEdit = async () => {
    if (!selectedFaculty || !currentUser || currentUser.role !== 'admin' || !currentUser.isAdmin) {
      toast.error('Unauthorized action');
      return;
    }

    try {
      const facultyRef = doc(db, 'users', selectedFaculty.id);
      await updateDoc(facultyRef, {
        name: editValues.name,
        email: editValues.email,
        phone: editValues.phone,
        updatedAt: new Date(),
        updatedBy: currentUser.uid
      });

      // Update local state
      setFaculty(prev => prev.map(member => 
        member.id === selectedFaculty.id 
          ? { ...member, ...editValues }
          : member
      ));

      toast.success(`Updated details for ${selectedFaculty.name}`);
      setDialogMode(null);
    } catch (error) {
      console.error('Error updating faculty:', error);
      toast.error('Failed to update faculty details');
    }
  };

  const handleSavePassword = async () => {
    if (!selectedFaculty || !currentUser || currentUser.role !== 'admin' || !currentUser.isAdmin) {
      toast.error('Unauthorized action');
      return;
    }

    try {
      // Here you would typically call an API endpoint to reset the password
      // For security reasons, password reset should be handled by a backend service
      toast.success(`Password reset request sent for ${selectedFaculty.name}`);
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
            <h1 className="text-2xl font-bold">Faculty List</h1>
            <User className="h-6 w-6 text-primary" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredFaculty.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                      {member.designation}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{member.department}</p>
                    <p className="text-sm text-gray-600">Specialization: {member.specialization}</p>
                  </div>
                  <div className="mt-3 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      Edit Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResetPassword(member)}
                    >
                      Reset Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredFaculty.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No faculty found matching your search.
              </div>
            )}
          </div>
        </div>

        <Dialog open={dialogMode === 'edit'} onOpenChange={() => setDialogMode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Faculty Details</DialogTitle>
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

export default AdminFacultyList;
