import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  targetAudience: string;
  postedOn: string;
  createdBy: string;
  type?: 'general' | 'academic' | 'event';
  department?: string;
  attachments?: string[];
  priority?: 'low' | 'medium' | 'high';
  expiresAt?: string;
}

export const createSampleAnnouncement = async () => {
  try {
    const announcementData = {
      title: "Welcome to Mahindra University Connect",
      content: "This is a sample announcement to test the database connection.",
      targetAudience: "Everyone",
      postedOn: new Date().toISOString(),
      createdBy: "System"
    };
    
    const docRef = await addDoc(collection(db, 'announcements'), announcementData);
    console.log('Sample announcement created with ID:', docRef.id);
    return { id: docRef.id, ...announcementData };
  } catch (error) {
    console.error('Error creating sample announcement:', error);
    throw error;
  }
};

export const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'postedOn'>) => {
  try {
    console.log('Creating announcement with data:', announcement);
    const announcementData = {
      ...announcement,
      postedOn: new Date().toISOString(),
      type: announcement.type || 'general',
      priority: announcement.priority || 'medium',
      expiresAt: announcement.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    };
    console.log('Final announcement data:', announcementData);
    
    const docRef = await addDoc(collection(db, 'announcements'), announcementData);
    console.log('Announcement created with ID:', docRef.id);
    
    return { id: docRef.id, ...announcementData };
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

export const getAnnouncements = (userRole: string, callback: (announcements: Announcement[]) => void) => {
  try {
    console.log('Setting up announcements listener for role:', userRole);
    let q = query(collection(db, 'announcements'), orderBy('postedOn', 'desc'));
    
    // Filter announcements based on user role
    if (userRole !== 'admin') {
      q = query(
        collection(db, 'announcements'),
        where('targetAudience', 'in', ['Everyone', userRole]),
        orderBy('postedOn', 'desc')
      );
    }

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('Received snapshot with', querySnapshot.docs.length, 'documents');
      const announcements = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Announcement[];
      console.log('Processed announcements:', announcements);
      callback(announcements);
    }, (error) => {
      console.error('Error in announcements listener:', error);
    });

    // Return unsubscribe function to clean up listener
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up announcements listener:', error);
    throw error;
  }
};

export const updateAnnouncement = async (id: string, announcement: Partial<Announcement>) => {
  try {
    console.log('Updating announcement:', id, announcement);
    const announcementRef = doc(db, 'announcements', id);
    await updateDoc(announcementRef, announcement);
    console.log('Announcement updated successfully');
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    console.log('Deleting announcement:', id);
    await deleteDoc(doc(db, 'announcements', id));
    console.log('Announcement deleted successfully');
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};

export const createSampleAnnouncements = async () => {
  try {
    // First check if we can access Firestore
    console.log('Checking Firestore connection...');
    try {
      const testQuery = await getDocs(collection(db, 'announcements'));
      console.log('Firestore connection successful');
    } catch (error) {
      console.error('Firestore connection failed:', error);
      throw new Error('Failed to connect to Firestore. Please check your Firebase configuration.');
    }

    const sampleAnnouncements = [
      {
        title: "Welcome to Fall Semester 2024",
        content: "Dear students, welcome to the new academic semester! We're excited to have you back on campus. Please check your course schedules and ensure all registration requirements are complete.",
        targetAudience: "Everyone",
        type: "general",
        priority: "high",
        createdBy: "admin@mu.edu",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        title: "CSE Department - Project Showcase",
        content: "The Computer Science Department is organizing a project showcase on September 15th, 2024. All final year students are required to present their projects. Venue: Main Auditorium, Time: 10:00 AM",
        targetAudience: "CSE",
        department: "Computer Science",
        type: "academic",
        priority: "medium",
        createdBy: "hod.cse@mu.edu",
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        title: "Annual Tech Fest - TechnoVision 2024",
        content: "Get ready for the biggest tech fest of the year! Register now for workshops, hackathons, and exciting competitions. Early bird registration closes on August 30th.",
        targetAudience: "Everyone",
        type: "event",
        priority: "high",
        createdBy: "events@mu.edu",
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];

    console.log('Creating sample announcements...');
    for (const announcement of sampleAnnouncements) {
      try {
        const announcementData = {
          ...announcement,
          postedOn: new Date().toISOString()
        };
        console.log('Adding announcement:', announcementData);
        const docRef = await addDoc(collection(db, 'announcements'), announcementData);
        console.log('Created announcement with ID:', docRef.id);
      } catch (error) {
        console.error('Error creating individual announcement:', error);
        throw error;
      }
    }
    
    console.log('Successfully created all sample announcements');
    return true;
  } catch (error) {
    console.error('Error in createSampleAnnouncements:', error);
    throw error;
  }
}; 