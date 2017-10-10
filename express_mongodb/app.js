// app.js

// [LOAD PACKAGES]
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 8080; // [CONFIGURE SERVER PORT]

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/mongodb_tutorial',
    { useMongoClient: true }
).then(
    () => console.log('Connected to mongod server'),
    err => console.log(err)
);

// DEFINE MODEL
var Book = require('./models/book')(mongoose);

// [CONFIGURE ROUTER]
require('./routes/index')(app, Book);

// [RUN SERVER]
app.listen(port, () =>
    console.log("Express server has started on port " + port)
);
