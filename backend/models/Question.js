// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  suburb: String,
  message: String
});

module.exports = mongoose.model('Question', questionSchema);
