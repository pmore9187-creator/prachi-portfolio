const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  issuer: String,
  date: String,
  certificateURL: String
}, { timestamps: true });

module.exports = mongoose.model('Certification', schema);
