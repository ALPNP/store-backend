var express = require('express');
var guardService = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./../../config.json');
var ServerResponse = require('./../classes/ServerResponse');

guardService.use(function (req, res, next) {
    var sr = new ServerResponse();

    if (req.method !== 'OPTIONS') {
        var token = req.body.token || req.query.token || req.headers['authorization'];
        if (token) {
            var parsedToken = token.split(' ')[1];

            if (parsedToken) {
                jwt.verify(parsedToken, config.secret, function (err, decoded) {
                    if (err) {
                        return res.json(sr.setRes(false, 'Token failed', 101).send());
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send(sr.setRes(false, 'No token provided', 102).send());
            }
        } else {
            return res.status(403).send(sr.setRes(false, 'No token provided', 103).send());
        }
    } else {
        next();
    }
});

module.exports = guardService;
