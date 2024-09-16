const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001; // Port for dashboard server

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Load models
const Feedback = require('./models/Feedback');
const SidebarContact = require('./models/SidebarContact');

// Serve Dashboard HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Dashboard.html'));
});

// API endpoint to fetch feedback data
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback data:', err);
    res.status(500).json({ message: 'Failed to fetch feedback data' });
  }
});

// API endpoint to fetch sidebar contact data
app.get('/api/sidebar', async (req, res) => {
  try {
    const contacts = await SidebarContact.find({});
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching sidebar contact data:', err);
    res.status(500).json({ message: 'Failed to fetch sidebar contact data' });
  }
});

app.listen(port, () => {
  console.log(`Dashboard server running on port ${port}`);
});
