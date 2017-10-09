module.exports = app => {
    app.get('/', (req, res) => res.render('index.html'));
    app.get('/about', (req, res) => res.render('about.html'));
};
