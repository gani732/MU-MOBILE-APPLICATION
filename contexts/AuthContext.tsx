import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { toast } from "sonner";

interface User {
  uid: string;
  email: string | null;
  name: string;
  role: 'admin' | 'faculty' | 'parent' | 'student';
  photoURL?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAdminClaims: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  refreshAdminClaims: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAdminClaims = async () => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    let retries = 0;
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 1000;

    while (retries < MAX_RETRIES) {
      try {
        console.log('Attempting to refresh admin claims...');
        
        // First, verify the user's role in Firestore
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (!userDoc.exists() || userDoc.data()?.role !== 'admin') {
          throw new Error('User is not an admin');
        }

        // Request admin claims from backend
        const response = await fetch('/api/auth/set-admin-claim', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: auth.currentUser.uid })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to set admin claims');
        }

        // Wait for claims to propagate
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        
        // Force token refresh and verify claims
        await auth.currentUser.getIdToken(true);
        const idTokenResult = await auth.currentUser.getIdTokenResult();
        
        if (idTokenResult.claims.admin === true) {
          console.log('Admin claims successfully set and verified');
          setUser(prev => prev ? { ...prev, isAdmin: true } : null);
          return;
        }

        console.log(`Admin claims not yet set, retrying... (Attempt ${retries + 1}/${MAX_RETRIES})`);
        retries++;
        
        if (retries === MAX_RETRIES) {
          throw new Error('Failed to verify admin claims after maximum retries');
        }
      } catch (error) {
        console.error('Error refreshing admin claims:', error);
        retries++;
        
        if (retries === MAX_RETRIES) {
          toast.error('Failed to set admin permissions. Please try logging out and in again.');
          throw error;
        }
        
        // Exponential backoff for retries
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, retries - 1)));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (!userDoc.exists()) {
            console.error('User document not found in Firestore');
            toast.error('User profile not found. Please contact support.');
            await signOut(auth);
            setUser(null);
            return;
          }

          const userData = userDoc.data();
          
          if (!userData.role) {
            console.error('User role not found in Firestore document');
            toast.error('User role not found. Please contact support.');
            await signOut(auth);
            setUser(null);
            return;
          }

          const idTokenResult = await firebaseUser.getIdTokenResult();
          const isAdmin = idTokenResult.claims.admin === true;

          localStorage.setItem('userRole', userData.role);
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: userData.name || userData.displayName || firebaseUser.email?.split('@')[0] || 'User',
            role: userData.role,
            photoURL: firebaseUser.photoURL || undefined,
            isAdmin
          });

          // If user is admin but doesn't have admin claims, try to set them
          if (userData.role === 'admin' && !isAdmin) {
            console.log('Admin user detected without claims, attempting to refresh...');
            try {
              await refreshAdminClaims();
            } catch (error) {
              console.error('Failed to refresh admin claims:', error);
              toast.error('Failed to set admin permissions. Please try logging out and in again.');
            }
          }
        } else {
          setUser(null);
          localStorage.removeItem('userRole');
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        toast.error('Authentication error. Please try logging in again.');
        setUser(null);
        localStorage.removeItem('userRole');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshAdminClaims }}>
      {children}
    </AuthContext.Provider>
  );
}; 