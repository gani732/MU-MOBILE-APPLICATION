import { Router } from 'express';
import { FirebaseService } from '../services/firebase.service';

const router = Router();
const firebaseService = new FirebaseService();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await firebaseService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await firebaseService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get users by role
router.get('/role/:role', async (req, res) => {
  try {
    const users = await firebaseService.getUsersByRole(req.params.role);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users by role' });
  }
});

export default router;
