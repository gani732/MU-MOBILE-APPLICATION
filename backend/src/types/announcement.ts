export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedBy: string; // User ID of the faculty/admin who posted
  postedAt: Date;
  type: 'general' | 'academic' | 'event';
  department?: string; // Optional: specific to a department
  attachments?: string[]; // Array of attachment URLs
  targetAudience: {
    roles: ('student' | 'faculty' | 'admin')[]; // Who should see this
    departments?: string[]; // Optional: specific departments
    batch?: string; // Optional: specific batch
  };
  priority: 'low' | 'medium' | 'high';
  expiresAt?: Date; // Optional: when the announcement expires
} 