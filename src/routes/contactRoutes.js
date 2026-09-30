const router = require('express').Router();
const controller = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.post('/', controller.createContact);
router.get('/', auth, controller.getContacts);

module.exports = router;
