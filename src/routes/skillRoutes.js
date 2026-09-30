const router = require('express').Router();
const controller = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.get('/', controller.getSkills);
router.post('/', auth, controller.createSkill);
router.delete('/:id', auth, controller.deleteSkill);

module.exports = router;
