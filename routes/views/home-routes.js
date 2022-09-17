const router = require('express').Router();

const { discoverView } = require('../../controllers/discover-controller');
const { viewPosts } = require('../../controllers/post-controller');

router.get('/', viewPosts);
router.get('/discover', discoverView);

module.exports = router;
