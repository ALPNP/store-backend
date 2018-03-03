var express = require('express');
var bodyParser = require('body-parser');
var baseRoute = require('./routes/baseRoute');
var userCreatorRoute = require('./routes/userCreatorRoute');
var authRoute = require('./routes/authRoute');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', baseRoute);
app.use('/', userCreatorRoute);
app.use('/', authRoute);

module.exports = app;
