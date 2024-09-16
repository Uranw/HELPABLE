const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  suburb: String,
  postcode: String,
  feedback: String,
  story: String,
  confidential: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
