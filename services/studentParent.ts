import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, onSnapshot, FirestoreError } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db, auth } from './firebase';

export interface StudentParent {
  id?: string;
  studentId: string;
  parentId: string;
  studentName: string;
  parentName: string;
  studentEmail: string;
  parentEmail: string;
  relationship: 'father' | 'mother' | 'guardian';
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

const ensureAuth = () => {
  if (!auth.currentUser) {
    throw new Error('Authentication required');
  }
};

const handleFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'permission-denied':
      throw new Error('You do not have permission to perform this action. Please ensure you are logged in as an admin.');
    case 'not-found':
      throw new Error('The requested resource was not found.');
    case 'already-exists':
      throw new Error('A link already exists between this student and parent.');
    default:
      console.error('Firebase error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
  }
};

export const createStudentParentLink = async (data: Omit<StudentParent, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    ensureAuth();

    // Validate required fields
    if (!data.studentId || !data.parentId || !data.relationship || !data.status) {
      throw new Error('Missing required fields');
    }

    // Check if a link already exists
    const existingQuery = query(
      collection(db, 'studentParent'),
      where('studentId', '==', data.studentId),
      where('parentId', '==', data.parentId),
      where('status', '==', 'active')
    );
    
    const existingDocs = await getDocs(existingQuery);
    if (!existingDocs.empty) {
      throw new Error('A link already exists between this student and parent');
    }

    const studentParentData = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: auth.currentUser.uid
    };

    const docRef = await addDoc(collection(db, 'studentParent'), studentParentData);
    console.log('Successfully created student-parent link with ID:', docRef.id);
    return { id: docRef.id, ...studentParentData };
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleFirebaseError(error);
    }
    throw error;
  }
};

export const getStudentParentLinks = (callback: (links: StudentParent[]) => void) => {
  try {
    ensureAuth();
    
    const q = query(
      collection(db, 'studentParent'),
      where('status', '==', 'active')
    );
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const links = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StudentParent[];
        callback(links);
      },
      (error) => {
        console.error('Error fetching student-parent links:', error);
        if (error.code === 'permission-denied') {
          callback([]);
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up student-parent links listener:', error);
    throw error;
  }
};

export const updateStudentParentLink = async (id: string, data: Partial<StudentParent>) => {
  try {
    ensureAuth();
    
    const linkRef = doc(db, 'studentParent', id);
    await updateDoc(linkRef, {
      ...data,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid
    });
  } catch (error) {
    console.error('Error updating student-parent link:', error);
    if (error instanceof Error && error.message.includes('permission-denied')) {
      throw new Error('You do not have permission to update this link');
    }
    throw error;
  }
};

export const deleteStudentParentLink = async (id: string) => {
  try {
    ensureAuth();
    
    const linkRef = doc(db, 'studentParent', id);
    await updateDoc(linkRef, {
      status: 'inactive',
      updatedAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid
    });
  } catch (error) {
    console.error('Error deleting student-parent link:', error);
    if (error instanceof Error && error.message.includes('permission-denied')) {
      throw new Error('You do not have permission to delete this link');
    }
    throw error;
  }
};

export const getStudentByParentId = async (parentId: string) => {
  try {
    ensureAuth();
    
    const q = query(
      collection(db, 'studentParent'),
      where('parentId', '==', parentId),
      where('status', '==', 'active')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StudentParent[];
  } catch (error) {
    console.error('Error getting student by parent ID:', error);
    throw error;
  }
};

export const getParentByStudentId = async (studentId: string) => {
  try {
    ensureAuth();
    
    const q = query(
      collection(db, 'studentParent'),
      where('studentId', '==', studentId),
      where('status', '==', 'active')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StudentParent[];
  } catch (error) {
    console.error('Error getting parent by student ID:', error);
    throw error;
  }
}; 