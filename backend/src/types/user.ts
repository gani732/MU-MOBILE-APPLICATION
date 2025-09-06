export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;
  batch?: string;
  studentId?: string;
  createdAt: Date;
  isActive: boolean;
  profilePicture?: string;
} 