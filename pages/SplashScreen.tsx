
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer';
import { useIsMobile } from '@/hooks/use-mobile';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    const timer = setTimeout(() => {
      if (isLoggedIn && userRole) {
        // If logged in and role is set, navigate to the appropriate dashboard
        switch(userRole) {
          case 'student':
            navigate('/student/home');
            break;
          case 'parent':
            navigate('/parent/home');
            break;
          case 'admin':
            navigate('/admin/home');
            break;
          default:
            navigate('/login');
        }
      } else {
        // If not logged in, navigate to login screen
        navigate('/login');
      }
    }, 2000); // Show splash screen for 2 seconds
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={isMobile ? '' : 'bg-gray-100 min-h-screen flex items-center justify-center'}>
      <MobileContainer>
        <div className="h-full flex flex-col items-center justify-center bg-white">
          <div className="animate-pulse">
            <h1 className="text-3xl font-bold mb-2 text-center text-mu-red">Mahindra University</h1>
            <p className="text-gray-500 text-center">Your campus companion</p>
          </div>
        </div>
      </MobileContainer>
    </div>
  );
};

export default SplashScreen;
