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
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// User Services
export const getUserData = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, data);
};

// Announcement Services
export const getAnnouncements = async (role: string) => {
  const announcementsRef = collection(db, 'announcements');
  const q = query(announcementsRef, 
    where('targetRoles', 'array-contains', role),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createAnnouncement = async (data: any) => {
  const announcementsRef = collection(db, 'announcements');
  const newAnnouncement = {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  const docRef = await setDoc(doc(announcementsRef), newAnnouncement);
  return docRef;
};

// Assignment Services
export const getAssignments = async (userId: string, role: string) => {
  const assignmentsRef = collection(db, 'assignments');
  const q = query(assignmentsRef, 
    where('targetRoles', 'array-contains', role),
    orderBy('dueDate', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const submitAssignment = async (assignmentId: string, userId: string, submission: any) => {
  const submissionRef = doc(db, 'assignments', assignmentId, 'submissions', userId);
  await setDoc(submissionRef, {
    ...submission,
    submittedAt: Timestamp.now()
  });
};

// Attendance Services
export const markAttendance = async (userId: string, data: any) => {
  const attendanceRef = collection(db, 'attendance');
  const newAttendance = {
    ...data,
    userId,
    markedAt: Timestamp.now()
  };
  const docRef = await setDoc(doc(attendanceRef), newAttendance);
  return docRef;
};

export const getAttendance = async (userId: string) => {
  const attendanceRef = collection(db, 'attendance');
  const q = query(attendanceRef, 
    where('userId', '==', userId),
    orderBy('markedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Faculty Services
export const getFacultyStudents = async (facultyId: string) => {
  const studentsRef = collection(db, 'users');
  const q = query(studentsRef, 
    where('role', '==', 'student'),
    where('facultyId', '==', facultyId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Parent Services
export const getStudentProgress = async (studentId: string) => {
  const progressRef = collection(db, 'progress');
  const q = query(progressRef, where('studentId', '==', studentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Admin Services
export const getAllUsers = async (role?: string) => {
  const usersRef = collection(db, 'users');
  const q = role 
    ? query(usersRef, where('role', '==', role))
    : query(usersRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateUserRole = async (userId: string, role: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { role });
}; 