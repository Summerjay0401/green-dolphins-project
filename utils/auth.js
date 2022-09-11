//middleware function to confirm user is logged in before allowing them to view a page or redirecting to the login page if not
const withAuth = (req, res, next) => {
    console.log('is loggin', req.session.loggedIn);
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        console.log(next());
        next();
    }
};

const withAuthAdmin = (req, res, next) => {
    if (!req.session.loggedInUserData.isAdmin) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = [withAuth, withAuthAdmin];
