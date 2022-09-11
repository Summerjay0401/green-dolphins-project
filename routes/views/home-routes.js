const router = require('express').Router();
// const withAuth = require('../../utils/auth');

const { homeAsync } = require('../../controllers/views/home-controller');

router.get('/', homeAsync);

module.exports = router;
