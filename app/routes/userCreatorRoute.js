var express = require('express');
var userEditor = express.Router();
var User = require('./../models/user');
var ServerResponse = require('./../classes/ServerResponse');
var utilities = require('./../utilities');

userEditor.post('/userCreate', function (req, res) {
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
                res.json(sr.setRes(false, 'Username already exits', 4).send());
            }
        });
    } else {
        res.json(sr.setRes(false, 'Incorrect user', 5).send());
    }
});

userEditor.put('/userDelete', function (req, res) {
    var sr = new ServerResponse();
    var userName = req.body.userName;

    User.findOne({
        userName: userName
    }, function (err, user) {
        if (err) {
            res.json(sr.setRes(false, err, 1).send());
        }

        if (user) {
            User.deleteOne({
                userName: userName
            }, function (err) {
                if (err) {
                    res.json(sr.setRes(false, err, 2).send());
                } else {
                    res.json(sr.setRes(false, 'Username deleted', 3).send());
                }
            });
        } else {
            res.json(sr.setRes(false, 'Username deleted', 4).send());
        }
    });
});

module.exports = userEditor;
