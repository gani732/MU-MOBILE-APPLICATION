import React, { useState } from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserCircle2, Edit, Key, Search, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const parentsData = [
  {
    id: 1,
    name: "James Wilson",
    email: "james.w@parent.edu",
    phone: "+1 234-567-8920",
    studentName: "Sarah Wilson",
    studentRollNo: "ME001"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.r@parent.edu",
    phone: "+1 234-567-8921",
    studentName: "Carlos Rodriguez",
    studentRollNo: "CSE045"
  },
  {
    id: 3,
    name: "Thomas Brown",
    email: "thomas.b@parent.edu",
    phone: "+1 234-567-8922",
    studentName: "John Doe",
    studentRollNo: "CSE001"
  },
  {
    id: 4,
    name: "Linda Smith",
    email: "linda.s@parent.edu",
    phone: "+1 234-567-8923",
    studentName: "Jane Smith",
    studentRollNo: "CSE002"
  }
];

const AdminParentsList: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogMode, setDialogMode] = useState<'edit' | 'password' | null>(null);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [editValues, setEditValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const filteredParents = parentsData.filter(parent => 
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.studentRollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (parent: any) => {
    setSelectedParent(parent);
    setEditValues({
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      password: ''
    });
    setDialogMode('edit');
  };

  const handleResetPassword = (parent: any) => {
    setSelectedParent(parent);
    setEditValues(prev => ({ ...prev, password: '' }));
    setDialogMode('password');
  };

  const handleSaveEdit = () => {
    toast.success(`Updated details for ${selectedParent.name}`);
    setDialogMode(null);
  };

  const handleSavePassword = () => {
    toast.success(`Password reset for ${selectedParent.name}`);
    setDialogMode(null);
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Parents List</h1>
            <UserCircle2 className="h-6 w-6 text-primary" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search by name or student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredParents.map((parent) => (
              <Card key={parent.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{parent.name}</h3>
                      <p className="text-sm text-gray-500">Parent of {parent.studentName}</p>
                    </div>
                    <span className="text-primary font-medium">
                      {parent.studentRollNo}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>{parent.email}</p>
                    <p>{parent.phone}</p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(parent)}
                      className="flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResetPassword(parent)}
                      className="flex items-center"
                    >
                      <Key className="h-4 w-4 mr-1" /> Reset Password
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        toast.success(`Deleted parent ${parent.name}`);
                        // In a real app, you would delete the parent from the database
                      }}
                      className="flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AdminBottomNav />

        <Dialog open={dialogMode === 'edit'} onOpenChange={(open) => !open && setDialogMode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Parent Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input 
                  value={editValues.name} 
                  onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={editValues.email} 
                  onChange={(e) => setEditValues({...editValues, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input 
                  value={editValues.phone} 
                  onChange={(e) => setEditValues({...editValues, phone: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogMode(null)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={dialogMode === 'password'} onOpenChange={(open) => !open && setDialogMode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm">Enter a new password for {selectedParent?.name}</p>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input 
                  type="password"
                  value={editValues.password} 
                  onChange={(e) => setEditValues({...editValues, password: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogMode(null)}>Cancel</Button>
              <Button onClick={handleSavePassword}>Reset Password</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MobileContainer>
    </div>
  );
};

export default AdminParentsList;
