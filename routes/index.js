const express = require('express');
const HomeController = require('../controllers/home');
const contactRoutes = require('./contact.routes');
const hackerNewsRouets = require('./hacker-news-routes');


const router = express.Router();


router.route('/').get(HomeController.index);
router.use('/contact',contactRoutes);
router.use('/hn',hackerNewsRouets);

module.exports = router;