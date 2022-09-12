const {
    User
} = require('../models');

const loginView = async (req, res) => {
    try {
        res.render('login', {
            loggedIn: false
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const signUpView = async (req, res) => {
    try {
        res.render('signup', {
            loggedIn: false
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const logoutAsync = async (req, res) => {
    try {
        req.session.destroy(() => {
            res.render('login', {
                loggedIn: false
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const loginAsync = async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({
                message: 'Incorrect email or password. Please try again!',
            });
            return;
        }
        //checks that password is valid using custom instance method in ./models/user.js
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect email or password. Please try again!',
            });
            return;
        }
        //save data to session for use elsewhere
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = dbUserData;

            res.status(200).json({
                user: dbUserData,
                message: 'You are now logged in!',
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const signUpAsync = async (req, res) => {
    try {
        const dbUserData = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = dbUserData;
            return res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

module.exports = {
    loginAsync,
    loginView,
    logoutAsync,
    signUpAsync,
    signUpView
};