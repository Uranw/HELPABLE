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
const OurApproachContact = require('./models/OurApproachContact');
const SidebarContact = require('./models/SidebarContact'); // Make sure this path is correct

// Handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    const formData = new Form({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      suburb: req.body.suburb,
      services: req.body.services,
      message: req.body.message
    });

    await formData.save();
    res.status(200).json({ success: true, message: 'Form data saved successfully' }); // Send JSON response
  } catch (err) {
    console.error('Error saving form data:', err);
    res.status(500).json({ success: false, message: 'Error saving form data' });
  }
});

// Handle feedback form submission
app.post('/submit-feedback', async (req, res) => {
  try {
    const feedbackData = new Feedback(req.body);
    await feedbackData.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});

// Handle sidebar question form submission
app.post('/submit-sidebar', async (req, res) => {
  try {
    const questionData = new Question({
      name: req.body['sidebar-name'],
      email: req.body['sidebar-email'],
      phone: req.body['sidebar-phone'],
      suburb: req.body['sidebar-suburb'],
      message: req.body['sidebar-message'] || ''
    });

    await questionData.save();
    res.status(200).json({ message: 'Sidebar form submitted successfully' });
  } catch (err) {
    console.error('Error saving Sidebar form data:', err.message); // Log the specific error message
    res.status(500).json({ message: 'Failed to submit Sidebar form' });
  }
});

// Handle our approach form submission
app.post('/submit-our-approach', async (req, res) => {
  try {
    const ourApproachData = new OurApproachContact(req.body);
    await ourApproachData.save();
    res.status(200).json({ message: 'Our Approach form submitted successfully' });
  } catch (err) {
    console.error('Error saving Our Approach form data:', err);
    res.status(500).json({ message: 'Failed to submit Our Approach form' });
  }
});

// Catch-all route to serve 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
