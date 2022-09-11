const router = require('express').Router();

const apiRoutes = require('./api');

const {
    homeRoutes,
} = require('./views');

const { loginViewAsync, signUpViewAsync } = require('../controllers/account-controller');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', loginViewAsync);
router.use('/signup', signUpViewAsync);

module.exports = router;
