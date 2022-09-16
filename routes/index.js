const router = require('express').Router();

const apiRoutes = require('./api');

const {
    homeRoutes
} = require('./views');

const profileRoutes = require('./profileRoutes');

const {
    loginView,
    logoutAsync,
    signUpView
} = require('../controllers/user-controller');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/login', loginView);
router.use('/signup', signUpView);
router.use('/sign-out', logoutAsync);

module.exports = router;
