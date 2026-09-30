const router = require('express').Router();
const controller = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.get('/', controller.getProjects);
router.post('/', auth, controller.createProject);
router.put('/:id', auth, controller.updateProject);
router.delete('/:id', auth, controller.deleteProject);

module.exports = router;
