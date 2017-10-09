var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    fs = require('fs'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    'secret': 'alfhl%##@%^FSddd',
    'resave': false,
    'saveUninitialized': true
}));

require('./router/main')(app, fs);

app.listen(3000, () => console.log('Express server has started on port 3000'));
