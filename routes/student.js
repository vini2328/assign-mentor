const express = require('express');
const Mentor = require('../models/mentor');
const Student = require('../models/student');

const router = express.Router();

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// Get the previously assigned mentor for a student
router.get('/:studentId/mentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor');
    res.status(200).json(student.mentor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentor' });
  }
});

// Assign or change the mentor for a particular student
router.put('/:studentId/mentor/:mentorId', async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );
    res.status(200).json({ mentor, student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign/change mentor' });
  }
});

module.exports = router;
