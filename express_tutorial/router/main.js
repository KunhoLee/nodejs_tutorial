module.exports = (app, fs) => {
    app.get('/', (req, res) => res.render('index', {
        'title': 'MY HOMEPAGE',
        'length': 5
    }));
};
