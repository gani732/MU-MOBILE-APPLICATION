import { Router } from 'express';
import { FirebaseService } from '../services/firebase.service';

const router = Router();
const firebaseService = new FirebaseService();

// Create a new announcement (admin/faculty only)
router.post('/', async (req, res) => {
  try {
    const announcementData = {
      ...req.body,
      postedBy: req.user.id, // Assuming you have auth middleware setting req.user
      postedAt: new Date()
    };
    const id = await firebaseService.createAnnouncement(announcementData);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await firebaseService.getAllAnnouncements();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// Get announcements for current user
router.get('/my', async (req, res) => {
  try {
    const announcements = await firebaseService.getAnnouncementsForUser(req.user);
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await firebaseService.getAnnouncementById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcement' });
  }
});

// Update announcement (admin/faculty only)
router.put('/:id', async (req, res) => {
  try {
    await firebaseService.updateAnnouncement(req.params.id, req.body);
    res.json({ message: 'Announcement updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update announcement' });
  }
});

// Delete announcement (admin/faculty only)
router.delete('/:id', async (req, res) => {
  try {
    await firebaseService.deleteAnnouncement(req.params.id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

export default router;
