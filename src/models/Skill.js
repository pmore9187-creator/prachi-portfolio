const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: String, default: 'Intermediate' }
}, { timestamps: true });

module.exports = mongoose.model('Skill', schema);
