
const discoverView = async (req, res) => {
    try {
        res.render('discover', {
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    discoverView
};