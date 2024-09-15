const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST route to handle form submission
router.post('/', async (req, res) => {
    try {
        // Create a new Contact document using the form data
        const newContact = new Contact(req.body);
        await newContact.save();  // Save the form data to the database

        // Save the form data to the database
        await newContact.save();

        // Send a success response
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting the form', error });
        // Log the error for server-side debugging
        console.error('Error submitting the form:', error);

        // Send a generic error response
        res.status(500).json({ message: 'Error submitting the form' });
    }
});

module.exports = router;