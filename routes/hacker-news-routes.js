const express = require('express');
const HackerNewsCtrl = require('../controllers/hacker-news.controller');

const router = express.Router();

router.route('/articles')
    .get(HackerNewsCtrl.getArticles);

router.route('/articles')
    .delete(HackerNewsCtrl.deleteArticle);


module.exports = router;
