const router = require('express').Router();

const { viewPosts } = require('../../controllers/post-controller');

router.get('/', viewPosts);

module.exports = router;
