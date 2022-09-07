const { PostMedia } = require('../models/PostMedia');

const postMediaData = [
  {
    media_id: '123456',
    post_id: '789012',
  },
  {
    media_id: '57654564',
    post_id: '544527',
  },
];

const seedPostMedia = () => PostMedia.bulkCreate(postMediaData);

module.exports = seedPostMedia;