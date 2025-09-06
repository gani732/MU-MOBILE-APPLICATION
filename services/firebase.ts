import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Log Firebase configuration (without sensitive data)
console.log('Firebase Configuration:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
});

let auth;
let db;

try {
  // Initialize Firebase only if it hasn't been initialized already
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
  
  // Initialize services
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Firebase services (Auth & Firestore) initialized');

  // Test Firestore connection
  const testFirestore = async () => {
    try {
      const testCollection = collection(db, 'test');
      await getDocs(testCollection);
      console.log('✅ Firestore connection test successful');
    } catch (error) {
      console.error('❌ Firestore connection test failed:', error);
      throw error;
    }
  };

  // Run the test
  testFirestore().catch(console.error);

} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

export { auth, db }; 