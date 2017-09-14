const Article = require('../models/article.model');
import _ from 'lodash';
import {convertToUserFriendly} from '../services/util.service';

/**
 * Get all the Articles from the local mongodb database
 * @param req
 * @param res
 * @param next
 * @return {array} All the articles in the form of array
 */
function getArticles(req, res, next) {

    Article.find()
        .populate('author')
        .populate('story')
        .sort({date_created: -1})
        .then(articles => {
            const _articles = articles.map(article => {
                let _a = _.cloneDeep(article);
                _a.date_created_friendly = convertToUserFriendly(article.date_created);
                return _a;
            });

            return res.json(_articles);
        })
        .catch(err => next(err));

}

/**
 * Delete the Article from the database
 * @param req
 * @param res
 * @param next
 */
function deleteArticle(req, res, next) {

    let articleId = req.body.id;
    if (!articleId) {
        return res.status(400).json({err: 'article id is missing'});
    }

    Article.findByIdAndRemove(articleId)
        .then(results => res.json(results))
        .catch(err => next(err));

}

module.exports = {
    getArticles,
    deleteArticle
};