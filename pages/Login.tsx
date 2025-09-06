import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { refreshAdminClaims } = useAuth();

  const determineUserRole = async (email: string): Promise<string> => {
    // Check if user is admin
    const adminQuery = query(
      collection(db, 'users'),
      where('role', '==', 'admin'),
      where('email', '==', email)
    );
    const adminSnapshot = await getDocs(adminQuery);
    
    if (!adminSnapshot.empty) {
      return 'admin';
    }
    
    // Extract the domain part of the email
    const domain = email.split('@')[1];
    
    // Check for other roles
    if (domain?.includes('faculty')) return 'faculty';
    if (domain?.includes('parent')) return 'parent';
    if (domain?.includes('student')) return 'student';
    
    // If no specific domain is found, check the email pattern
    if (email.includes('faculty')) return 'faculty';
    if (email.includes('parent')) return 'parent';
    if (email.includes('student')) return 'student';
    
    // Default to student if no role is determined
    return 'student';
  };

  const getDashboardPath = (role: string): string => {
    switch(role) {
      case 'student':
        return '/student/home';
      case 'parent':
        return '/parent/home';
      case 'faculty':
        return '/faculty/home';
      case 'admin':
        return '/admin/home';
      default:
        return '/student/home';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login for:', email);
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Get the user's Firestore document
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        console.log('User document not found');
        toast.error('User not found. Please contact support.');
        return;
      }

      const userData = userDoc.data();
      const role = userData.role;

      // If user is admin, ensure they have admin claims
      if (role === 'admin') {
        console.log('Setting admin claims for:', user.uid);
        try {
          // First try to set admin claims
          const response = await fetch('/api/auth/set-admin-claim', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: user.uid })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to set admin claims');
          }

          // Wait for claims to propagate
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Force token refresh
          await user.getIdToken(true);
          
          // Verify claims
          const idTokenResult = await user.getIdTokenResult();
          if (idTokenResult.claims.admin !== true) {
            throw new Error('Admin claims not set after refresh');
          }

          console.log('Admin claims set successfully');
        } catch (error) {
          console.error('Error setting admin claims:', error);
          toast.error('Failed to set admin permissions. Please try logging in again.');
          return;
        }
      }

      // Redirect based on role
      console.log('Login successful, redirecting with role:', role);
      navigate(getDashboardPath(role));
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </MobileContainer>
    </div>
  );
};

export default Login;
