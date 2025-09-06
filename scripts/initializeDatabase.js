import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp, getDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnCtNtyQs6pVmLf59tZ8JiFw5y3LQNapg",
  authDomain: "mu-mobile-application.firebaseapp.com",
  projectId: "mu-mobile-application",
  storageBucket: "mu-mobile-application.appspot.com",
  messagingSenderId: "1098979667132",
  appId: "1:1098979667132:web:c5d5e9f9c2c9e9f9c2c9e9"
};

console.log('Firebase Config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const sampleData = {
  users: [
    {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User',
      phone: '+91987654320'
    },
    {
      email: 'parent1@example.com',
      password: 'password123',
      role: 'parent',
      name: 'Rajesh Kumar',
      phone: '+91987654321'
    },
    {
      email: 'parent2@example.com',
      password: 'password123',
      role: 'parent',
      name: 'Priya Sharma',
      phone: '+91987654322'
    },
    {
      email: 'parent3@example.com',
      password: 'password123',
      role: 'parent',
      name: 'Amit Patel',
      phone: '+91987654323'
    },
    {
      email: 'faculty1@example.com',
      password: 'password123',
      role: 'faculty',
      name: 'Dr. Suresh Reddy',
      department: 'Computer Science',
      designation: 'Associate Professor'
    },
    {
      email: 'faculty2@example.com',
      password: 'password123',
      role: 'faculty',
      name: 'Dr. Priya Singh',
      department: 'Electronics',
      designation: 'Assistant Professor'
    }
  ],
  students: [
    {
      name: 'Rahul Kumar',
      rollNumber: 'CSE2024001',
      course: 'B.Tech CSE',
      year: '2nd Year',
      section: 'A',
      parentEmail: 'parent1@example.com',
      attendance: 85,
      cgpa: 8.5,
      department: 'Computer Science',
      semester: '4th Semester'
    },
    {
      name: 'Anjali Sharma',
      rollNumber: 'CSE2024002',
      course: 'B.Tech CSE',
      year: '2nd Year',
      section: 'A',
      parentEmail: 'parent2@example.com',
      attendance: 90,
      cgpa: 9.0,
      department: 'Computer Science',
      semester: '4th Semester'
    },
    {
      name: 'Rohan Patel',
      rollNumber: 'ECE2024001',
      course: 'B.Tech ECE',
      year: '2nd Year',
      section: 'B',
      parentEmail: 'parent3@example.com',
      attendance: 88,
      cgpa: 8.8,
      department: 'Electronics',
      semester: '4th Semester'
    }
  ],
  announcements: [
    {
      title: 'Welcome to New Semester',
      content: 'Welcome back students! We hope you had a great break. Classes will begin from Monday.',
      type: 'general',
      priority: 'high'
    },
    {
      title: 'Parent-Teacher Meeting',
      content: 'Parent-Teacher meeting is scheduled for next Saturday at 10 AM. All parents are requested to attend.',
      type: 'parent',
      priority: 'medium'
    },
    {
      title: 'Campus Placement Drive',
      content: 'Major IT companies will be visiting our campus next month for placements. Prepare well!',
      type: 'student',
      priority: 'high'
    },
    {
      title: 'Mid-Semester Exams',
      content: 'Mid-semester exams will be conducted from next week. Please check the schedule.',
      type: 'student',
      priority: 'high'
    }
  ],
  assignments: [
    {
      title: 'Data Structures Assignment',
      description: 'Implement a binary search tree with all operations',
      dueDate: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      course: 'B.Tech CSE',
      year: '2nd Year',
      section: 'A',
      department: 'Computer Science',
      createdBy: 'faculty1@example.com'
    },
    {
      title: 'Digital Electronics Lab',
      description: 'Design and implement a 4-bit adder circuit',
      dueDate: Timestamp.fromDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
      course: 'B.Tech ECE',
      year: '2nd Year',
      section: 'B',
      department: 'Electronics',
      createdBy: 'faculty2@example.com'
    }
  ]
};

async function getUserByEmail(email) {
  try {
    // Sign in with the user's credentials to get their UID
    const userCredential = await signInWithEmailAndPassword(auth, email, 'password123');
    return userCredential.user.uid;
  } catch (error) {
    console.error(`Error getting user by email ${email}:`, error);
    return null;
  }
}

async function createUser(userData) {
  try {
    console.log(`Creating/updating user: ${userData.email}`);
    let uid;

    // Try to get existing user
    uid = await getUserByEmail(userData.email);

    if (!uid) {
      // Create new user if doesn't exist
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      uid = userCredential.user.uid;
    }

    // Create or update user document
    const userDoc = {
      email: userData.email,
      role: userData.role,
      name: userData.name,
      updatedAt: Timestamp.now(),
      ...userData
    };
    delete userDoc.password;

    if (!uid) {
      userDoc.createdAt = Timestamp.now();
    }

    await setDoc(doc(db, 'users', uid), userDoc, { merge: true });
    console.log(`User document updated: ${userData.email} with role: ${userData.role}`);
    return uid;
  } catch (error) {
    console.error(`Error with user ${userData.email}:`, error);
    return null;
  }
}

async function createStudent(studentData, parentId) {
  try {
    console.log(`Creating student: ${studentData.name}`);
    // Check if student already exists
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('rollNumber', '==', studentData.rollNumber));
    const querySnapshot = await getDocs(q);
    
    let studentRef;
    if (!querySnapshot.empty) {
      studentRef = querySnapshot.docs[0].ref;
      console.log(`Student ${studentData.name} already exists, updating...`);
    } else {
      studentRef = doc(collection(db, 'students'));
    }

    const student = {
      ...studentData,
      parentId,
      id: studentRef.id,
      updatedAt: Timestamp.now()
    };

    if (querySnapshot.empty) {
      student.createdAt = Timestamp.now();
    }

    await setDoc(studentRef, student, { merge: true });

    // Create or update initial location
    const locationData = {
      latitude: 17.3850, // Hyderabad coordinates
      longitude: 78.4867,
      timestamp: Timestamp.now(),
      accuracy: 50,
      speed: 0,
      heading: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      isMoving: false,
      provider: 'gps',
      activity: 'still'
    };

    await setDoc(doc(db, 'locations', studentRef.id, 'tracking', 'current'), locationData, { merge: true });
    console.log(`Student data updated: ${studentData.name} with ID: ${studentRef.id}`);
    return studentRef.id;
  } catch (error) {
    console.error(`Error with student ${studentData.name}:`, error);
    throw error;
  }
}

async function createAssignment(assignmentData, facultyId) {
  try {
    console.log(`Creating assignment: ${assignmentData.title}`);
    const assignmentRef = doc(collection(db, 'assignments'));
    const assignment = {
      ...assignmentData,
      id: assignmentRef.id,
      facultyId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    await setDoc(assignmentRef, assignment);
    console.log(`Created assignment: ${assignmentData.title}`);
    return assignmentRef.id;
  } catch (error) {
    console.error(`Error creating assignment ${assignmentData.title}:`, error);
    throw error;
  }
}

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // Create/update users
    const userMap = {};
    for (const userData of sampleData.users) {
      const uid = await createUser(userData);
      if (uid) {
        userMap[userData.email] = uid;
      }
    }

    // Create/update students
    for (const studentData of sampleData.students) {
      const parentId = userMap[studentData.parentEmail];
      if (parentId) {
        await createStudent(studentData, parentId);
      } else {
        console.error(`Parent not found for student ${studentData.name}`);
      }
    }

    // Create/update announcements
    for (const announcementData of sampleData.announcements) {
      const announcementRef = doc(collection(db, 'announcements'));
      await setDoc(announcementRef, {
        ...announcementData,
        id: announcementRef.id,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log(`Created announcement: ${announcementData.title}`);
    }

    // Create assignments
    for (const assignmentData of sampleData.assignments) {
      const facultyId = userMap[assignmentData.createdBy];
      if (facultyId) {
        await createAssignment(assignmentData, facultyId);
      } else {
        console.error(`Faculty not found for assignment ${assignmentData.title}`);
      }
    }

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit(0);
  }
}

// Run the initialization
initializeDatabase(); 