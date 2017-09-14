const express = require('express');
const ContactController = require('../controllers/contact');

const router = express.Router();

router.route('/').get(ContactController.contactGet);
router.route('/').post(ContactController.contactPost);

module.exports = router;