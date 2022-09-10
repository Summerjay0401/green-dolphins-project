const homeAsync = async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    homeAsync
};
