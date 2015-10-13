/**
 * Created by HaberMic on 10/2/15.
 */



var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    created_date: {type: Date, default: Date.now}
});

var itemSchema = new Schema({

   _Id: Schema.Types.String,

    title: {type:String, required:true},
    description: String,
    category: {type: String, set: upperCase},

    createTime: {type: Date, default: Date.now},
    lastUpdateTime: Date,

    price: {type: Number, validator: positiveNumber, msg: 'price has to be positive number'}
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Item = mongoose.model('Item', itemSchema);


function positiveNumber  (num) {
    return num >= 0;
}

function upperCase(str){
    return str.toUpperCase();
}



