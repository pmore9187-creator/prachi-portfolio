const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, name: 1 });
  res.json({ success: true, data: skills });
};

exports.createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
};

exports.deleteSkill = async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
  res.json({ success: true, message: 'Skill deleted' });
};
