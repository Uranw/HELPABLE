const mongoose = require('mongoose');

const sidebarContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  suburb: String,
  message: String
});

module.exports = mongoose.model('SidebarContact', sidebarContactSchema);
