import { db } from '../config/firebase';
import { User } from '../types/user';
import { Course } from '../types/course';
import { Assignment } from '../types/assignment';
import { Announcement } from '../types/announcement';
import { Attendance } from '../types/attendance';

export class FirebaseService {
  // User Operations
  async getAllUsers(): Promise<User[]> {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  }

  async getUserById(userId: string): Promise<User | null> {
    const doc = await db.collection('users').doc(userId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as User;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const snapshot = await db.collection('users')
      .where('role', '==', role)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  }

  // Course Operations
  async getAllCourses(): Promise<Course[]> {
    const snapshot = await db.collection('courses').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  }

  async getCourseById(courseId: string): Promise<Course | null> {
    const doc = await db.collection('courses').doc(courseId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Course;
  }

  async getCoursesByDepartment(department: string): Promise<Course[]> {
    const snapshot = await db.collection('courses')
      .where('department', '==', department)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  }

  // Assignment Operations
  async getAllAssignments(): Promise<Assignment[]> {
    const snapshot = await db.collection('assignments')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
  }

  async getAssignments(courseId: string): Promise<Assignment[]> {
    const snapshot = await db.collection('assignments')
      .where('courseId', '==', courseId)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
  }

  async getAssignmentById(assignmentId: string): Promise<Assignment | null> {
    const doc = await db.collection('assignments').doc(assignmentId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Assignment;
  }

  async createAssignment(assignment: Omit<Assignment, 'id'>): Promise<string> {
    const docRef = await db.collection('assignments').add(assignment);
    return docRef.id;
  }

  async updateAssignment(id: string, data: Partial<Assignment>): Promise<void> {
    await db.collection('assignments').doc(id).update(data);
  }

  async deleteAssignment(id: string): Promise<void> {
    await db.collection('assignments').doc(id).delete();
  }

  // Announcement Operations
  async createAnnouncement(announcement: Omit<Announcement, 'id'>): Promise<string> {
    const docRef = await db.collection('announcements').add({
      ...announcement,
      postedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    const snapshot = await db.collection('announcements')
      .orderBy('postedAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
  }

  async getAnnouncementById(id: string): Promise<Announcement | null> {
    const doc = await db.collection('announcements').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Announcement;
  }

  async getAnnouncementsForUser(user: User): Promise<Announcement[]> {
    const now = new Date();
    const snapshot = await db.collection('announcements')
      .where('targetAudience.roles', 'array-contains', user.role.toLowerCase())
      .where('expiresAt', '>', now)
      .orderBy('expiresAt')
      .orderBy('postedAt', 'desc')
      .get();

    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Announcement))
      .filter(announcement => {
        // Additional filtering for department and batch
        if (announcement.targetAudience.departments?.length &&
            !announcement.targetAudience.departments.includes(user.department)) {
          return false;
        }
        if (announcement.targetAudience.batch &&
            user.batch !== announcement.targetAudience.batch) {
          return false;
        }
        return true;
      });
  }

  async updateAnnouncement(id: string, data: Partial<Announcement>): Promise<void> {
    await db.collection('announcements').doc(id).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  async deleteAnnouncement(id: string): Promise<void> {
    await db.collection('announcements').doc(id).delete();
  }

  // Real-time announcement updates
  onAnnouncementUpdate(callback: (announcements: Announcement[]) => void) {
    return db.collection('announcements')
      .orderBy('postedAt', 'desc')
      .onSnapshot(snapshot => {
        const announcements = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Announcement));
        callback(announcements);
      });
  }

  // Real-time listeners
  onUserUpdate(userId: string, callback: (user: User) => void) {
    return db.collection('users').doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          callback({ id: doc.id, ...doc.data() } as User);
        }
      });
  }

  onCourseUpdate(courseId: string, callback: (course: Course) => void) {
    return db.collection('courses').doc(courseId)
      .onSnapshot(doc => {
        if (doc.exists) {
          callback({ id: doc.id, ...doc.data() } as Course);
        }
      });
  }

  // Attendance Operations
  async getCourseAttendance(courseId: string): Promise<Attendance[]> {
    const snapshot = await db.collection('attendance')
      .where('courseId', '==', courseId)
      .orderBy('date', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Attendance));
  }

  async getStudentAttendance(studentId: string): Promise<Attendance[]> {
    const snapshot = await db.collection('attendance')
      .where('students.' + studentId, '==', true)
      .orderBy('date', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Attendance));
  }

  async markAttendance(attendance: Omit<Attendance, 'id'>): Promise<string> {
    const docRef = await db.collection('attendance').add(attendance);
    return docRef.id;
  }

  async updateAttendance(id: string, data: Partial<Attendance>): Promise<void> {
    await db.collection('attendance').doc(id).update(data);
  }
} 