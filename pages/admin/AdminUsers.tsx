import React, { useState, useEffect } from 'react';
import MobileContainer from '../../components/MobileContainer';
import AdminBottomNav from '../../components/admin/AdminBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Users, Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  identifier?: string;
  info?: string;
}

const AdminUsers: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return;
    
    if (currentUser.role !== 'admin' || !currentUser.isAdmin) {
      toast.error('Only administrators can access this page');
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        const fetchedUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error instanceof Error && error.message.includes('permission-denied')) {
          toast.error('You do not have permission to view users. Please ensure you are logged in as an admin.');
        } else {
          toast.error('Failed to fetch users');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, authLoading, navigate]);

  const filteredUsers = users.filter(user => {
    if (activeTab !== 'all' && user.role !== activeTab) {
      return false;
    }
    
    return (
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.identifier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.info?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleViewDetails = (user: User) => {
    switch (user.role) {
      case 'student':
        navigate('/admin/students');
        break;
      case 'faculty':
        navigate('/admin/faculty');
        break;
      case 'parent':
        navigate('/admin/parents');
        break;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <div className="h-2 w-2 rounded-full bg-blue-500" />;
      case 'faculty':
        return <div className="h-2 w-2 rounded-full bg-green-500" />;
      case 'parent':
        return <div className="h-2 w-2 rounded-full bg-purple-500" />;
      default:
        return null;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'faculty':
        return 'Faculty';
      case 'parent':
        return 'Parent';
      default:
        return role;
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
            <h1 className="text-2xl font-bold">All Users</h1>
            <Users className="h-6 w-6 text-primary" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="student">Students</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="parent">Parents</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <h3 className="font-semibold">{user.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {getRoleText(user.role)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600">{user.identifier}</p>
                      <p className="text-primary">{user.info}</p>
                    </div>
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(user)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No users found matching your search.
              </div>
            )}
          </div>
        </div>
        <AdminBottomNav />
      </MobileContainer>
    </div>
  );
};

export default AdminUsers;
