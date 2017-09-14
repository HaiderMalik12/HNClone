const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const Author = require('./author.model');
const Story = require('./story.model');


const ArticleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    date_created: {
        type: Date
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'Author'
    },
    story: {
        type: Schema.Types.ObjectId, ref: 'Story'
    }
});

module.exports =  mongoose.model('Article', ArticleSchema);
