import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import admin, { auth, db, FieldValue } from '../config/firebase';

const router = Router();

// Create admin user
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const userSnapshot = await db.collection('users')
      .where('email', '==', email)
      .get();
    
    if (!userSnapshot.empty) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      name,
      role: 'admin',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Set admin claims
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });

    res.status(201).json({ 
      message: 'Admin user created successfully',
      uid: userRecord.uid
    });
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ 
      message: 'Failed to create admin user',
      error: error.message 
    });
  }
});

// Set admin claim
router.post('/set-admin-claim', async (req, res) => {
  console.log('Received request to set admin claim:', req.body);
  try {
    const { uid } = req.body;
    
    if (!uid) {
      console.log('No UID provided in request');
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Verify that the user exists and has admin role in Firestore
    console.log('Fetching user document for UID:', uid);
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      console.log('User document not found for UID:', uid);
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();
    console.log('User data:', userData);
    
    // Check if the user has admin role
    if (userData?.role !== 'admin') {
      console.log('User does not have admin role');
      return res.status(403).json({ message: 'User must have admin role to receive admin claims' });
    }

    console.log('Setting custom claims for UID:', uid);
    // Set custom claims
    await auth.setCustomUserClaims(uid, { admin: true });
    
    console.log('Updating user document with claims');
    // Update user document to mark claims as set
    await userDoc.ref.update({
      customClaims: { admin: true },
      updatedAt: FieldValue.serverTimestamp()
    });

    console.log('Admin claims set successfully');
    res.json({ message: 'Admin claims set successfully' });
  } catch (error: any) {
    console.error('Error setting admin claims:', error);
    res.status(500).json({ 
      message: 'Failed to set admin claims',
      error: error.message 
    });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, ...profileData } = req.body;

    // Check if user already exists
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: profileData.name || email.split('@')[0]
    });

    // Create user profile in Firestore
    const userRef = db.collection('users').doc(userRecord.uid);
    await userRef.set({
      email,
      password: hashedPassword,
      role,
      ...profileData,
      createdAt: FieldValue.serverTimestamp()
    });

    // Create role-specific profile
    const roleCollection = db.collection(role + 's');
    await roleCollection.doc(userRecord.uid).set({
      userId: userRecord.uid,
      ...profileData,
      createdAt: FieldValue.serverTimestamp()
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: userRecord.uid, role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userRecord.uid,
        email,
        role,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user from Firestore
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: userDoc.id, role: userData.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Get role-specific profile
    const roleProfile = await db.collection(userData.role + 's').doc(userDoc.id).get();
    const profileData = roleProfile.data();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = userData;

    res.json({
      token,
      user: {
        id: userDoc.id,
        ...userWithoutPassword,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
