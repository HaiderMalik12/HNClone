const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  story_title: {
    type: String,
  },
  story_url: {
    type: String,
  }
});

module.exports = mongoose.model('Story', StorySchema);
