export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  description: string;
  dueDate: Date;
  totalMarks: number;
  attachments?: string[]; // Array of attachment URLs
  submissions?: {
    studentId: string;
    submittedAt: Date;
    attachments: string[];
    grade?: number;
    feedback?: string;
  }[];
} 