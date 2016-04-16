/**
 * Created by HaberMic on 10/2/15.
 */

var mongoose = require('mongoose');

var models = require('../db/models.js');

module.exports.connectionString = "";

module.exports.initDB = function () {
    connect();
    models.User.find({username: 'admin', password :'123'}, function (err, user) {
        if(err) { throw  err;}

        if(user.length == 0){
            models.User.create({email: 'admin',firstName:'admin',lastName:'admin', password :'123'}, function (err, data) {

                if(err) { throw err}

                data.save();
                console.log('admin created')
            })
        }
    })
};

module.exports.connectionString = "";

function connect(callback){
    mongoose.connect(module.exports.connectionString);
}

