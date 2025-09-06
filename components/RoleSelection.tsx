
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Role = 'student' | 'parent' | 'faculty' | 'admin';

const RoleCard: React.FC<{ role: Role; title: string; description: string; onClick: (role: Role) => void }> = ({ 
  role, 
  title, 
  description, 
  onClick 
}) => {
  return (
    <div 
      className="border rounded-lg p-6 cursor-pointer hover:border-primary transition-all"
      onClick={() => onClick(role)}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      <Button variant="outline" onClick={() => onClick(role)}>
        Continue as {title}
      </Button>
    </div>
  );
};

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRoleSelect = (role: Role) => {
    localStorage.setItem('userRole', role);
    
    switch(role) {
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
        navigate('/student/home');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
      <div className="w-full space-y-4">
        <RoleCard 
          role="student"
          title="Student" 
          description="Access your courses, assignments, and university updates"
          onClick={handleRoleSelect}
        />
        <RoleCard 
          role="parent" 
          title="Parent"
          description="Track your child's location and view university information"
          onClick={handleRoleSelect}
        />
        <RoleCard 
          role="faculty" 
          title="Faculty"
          description="Manage university announcements and student information"
          onClick={handleRoleSelect}
        />
        <RoleCard 
          role="admin" 
          title="Admin"
          description="Manage all users, announcements, and system settings"
          onClick={handleRoleSelect}
        />
      </div>
    </div>
  );
};

export default RoleSelection;
