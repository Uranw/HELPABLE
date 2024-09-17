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
const Form = require('./models/Form'); // Added Form model

// Routes to fetch form data
app.get('/api/forms', async (req, res) => {
  try {
    const formData = await Form.find();
    res.status(200).json(formData);
  } catch (err) {
    console.error('Error fetching form data:', err);
    res.status(500).json({ message: 'Failed to fetch form data' });
  }
});

// Other routes...
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbackData = await Feedback.find();
    res.status(200).json(feedbackData);
  } catch (err) {
    console.error('Error fetching feedback data:', err);
    res.status(500).json({ message: 'Failed to fetch feedback data' });
  }
});

app.get('/api/sidebar', async (req, res) => {
  try {
    const sidebarContacts = await SidebarContact.find({});
    res.status(200).json(sidebarContacts);
  } catch (err) {
    console.error('Error fetching sidebar contacts:', err);
    res.status(500).json({ message: 'Error fetching sidebar contacts' });
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const questionsData = await Question.find({});
    res.status(200).json(questionsData);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

app.get('/api/ourapproachcontact', async (req, res) => {
  try {
    const ourApproachData = await OurApproachContact.find();
    res.status(200).json(ourApproachData);
  } catch (err) {
    console.error('Error fetching Our Approach data:', err);
    res.status(500).json({ message: 'Failed to fetch Our Approach data' });
  }
});


// Serve Dashboard.html as the default page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Dashboard.html'));
});

app.listen(port, () => {
  console.log(`Dashboard server running on port ${port}`);
});

// DELETE route for deleting data by ID from a specific collection
app.delete('/api/:collection/:id', async (req, res) => {
  const { collection, id } = req.params;

  try {
    let model;
    switch (collection) {
      case 'feedback':
        model = Feedback;
        break;
      case 'sidebar':
        model = SidebarContact;
        break;
      case 'questions':
        model = Question;
        break;
      case 'ourapproachcontact':
        model = OurApproachContact;
        break;
      case 'forms':
        model = Form;
        break;
      default:
        return res.status(400).json({ error: 'Invalid collection' });
    }

    const result = await model.findByIdAndDelete(id);

    if (result) {
      return res.status(200).json({ message: 'Document deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});
