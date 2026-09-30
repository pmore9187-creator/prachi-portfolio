const router = require('express').Router();
const controller = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/', controller.getProfile);
router.put('/', auth, controller.upsertProfile);

module.exports = router;
