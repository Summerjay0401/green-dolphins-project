const {
    Media,
    Post,
    PostLike,
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
                    attributes:['hashtag']
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
                    attributes:['hashtag']
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
        console.log(req.session.loggedIn);
        console.log(req.session.loggedInUserData);
        if (!req.session.loggedIn) {
            res.render('login', {
                loggedIn: req.session.loggedIn,
                loggedInUserData: req.session.loggedInUserData
            });
        } else {
            const posts = await getAllPosts();
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

module.exports = {
    getAllPosts,
    getPostsByUser,
    viewPosts
};