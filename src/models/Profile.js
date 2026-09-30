const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  headline: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  resumeURL: String,
  githubURL: String,
  linkedinURL: String,
  leetcodeURL: String,
  hackerrankURL: String,
  profileImage: String
}, { timestamps: true });

module.exports = mongoose.model('Profile', schema);
