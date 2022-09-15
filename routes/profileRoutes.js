const router = require('express').Router();

const {
    profileView
} = require('../controllers/user-controller');

router.get('/:id', profileView);

module.exports = router;
