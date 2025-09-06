export interface Attendance {
  id: string;
  courseId: string;
  date: Date;
  students: {
    [studentId: string]: boolean;  // studentId -> present/absent
  };
  markedBy: string;
  markedAt: Date;
  totalPresent: number;
  updatedAt?: Date;
  notes?: string;
} 