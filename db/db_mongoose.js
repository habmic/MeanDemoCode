/**
 * Created by HaberMic on 10/2/15.
 */

var mongoose = require('mongoose');
var async = require('async');

var models = require('../db/models.js');


module.exports.initDB = function () {

    async.waterfall([
        connect, 
        function findUser (callback) {
            models.User.findOne({username: 'admin', password: '123'}, callback);
        },
        function addUserIfNeeded (user,callback) {
            if(!user){
                var adminUser = new models.User({username: 'admin',firstName:'admin',lastName:'admin', password :'123'});
                adminUser.save(function (err, data) {

                    if(err) callback(err);
                    else {
                        console.log('admin created');
                        callback();
                    }
                })
            } else {
                callback();
            }

        }
    ]);


};

module.exports.connectionString = "";

function connect(callback){
    mongoose.connect(module.exports.connectionString, function (err) {
        if(err){
            callback(err);
            console.error(err);
        } else {
            callback();
            console.log('db is up');
        }
    });
}

