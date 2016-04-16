/**
 * Created by HaberMic on 9/25/15.
 */
var app = angular.module('app',['ngRoute','ngCookies'])


app.factory('authInterceptor', function ($q,authService, $location) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            config.headers.token = authService.getToken();

            return config || $q.when(config);
        },
        responseError: function(res) {

            if (res.status === 401 ) {

                $location.path('/login');

            }

            return $q.reject(res);

        }
    };
});

// Register the previously created AuthInterceptor.
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController'
            }).
            when('/homepage', {
                templateUrl: 'views/items.html',
                controller: 'itemsController'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
