// var app = require('./app/app');
// var configFile = require('./config.json');
// var dbConnector = require('./app/dbConnector');

// dbConnector.connect().then(
//     function () {
//         app.listen(configFile.serverPort, function () {
//             console.log('Server running on port: ' + configFile.serverPort);
//         });
//     },
//     function (err) {
//         console.log(err);
//     }
// );

var PouchDB = require('pouchdb');
var db = new PouchDB('test2');
db.put({
  _id: 'dave@gmail.com'+new Date().getTime(),
  name: 'David',
  age: 69
});
db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});
db.replicate.to('http://192.168.178.107:5984/test2').on('change', function (info) {
    console.log('change');
}).on('paused', function (err) {
    console.log('paused');
    // replication paused (e.g. replication up to date, user went offline)
}).on('active', function () {
    console.log('active');
    // replicate resumed (e.g. new changes replicating, user went back online)
}).on('denied', function (err) {
    console.log('denied');
    // a document failed to replicate (e.g. due to permissions)
}).on('complete', function (info) {
    console.log('complete');
    // handle complete
}).on('error', function (err) {
    console.log(err);
    console.log('error');
    // handle error
});