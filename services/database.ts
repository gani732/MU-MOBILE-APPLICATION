import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  PARENTS: 'parents',
  FACULTY: 'faculty',
  ADMIN: 'admin',
  COURSES: 'courses',
  ASSIGNMENTS: 'assignments',
  SUBMISSIONS: 'submissions',
  ATTENDANCE: 'attendance',
  ANNOUNCEMENTS: 'announcements',
  NOTIFICATIONS: 'notifications'
};

// User Types
export type UserRole = 'student' | 'parent' | 'faculty' | 'admin';

// Base User Interface
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Student Interface
export interface Student extends BaseUser {
  rollNumber: string;
  admissionNumber: string;
  dateOfBirth: Timestamp;
  gender: string;
  bloodGroup?: string;
  course: string;
  semester: number;
  batch: string;
  section?: string;
  parentId?: string;
}

// Parent Interface
export interface Parent extends BaseUser {
  occupation?: string;
  relationship: 'father' | 'mother' | 'guardian';
  studentIds: string[];
}

// Faculty Interface
export interface Faculty extends BaseUser {
  employeeId: string;
  department: string;
  designation: string;
  qualification: string;
  joiningDate: Timestamp;
  specialization?: string;
  courseIds: string[];
}

// Admin Interface
export interface Admin extends BaseUser {
  employeeId: string;
  department: string;
  designation: string;
  joiningDate: Timestamp;
}

// Course Interface
export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  semester: number;
  department: string;
  facultyId: string;
}

// Assignment Interface
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Timestamp;
  totalMarks: number;
  courseId: string;
  facultyId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Assignment Submission Interface
export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionDate: Timestamp;
  fileUrl?: string;
  marksObtained?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

// Attendance Interface
export interface Attendance {
  id: string;
  studentId: string;
  facultyId: string;
  date: Timestamp;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

// Announcement Interface
export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'students' | 'parents' | 'faculty';
  createdById: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Notification Interface
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'assignment' | 'attendance' | 'grade';
  userId: string;
  parentId?: string;
  isRead: boolean;
  createdAt: Timestamp;
}

// Database Services
export const createUser = async (userData: Omit<BaseUser, 'id' | 'createdAt' | 'updatedAt'>) => {
  const userRef = doc(collection(db, COLLECTIONS.USERS));
  const user = {
    ...userData,
    id: userRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  await setDoc(userRef, user);
  return user;
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() as BaseUser : null;
};

export const updateUser = async (userId: string, data: Partial<BaseUser>) => {
  const userRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: Timestamp.now()
  });
};

// Student Services
export const createStudent = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
  const studentRef = doc(collection(db, COLLECTIONS.STUDENTS));
  const student = {
    ...studentData,
    id: studentRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  await setDoc(studentRef, student);
  return student;
};

export const getStudent = async (studentId: string) => {
  const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
  const studentSnap = await getDoc(studentRef);
  return studentSnap.exists() ? studentSnap.data() as Student : null;
};

// Parent Services
export const createParent = async (parentData: Omit<Parent, 'id' | 'createdAt' | 'updatedAt'>) => {
  const parentRef = doc(collection(db, COLLECTIONS.PARENTS));
  const parent = {
    ...parentData,
    id: parentRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  await setDoc(parentRef, parent);
  return parent;
};

// Faculty Services
export const createFaculty = async (facultyData: Omit<Faculty, 'id' | 'createdAt' | 'updatedAt'>) => {
  const facultyRef = doc(collection(db, COLLECTIONS.FACULTY));
  const faculty = {
    ...facultyData,
    id: facultyRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  await setDoc(facultyRef, faculty);
  return faculty;
};

// Course Services
export const createCourse = async (courseData: Omit<Course, 'id'>) => {
  const courseRef = doc(collection(db, COLLECTIONS.COURSES));
  const course = {
    ...courseData,
    id: courseRef.id
  };
  await setDoc(courseRef, course);
  return course;
};

// Assignment Services
export const createAssignment = async (assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) => {
  const assignmentRef = doc(collection(db, COLLECTIONS.ASSIGNMENTS));
  const assignment = {
    ...assignmentData,
    id: assignmentRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  await setDoc(assignmentRef, assignment);
  return assignment;
};

// Attendance Services
export const markAttendance = async (attendanceData: Omit<Attendance, 'id'>) => {
  const attendanceRef = doc(collection(db, COLLECTIONS.ATTENDANCE));
  const attendance = {
    ...attendanceData,
    id: attendanceRef.id
  };
  await setDoc(attendanceRef, attendance);
  return attendance;
};

// Announcement Services
export const createAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => {
  const announcementRef = doc(collection(db, COLLECTIONS.ANNOUNCEMENTS));
  const announcement = {
    ...announcementData,
    id: announcementRef.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  await setDoc(announcementRef, announcement);
  return announcement;
};

// Notification Services
export const createNotification = async (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
  const notificationRef = doc(collection(db, COLLECTIONS.NOTIFICATIONS));
  const notification = {
    ...notificationData,
    id: notificationRef.id,
    createdAt: Timestamp.now()
  };
  await setDoc(notificationRef, notification);
  return notification;
}; 