const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  suburb: { type: String, required: true },
  services: { type: [String], default: [] }, // Array of strings
  message: { type: String, required: true }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
