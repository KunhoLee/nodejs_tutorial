var express = require('express'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

require('./router/main')(app);

app.listen(3000, () => console.log('Express server has started on port 3000'));
