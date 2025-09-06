
export const handleLogout = (navigate: (path: string) => void) => {
  // Clear authentication
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  
  // Navigate to login
  navigate('/login');
};
