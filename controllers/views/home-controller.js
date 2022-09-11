const homeAsync = async (req, res) => {
    try {
        res.render('index', {
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
            posts: posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    homeAsync
};
