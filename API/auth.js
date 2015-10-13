/**
 * Created by HaberMic on 10/2/15.
 */

var tokenModule = require('jsonwebtoken');
var models = require('../db/models.js');
var config = require('../config/config.js');


module.exports = function (router) {
    router.post('/auth', function(req,res){
            models.User.findOne({username: req.body.username, password: req.body.password}, function (err,user) {
               if(err) { throw err};

                if(!user){
                    res.status(403).json({status: 'failed', reason:'user not found'});
                } else {
                   var token = tokenModule.sign(user, config.encryptionKey, {expiresIn :'1h' });
                    res.status(200).json({status: 'succeeded', token:token});

                }
            });
    });

}