import { Router } from 'express';
import { FirebaseService } from '../services/firebase.service';

const router = Router();
const firebaseService = new FirebaseService();

// Get attendance for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const attendance = await firebaseService.getCourseAttendance(req.params.courseId);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Get student's attendance
router.get('/student/:studentId', async (req, res) => {
  try {
    const attendance = await firebaseService.getStudentAttendance(req.params.studentId);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student attendance' });
  }
});

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const { courseId, date, students } = req.body;
    
    if (!courseId || !date || !students) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const attendanceData = {
      courseId,
      date: new Date(date),
      students, // { studentId: boolean }
      markedBy: req.user?.id || 'system',
      markedAt: new Date(),
      totalPresent: Object.values(students).filter(present => present).length
    };

    const id = await firebaseService.markAttendance(attendanceData);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// Update attendance
router.put('/:id', async (req, res) => {
  try {
    await firebaseService.updateAttendance(req.params.id, req.body);
    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

export default router;
