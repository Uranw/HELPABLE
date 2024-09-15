// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Question = require('../models/Question');

// Feedback form submission
router.post('/submit-feedback', async (req, res) => {
  console.log('Received feedback data:', req.body);
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});



// Sidebar question form submission
router.post('/submit-question', async (req, res) => {
  console.log('Received question data:', req.body);
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(200).json({ message: 'Question submitted successfully' });
  } catch (error) {
    console.error('Question submission error:', error);
    res.status(500).json({ message: 'Failed to submit question' });
  }
});


module.exports = router;
