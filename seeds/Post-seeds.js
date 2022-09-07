const { Post } = require('../models/Post');

const postData = [
  {
    user_id: '564658',
    text_content: 'You are too cute!',
    created_at_timestamp: '',
  },
  {
    user_id: '7478364',
    text_content: 'So adorable!',
    created_at_timestamp: '',
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;