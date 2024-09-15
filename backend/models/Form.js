const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    suburb: String,
    services: [String], // Array of strings for multiple services
    message: String
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
