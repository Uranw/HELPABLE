// models/SidebarContact.js
const mongoose = require('mongoose');

const sidebarContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  suburb: { type: String, required: true }
});

module.exports = mongoose.model('SidebarContact', sidebarContactSchema);
