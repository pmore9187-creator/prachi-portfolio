const router = require('express').Router();
const Education = require('../models/Education');
const createController = require('../controllers/simpleController');
const auth = require('../middleware/auth');
const controller = createController(Education);

router.get('/', controller.list);
router.post('/', auth, controller.create);
router.delete('/:id', auth, controller.remove);

module.exports = router;
