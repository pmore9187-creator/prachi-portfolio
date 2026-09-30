const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  features: [String],
  githubURL: String,
  liveURL: String,
  image: String,
  date: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', schema);
