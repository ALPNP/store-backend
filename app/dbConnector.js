var mongoose = require('mongoose');
var configFile = require('./../config.json');

var dbConnector = {
    connect: function () {
        return mongoose.connect(this.dataBase, {
            user: this.user,
            pass: this.secret
        });
    },
    disconnect: function () {
        return mongoose.disconnect();
    },
    dataBase: configFile.mongodb.dataBase,
    secret: configFile.mongodb.secret,
    user: configFile.mongodb.user
};

module.exports = dbConnector;
