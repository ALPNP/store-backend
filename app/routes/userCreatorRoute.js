var express = require('express');
var userCreator = express.Router();
var User = require('./../models/user');
var ServerResponse = require('./../classes/ServerResponse');
var utilities = require('./../utilities');

userCreator.post('/userCreate', function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    var email = req.body.email;

    var newUser = new User({
        userName: userName,
        password: password,
        email: email,
        role: 'admin'
    });

    if (utilities.newUserValidator(newUser)) {
        User.findOne({
            userName: userName
        }, function (err, user) {
            if (err) {
                var findErrRes = new ServerResponse({success: false, message: err, code: 1});
                res.json(findErrRes.error());
            }

            if (!user) {
                newUser.save(function (err) {
                    if (err) {
                        var userSaveErrRes = new ServerResponse({success: false, message: err, code: 2});
                        res.json(userSaveErrRes.error());
                    }

                    var successRes = new ServerResponse({success: true, message: 'User saved', code: 3});
                    res.json(successRes.success());
                });
            } else {
                var userAlreadyError = new ServerResponse({success: false, message: 'User not saved', code: 4});
                res.json(userAlreadyError.error());
            }
        });
    } else {
        var userAlreadyError = new ServerResponse({success: false, message: 'Incorrect user', code: 5});
        res.json(userAlreadyError.error());
    }
});

module.exports = userCreator;
