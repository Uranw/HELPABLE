// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Question = require('../models/Question');

// Feedback form submission
router.post('/submit-feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Sidebar question form submission
router.post('/submit-question', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(200).json({ message: 'Question submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit question' });
  }
});

module.exports = router;
