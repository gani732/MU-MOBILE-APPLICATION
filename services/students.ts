import { collection, addDoc, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Student {
  id?: string;
  name: string;
  rollNumber: string;
  course: string;
  year: string;
  parentId: string;
}

export const getStudentByParentId = async (parentId: string) => {
  const studentsRef = collection(db, 'students');
  const q = query(studentsRef, where('parentId', '==', parentId));
  const snapshot = await getDocs(q);
  
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  
  return null;
};

export const createSampleStudent = async (parentId: string) => {
  try {
    // First check if a student already exists for this parent
    const existingStudent = await getStudentByParentId(parentId);
    if (existingStudent) {
      console.log('Student already exists for this parent');
      return existingStudent;
    }

    const studentData = {
      name: "John Smith",
      rollNumber: "CSE2024001",
      course: "B.Tech CSE",
      year: "2nd Year",
      parentId: parentId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'students'), studentData);
    console.log('Sample student created with ID:', docRef.id);

    // Create initial location data
    const locationData = {
      latitude: 17.3850, // Default to Hyderabad coordinates
      longitude: 78.4867,
      timestamp: new Date(),
      accuracy: 50,
      speed: 0,
      heading: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      isMoving: false,
      provider: 'gps',
      activity: 'still'
    };

    // Create a 'tracking' subcollection in the 'locations' collection
    const locationRef = doc(db, 'locations', docRef.id, 'tracking', 'current');
    await setDoc(locationRef, locationData);
    console.log('Initial location data created for student');

    return { id: docRef.id, ...studentData };
  } catch (error) {
    console.error('Error creating sample student:', error);
    throw error;
  }
};

export const ensureStudentExists = async (parentId: string) => {
  try {
    const student = await getStudentByParentId(parentId);
    if (student) {
      return student;
    }
    return await createSampleStudent(parentId);
  } catch (error) {
    console.error('Error ensuring student exists:', error);
    throw error;
  }
}; 