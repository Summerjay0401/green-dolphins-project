const { PostHashtag } = require('../models/PostHashtag');

const postHashtagData = [
  {
    id: '354365',
    hashtag_id: '8765675',
  },
  {
    id: '378675',
    hashtag_id: '5465567',
  },
];

const seedPostHashtag = () => PostHashtag.bulkCreate(postHashtagData);

module.exports = seedPostHashtag;