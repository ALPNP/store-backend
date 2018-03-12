var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var ServerResponse = require('./../classes/ServerResponse');
var User = require('./../models/user');
var configFile = require('./../../config.json');

authRouter.post('/auth', function (req, res) {
    var sr = new ServerResponse();

    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) {
            res.json(sr.setRes(false, 'Server error', 1).send());
        }

        if (!user) {
            res.json(sr.setRes(false, 'Authentication failed', 2).send());
        } else if (user) {
            if (user.password != req.body.password) {
                res.json(sr.setRes(false, 'Authentication failed', 3).send());
            } else {
                var token = jwt.sign({
                    userName: user.userName,
                    id: user._id,
                    permission: user.permission
                }, configFile.secret, {
                    expiresIn: 60 * 60 * configFile.jwtExpire
                });

                res.json(sr.setRes(true, 'ok', 4, {token: token}).send());
            }
        }
    })
});

module.exports = authRouter;
