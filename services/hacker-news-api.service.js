/**
 * This File will fetch all the articles from the
 * hacker news api and save all the articels to
 * mongodb database.
 */

const axios = require('axios');
import Author from '../models/author.model';
import Story from '../models/story.model';
import Article from '../models/article.model';


export const HN_API_URL = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

/**
 * Get all the NewsFeed from HackerNews Api
 * @returns {Object} Promise
 */
export function getNewsFeed() {
    return axios.get(HN_API_URL);
}


/**
 * Fetched all the articles from the HackerNewsApi and
 * saved to Mongodb database.
 * @return {Promise.<*[]>}
 */
export async function saveArticles() {

    const articles = await getNewsFeed();

    const promises = articles.data.hits.map(async _a => {

        const author = new Author({
            name: _a.author
        });
        const savedAuthor = await author.save();

        const story = new Story({
            story_title: _a.story_title,
            story_url: _a.story_url
        });
        const savedStory = await story.save();

        const article = new Article({
            title: _a.title,
            date_created: _a.created_at,
            url: _a.url,
            story: savedStory._id,
            author: savedAuthor._id
        });
        const savedArticle = await article.save();

        return {
            article: savedArticle,
            author: savedAuthor,
            story: savedStory
        };
    });

    return await Promise.all(promises);
}
