function createController(Model) {
  return {
    list: async (req, res) => {
      const data = await Model.find().sort({ createdAt: -1 });
      res.json({ success: true, data });
    },
    create: async (req, res) => {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    },
    remove: async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      res.json({ success: true, message: 'Deleted' });
    }
  };
}
module.exports = createController;
