const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, data: projects });
};

exports.createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, message: 'Project deleted' });
};
