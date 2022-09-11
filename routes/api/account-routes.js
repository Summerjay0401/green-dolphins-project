const router = require('express').Router();

const {
    loginAsync,
    signUpAsync
} = require('../../controllers/account-controller');

router.post('/login', loginAsync);
router.post('/signup', signUpAsync);

module.exports = router;
