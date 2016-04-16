/**
 * Created by HaberMic on 10/3/15.
 */
angular.module('app').service('authService', function ($cookies) {
    var self = this;

    self.setToken = function (token) {
        $cookies.put('token', token);
    };

    self.getToken = function () {
        return $cookies.get('token');
    }

    return self;
})