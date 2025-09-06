import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'parent' | 'admin' | 'faculty';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait for auth state to be determined
    if (loading) return;

    // If not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // Special handling for admin role - check both role and claims
    if (requiredRole === 'admin' && (!user.isAdmin || user.role !== 'admin')) {
      console.log('Admin access denied:', { userRole: user.role, isAdmin: user.isAdmin });
      toast.error('You do not have permission to access this page. Please ensure you are logged in as an admin.');
      navigate('/login');
      return;
    }

    // For other roles, just check the role
    if (requiredRole && user.role !== requiredRole) {
      console.log('Role mismatch:', { userRole: user.role, requiredRole });
      switch(user.role) {
        case 'student':
          navigate('/student/home');
          break;
        case 'parent':
          navigate('/parent/home');
          break;
        case 'faculty':
          navigate('/faculty/home');
          break;
        case 'admin':
          navigate('/admin/home');
          break;
        default:
          navigate('/login');
      }
    }
  }, [user, loading, requiredRole, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show nothing (will be redirected)
  if (!user) {
    return null;
  }

  // Special handling for admin role - check both role and claims
  if (requiredRole === 'admin' && (!user.isAdmin || user.role !== 'admin')) {
    console.log('Admin access denied:', { userRole: user.role, isAdmin: user.isAdmin });
    return null;
  }

  // For other roles, just check the role
  if (requiredRole && user.role !== requiredRole) {
    console.log('Role mismatch, not rendering:', { userRole: user.role, requiredRole });
    return null;
  }

  // All checks passed, render the protected content
  return <>{children}</>;
};

export default RouteGuard;
