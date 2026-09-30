const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne().sort({ createdAt: -1 });
  res.json({ success: true, data: profile });
};

exports.upsertProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true });
  res.json({ success: true, data: profile });
};
