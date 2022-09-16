const sequelize = require('../config/connection');
const {
    Block,
    Comment,
    CommentHashtag,
    CommentLike,
    Follow,
    Hashtag,
    Media,
    Post,
    PostHashtag,
    PostLike,
    PostMedia,
    TaggedUser
} = require('../models');

const User = require('../models/Users');

const block_data = require('./block-data.json');
const comment_data = require('./comment-data.json');
const commentHashtag_data = require('./comment-hashtag-data.json');
const commentLike_data = require('./comment-like-data.json');
const follow_data = require('./follow-data.json');
const hashtag_data = require('./hashtag-data.json');
const media_data = require('./media-data.json');
const post_data = require('./post-data.json');
const postHashtag_data = require('./post-hashtag-data.json');
const postLike_data = require('./post-like-data.json');
const postMedia_data = require('./post-media-data.json');
const taggedUser_data = require('./tagged-user-data.json');
const user_data = require('./user-data.json');

const seedAll = async () => {

    const seq = await sequelize.sync({ force: true });
    console.log('seq', seq);
    console.log('\n----- DATABASE INITIALIZE -----\n');

    await User.bulkCreate(user_data, {
        individualHooks: true,
        returning: true,
    });

    await Block.bulkCreate(block_data, {
        individualHooks: true,
        returning: true,
    });

    await Hashtag.bulkCreate(hashtag_data, {
        individualHooks: true,
        returning: true,
    });

    await Media.bulkCreate(media_data, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(post_data, {
        individualHooks: true,
        returning: true,
    });

    await PostHashtag.bulkCreate(postHashtag_data, {
        individualHooks: true,
        returning: true,
    });

    await PostLike.bulkCreate(postLike_data, {
        individualHooks: true,
        returning: true,
    });

    await PostMedia.bulkCreate(postMedia_data, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(comment_data, {
        individualHooks: true,
        returning: true,
    });

    await CommentHashtag.bulkCreate(commentHashtag_data, {
        individualHooks: true,
        returning: true,
    });

    await CommentLike.bulkCreate(commentLike_data, {
        individualHooks: true,
        returning: true,
    });

    await Follow.bulkCreate(follow_data, {
        individualHooks: true,
        returning: true,
    });

    await TaggedUser.bulkCreate(taggedUser_data, {
        individualHooks: true,
        returning: true,
    });

    console.log('\n----- DATABASE SUCCESSFULLY SYNCED -----\n');
    process.exit(0);

};

seedAll();
