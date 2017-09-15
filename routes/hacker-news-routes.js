const express = require('express');
const HackerNewsCtrl = require('../controllers/hacker-news.controller');

const router = express.Router();

router.route('/')
    .get(HackerNewsCtrl.getArticles);

//Can't send the delete request from the FORM
//Otherwise, I'll use delete method here
router.route('/:id')
    .get(HackerNewsCtrl.deleteArticle);


module.exports = router;
