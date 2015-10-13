/**
 * Created by HaberMic on 10/2/15.
 */

var connect =  function (callback) {

    var mongoClient = require('mongodb').MongoClient;

    mongoClient.connect(module.exports.connectionString , function (err,db) {
        if (err) {
            console.log(err);
        } else {
            console.log('DB is ready!');
            if(callback){
                callback(db);
            }
        };
    })
};

module.exports.connectionString = "";

module.exports.connect = connect;

module.exports.initDB = function () {
    connect(function (db) {

      db.listCollections({name:'users'}).toArray(function(error,users){
          if(error){
              throw error;
          } else {
              if(users.length == 1){
                  findUserAndInsert(db);
              } else {
                  db.createCollection('users', function (error, users) {
                      if(error){
                          throw  error;
                      } else {
                          insertStartupUser(users);
                      }
                  })
              }
          }
      });
    })
}

var findUserAndInsert = function (db) {
    db.collection('users', function(err, users){
        users.find({username: 'admin', password:'123'}).toArray(function(err, data){
            if(data.length != 1) {
                insertStartupUser(err);
            }
        });
    });
}

var insertStartupUser = function (users) {
    users.insertOne({username: 'admin', password:'123'}, function (error) {
        if(error) {
            throw error;
        }
    })
}