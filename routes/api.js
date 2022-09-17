const router = require('express').Router();

const {
    addCommentAsync,
    createPostAsync,
    likeAsync,
    unlikeAsync
 } = require('../controllers/post-controller');

const {
    loginAsync,
    signUpAsync
 } = require('../controllers/user-controller');

router.post('/login', loginAsync);
router.post('/signup', signUpAsync);
router.post('/like', likeAsync);
router.post('/unlike', unlikeAsync);
router.post('/comment', addCommentAsync);
router.post('/post', createPostAsync);

module.exports = router;
