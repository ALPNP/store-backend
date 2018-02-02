var app = require('./app/app');
var configFile = require('./config.json');
var dbConnector = require('./app/dbConnector');

dbConnector.connect().then(
    function () {
        app.listen(configFile.serverPort, function () {
            console.log('Server running on port: ' + configFile.serverPort);
        });
    },
    function (err) {
        console.log(err);
    }
);