const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  suburb: String,
  services: [String], // Array of strings
  message: String
});

module.exports = mongoose.model('Form', formSchema);
