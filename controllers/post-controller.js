const { Op } = require('sequelize');
const {
    Comment,
    Media,
    Post,
    PostLike,
    PostMedia,
    User,
    TaggedUser,
    Hashtag
} = require('../models');

const getAllPosts = async () => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Media
                },
                {
                    model: User
                },
                {
                    model: PostLike
                },
                {
                    model: TaggedUser,
                    include: [
                        User
                    ]
                },
                {
                    model: Hashtag,
                    attributes: ['hashtag']
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        return postData.map((post) => post.get({ plain: true }));

    } catch (err) {
        throw err;
    }
};

const getPostsByUser = async (userId) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Media
                },
                {
                    model: Comment
                },
                {
                    model: User
                },
                {
                    model: PostLike
                },
                {
                    model: TaggedUser,
                    include: [
                        User
                    ]
                },
                {
                    model: Hashtag,
                    attributes: ['hashtag']
                },
            ],
            order: [['createdAt', 'DESC']],
            where: {
                user_id: userId,
            }
        });

        return postData.map((post) => post.get({ plain: true }));

    } catch (err) {
        throw err;
    }
};

const viewPosts = async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.render('login', {
                loggedIn: req.session.loggedIn,
                loggedInUserData: req.session.loggedInUserData
            });
        } else {
            const posts = await getAllPosts();
            // console.log(JSON.stringify(posts[0].post_likes.findIndex(obj => obj.user_id === req.session.loggedInUserData.id)));
            // posts.map(post, () => {
            //     const index = post.post_likes.findIndex(obj => obj.user_id === req.session.loggedInUserData.id);

            //     return index > 0 ? { ...post, is_like = true } ? post;
            // });

            // console.log(posts[0]);
            res.render('index', {
                loggedIn: req.session.loggedIn,
                loggedInUserData: req.session.loggedInUserData,
                posts: posts,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const likeAsync = async (req, res) => {

    try {
        const data = await PostLike.create({
            post_id: parseInt(req.body.post_id),
            user_id: parseInt(req.body.user_id)
        });

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json(err);
    }
};

const unlikeAsync = async (req, res) => {

    try {
        const response = await PostLike.destroy({
            where: {
                post_id: parseInt(req.body.post_id),
                user_id: parseInt(req.body.user_id)
            },
        });

        return res.status(200).json(response);

    } catch (err) {
        return res.status(500).json(err);
    }
};

const addCommentAsync = async (req, res) => {

    try {
        const data = await PostLike.create({
            post_id: parseInt(req.body.post_id),
            user_id: parseInt(req.body.user_id),
            content: req.body.content
        });

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json(err);
    }
};

const getMedia = async (filename) => {
    const media = await Media.findOne({
        where: {
            content_url: {
                [Op.like]: `%${filename}%`
            }
        },
        raw: true
    });

    return media;
};

const createPostAsync = async (req, res) => {

    try {

        const post = await Post.create({
            user_id: parseInt(req.body.user_id),
            text_content: req.body.text_content
        });

        const media = await getMedia(req.body.filename);

        const data = await PostMedia.create({
            post_id: post.id,
            media_id: media.id
        });

        return res.status(200).json(data);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


module.exports = {
    addCommentAsync,
    createPostAsync,
    getAllPosts,
    getPostsByUser,
    likeAsync,
    viewPosts,
    unlikeAsync
};