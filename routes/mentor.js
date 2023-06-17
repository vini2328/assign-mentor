const express = require('express');
const Mentor = require('../models/mentor');
const Student = require('../models/student');

const router = express.Router();

// Create a new mentor
router.post('/', async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mentor' });
  }
});

// Assign a student to a mentor
router.post('/:mentorId/students/:studentId', async (req, res) => {
  try {
    const { mentorId, studentId } = req.params;
    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $addToSet: { students: studentId } },
      { new: true }
    );
    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );
    res.status(200).json({ mentor, student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign student to mentor' });
  }
});

// Get all students assigned to a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate('students');
    res.status(200).json(mentor.students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
})

module.exports = router;
