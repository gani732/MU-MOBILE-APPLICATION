import { Router } from 'express';
import { FirebaseService } from '../services/firebase.service';

const router = Router();
const firebaseService = new FirebaseService();

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await firebaseService.getAllAssignments();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await firebaseService.getAssignmentById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
});

// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, courseId } = req.body;
    
    if (!title || !description || !dueDate || !courseId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const assignmentData = {
      title,
      description,
      dueDate: new Date(dueDate),
      courseId,
      createdAt: new Date(),
      createdBy: req.user?.id || 'system',
      totalMarks: req.body.totalMarks || 100,
      attachments: req.body.attachments || []
    };

    const id = await firebaseService.createAssignment(assignmentData);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// Update assignment
router.put('/:id', async (req, res) => {
  try {
    await firebaseService.updateAssignment(req.params.id, req.body);
    res.json({ message: 'Assignment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update assignment' });
  }
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  try {
    await firebaseService.deleteAssignment(req.params.id);
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
});

export default router;
