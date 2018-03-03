var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var ServerResponse = require('./../classes/ServerResponse');
var User = require('./../models/user');
var config = require('./../../config.json');

authRouter.post('/auth', function (req, res) {
    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) {
            var userFindError = new ServerResponse({success: false, message: 'Server error', code: 1});
            res.json(userFindError.error());
        }

        if (!user) {
            var userNotFoundError = new ServerResponse({success: false, message: 'Authentication failed.', code: 2});
            res.json(userNotFoundError.error());
        } else if (user) {
            if (user.password != req.body.password) {
                var authFailedError = new ServerResponse({success: false, message: 'Authentication failed.', code: 3});
                res.json(authFailedError.error());
            } else {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 60 * 60 * config.jwtExpire
                });

                var successAuthResponse = new ServerResponse({success: true, message: 'ok', code: 4, token: token});
                res.json(successAuthResponse.success());
            }
        }
    })
});

module.exports = authRouter;
