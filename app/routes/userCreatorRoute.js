var express = require('express');
var userCreator = express.Router();
var User = require('./../models/user');
var ServerResponse = require('./../classes/ServerResponse');
var utilities = require('./../utilities');

userCreator.post('/userCreate', function (req, res) {
    var sr = new ServerResponse();
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
                res.json(sr.setRes(false, err, 1).send());
            }

            if (!user) {
                newUser.save(function (err) {
                    if (err) {
                        res.json(sr.setRes(false, err, 2).send());
                    }

                    res.json(sr.setRes(true, 'User saved', 3).send());
                });
            } else {
                res.json(sr.setRes(false, 'User not saved', 4).send());
            }
        });
    } else {
        res.json(sr.setRes(false, 'Incorrect user', 5).send());
    }
});

module.exports = userCreator;
