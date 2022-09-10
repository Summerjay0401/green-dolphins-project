const router = require('express').Router();

const {
    homeRoutes
} = require('./views');

router.use('/', homeRoutes);

module.exports = router;
