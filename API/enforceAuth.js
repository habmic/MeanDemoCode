/**
 * Created by HaberMic on 10/3/15.
 */
var tokenModule = require('jsonwebtoken');
var config = require('../config/config.js');

module.exports = function(router){

    router.use(function(req,res,next){

        var token = req.headers.token;

        if(token){

            tokenModule.verify(token, config.encryptionKey, function(err,decode){

                if(err) {

                    console.log('token is invalid!')
                    return res.status(401).json({reason: 'invalid token'});

                } else {

                    console.log('token is valid!')

                    req.decode = decode;
                    next();

                }
            })

        } else {

            console.log('token is missing!')

            return res.status(401).json({reason: 'token missing'});
        }
    })
}