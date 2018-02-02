var express = require('express');
var baseRouter = express.Router();
var configFile = require('./../../config.json');

baseRouter.get('/', function (req, res) {
    res.send(configFile.endpointName);
});

module.exports = baseRouter;
