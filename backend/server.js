const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Load Form model
const Form = require('./models/Form');

// Handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        // Create a new Form document
        const formData = new Form({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            suburb: req.body.suburb,
            services: req.body.services, // This should be an array of strings
            message: req.body.message
        });

        // Save the form data to MongoDB
        await formData.save();
        res.send('Form data saved successfully');
    } catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).send('Error saving form data');
    }
});

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
