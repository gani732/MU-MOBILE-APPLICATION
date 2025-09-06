import * as admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin
const serviceAccount = require(path.join(__dirname, '../../service-account.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Export Firebase services
export const auth = admin.auth();
export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;

// Export the admin instance for special cases
export default admin; 