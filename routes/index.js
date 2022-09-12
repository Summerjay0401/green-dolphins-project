const router = require('express').Router();

const {
    homeRoutes
} = require('./views');

const {
    loginView,
    signUpView
} = require('../controllers/user-controller');

router.use('/', homeRoutes);
router.use('/login', loginView);
router.use('/signup', signUpView);
router.get('*',function (req, res) {
    res.redirect('/');
});


module.exports = router;
