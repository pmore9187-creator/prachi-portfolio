const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  date: String
}, { timestamps: true });

module.exports = mongoose.model('Achievement', schema);
