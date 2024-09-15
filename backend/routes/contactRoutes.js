const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST route to handle form submission
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();  // Save the form data to the database
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting the form', error });
    }
});

module.exports = router;
