const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from Dashboard directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Load models
const Feedback = require('./models/Feedback');
const SidebarContact = require('./models/SidebarContact');
const Question = require('./models/Question');
const OurApproachContact = require('./models/OurApproachContact');

// Routes to fetch feedback data
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbackData = await Feedback.find();
    res.status(200).json(feedbackData);
  } catch (err) {
    console.error('Error fetching feedback data:', err);
    res.status(500).json({ message: 'Failed to fetch feedback data' });
  }
});

/*
// Routes to fetch sidebar contact data
app.get('/api/sidebar', async (req, res) => {
  try {
    const sidebarContacts = await SidebarContact.find();
    res.status(200).json(sidebarContacts);
  } catch (err) {
    console.error('Error fetching sidebar contacts:', err);
    res.status(500).json({ message: 'Failed to fetch sidebar contacts' });
  }
});
*/

// Routes to fetch questions data
app.get('/api/questions', async (req, res) => {
  try {
    const questionsData = await Question.find();
    res.status(200).json(questionsData);
  } catch (err) {
    console.error('Error fetching questions data:', err);
    res.status(500).json({ message: 'Failed to fetch questions data' });
  }
});

// Routes to fetch OurApproachContact data
app.get('/api/ourapproachcontacts', async (req, res) => {
  try {
    const ourApproachContacts = await OurApproachContact.find();
    res.status(200).json(ourApproachContacts);
  } catch (err) {
    console.error('Error fetching Our Approach Contacts data:', err);
    res.status(500).json({ message: 'Failed to fetch Our Approach Contacts data' });
  }
});

// Serve Dashboard.html as the default page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Dashboard.html'));
});

app.listen(port, () => {
  console.log(`Dashboard server running on port ${port}`);
});
