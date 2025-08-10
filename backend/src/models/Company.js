const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  industry: { type: String, index: true },
  location: { type: String, index: true },
  foundedYear: Number,
  employeeCount: Number,
  website: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Company', companySchema);
