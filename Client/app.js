/**
 * Created by HaberMic on 9/25/15.
 */
var app = angular.module('app',['ngRoute'])


app.factory('authInterceptor', function ($q,authService) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            config.headers.token = authService.token;

            return config || $q.when(config);
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
