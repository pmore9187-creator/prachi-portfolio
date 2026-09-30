const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  degree: String,
  institution: String,
  field: String,
  startYear: String,
  endYear: String,
  score: String
}, { timestamps: true });

module.exports = mongoose.model('Education', schema);
