var couchbase = require('couchbase');
var oneDay = 86400; // in seconds

function ensureCallback(fn) {
    return function() {
        fn && fn.apply(null, arguments);
    };
}

module.exports = function(connect) {
    var Store = connect.Store;

    function CouchbaseStore(options) {
        options = options || {};
        Store.call(this, options);

        this.prefix = options.prefix || '';
        if (!options.client) {
            if (!options.connection) {
                options.connection = {
                    host: 'localhost:8091',
                    bucket: 'default'
                };
            }

            var cluster = new couchbase.Cluster(options.connection.host);
            options.client = cluster.openBucket(options.connection.bucket,"", function (err) {
                if(err) console.error(err);
            });
        }

        this.client = options.client;
    }

    CouchbaseStore.prototype.__proto__ = Store.prototype;

    CouchbaseStore.prototype.get = function(sid, fn) {
        this.client.get(this.prefix + sid, function(err, data) {
            if (err && err.code != couchbase.errors.keyNotFound)
                return fn(err, {});

            try {
                if (!data)
                    return fn();

                fn(null, data.value);
            } catch (e) {
                fn(e);
            }
        });
    };

    CouchbaseStore.prototype.set = function(sid, sess, fn) {
        var maxAge = sess.cookie.maxAge;
        var ttl = typeof maxAge == 'number' ? maxAge / 1000 | 0 : 3600;

        this.client.upsert(this.prefix + sid, sess, {expiry: ttl}, fn);
    };

    CouchbaseStore.prototype.destroy = function(sid, fn) {
        this.client.remove(this.prefix + sid, ensureCallback(fn));
    };

    return CouchbaseStore;
};
