const router = require('express').Router();

const { homeAsync } = require('../../controllers/views/home-controller');

router.get('/', homeAsync);

module.exports = router;
