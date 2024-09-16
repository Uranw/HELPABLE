const mongoose = require('mongoose');

const OurApproachContactSchema = new mongoose.Schema({
  name: { type: String, required: false },
  support: { type: String, required: false },
  familyMember: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  concern: { type: String, required: true }
});

module.exports = mongoose.model('OurApproachContact', OurApproachContactSchema);
