const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Load models
const Form = require('./models/Form');
const Feedback = require('./models/Feedback');
const Question = require('./models/Question');

// Handle existing form submission
app.post('/submit-form', async (req, res) => {
  try {
    const formData = new Form({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      suburb: req.body.suburb,
      services: req.body.services, // This should be an array of strings
      message: req.body.message
    });

    await formData.save();
    res.send('Form data saved successfully');
  } catch (err) {
    console.error('Error saving form data:', err);
    res.status(500).send('Error saving form data');
  }
});

// Handle feedback form submission
app.post('/submit-feedback', async (req, res) => {
  try {
    const feedbackData = new Feedback(req.body);
    await feedbackData.save();
    res.send('Feedback submitted successfully');
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).send('Error submitting feedback');
  }
});

// Handle sidebar question form submission
app.post('/submit-question', async (req, res) => {
    try {
      const questionData = new Question({
        name: req.body['sidebar-name'],
        email: req.body['sidebar-email'],
        phone: req.body['sidebar-phone'],
        suburb: req.body['sidebar-suburb'],
        message: req.body['sidebar-message']
      });
      
      await questionData.save();
      res.send('Question submitted successfully');
    } catch (err) {
      console.error('Error saving question:', err);
      res.status(500).send('Error submitting question');
    }
  });
  

// Catch-all route to serve 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
