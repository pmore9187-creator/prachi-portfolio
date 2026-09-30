const router = require('express').Router();
const Achievement = require('../models/Achievement');
const createController = require('../controllers/simpleController');
const auth = require('../middleware/auth');
const controller = createController(Achievement);

router.get('/', controller.list);
router.post('/', auth, controller.create);
router.delete('/:id', auth, controller.remove);

module.exports = router;
