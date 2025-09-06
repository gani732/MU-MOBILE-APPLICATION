export interface Course {
  id: string;
  courseId: string;
  courseName: string;
  instructor: string;
  department: string;
  semester: string;
  credits: number;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  description?: string;
  enrolledStudents?: string[]; // Array of student IDs
} 