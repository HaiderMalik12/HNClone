const express = require('express');
const HackerNewsCtrl = require('../controllers/hacker-news.controller');

const router = express.Router();

router.route('/')
    .get(HackerNewsCtrl.getArticles);

router.route('/:id')
    .delete(HackerNewsCtrl.deleteArticle);


module.exports = router;
