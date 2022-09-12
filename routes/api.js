const router = require('express').Router();

const {
    loginAsync,
    signUpAsync
 } = require('../controllers/user-controller');

router.post('/login', loginAsync);
router.post('/signup', signUpAsync);

module.exports = router;
