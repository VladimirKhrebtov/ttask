exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Index page'
    });
};
