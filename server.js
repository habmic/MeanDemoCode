///refer
/**
 * Created by HaberMic on 9/25/15.
 */
var express = require('express');
var app = express();
var config = require('./config/config.js')

var expressSession = require('express-session');
var couchbaseSession = require('./externalSession/couchbaseSession.js')(expressSession);

var couchbaseStore = new couchbaseSession();


var bodyParse = require('body-parser');
var path = require("path");

var db = require('./db/db_mongoose.js');
db.connectionString = config.connectionString;
db.initDB();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}));

var port = process.env.PORT || 8081;

app.use(express.static(__dirname + '/client'));

app.use(expressSession({
    secret:'devweek',
    key:'2016',
    proxy:'true',
    store: couchbaseStore
}));

var router = express.Router();

require('./api/auth.js')(router);
require('./api/enforceAuth.js')(router);
require('./api/items.js')(router);


app.use(config.baseAPIPath, router);

app.listen(port);

console.log('server is up: ' + port);