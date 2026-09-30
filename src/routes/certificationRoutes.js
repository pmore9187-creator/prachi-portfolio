const router = require('express').Router();
const Certification = require('../models/Certification');
const createController = require('../controllers/simpleController');
const auth = require('../middleware/auth');
const controller = createController(Certification);

router.get('/', controller.list);
router.post('/', auth, controller.create);
router.delete('/:id', auth, controller.remove);

module.exports = router;
