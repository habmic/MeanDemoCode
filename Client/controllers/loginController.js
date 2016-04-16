/**
 * Created by HaberMic on 10/3/15.
 */
angular.module('app').controller('loginController', function ($scope, $http, $location,authService) {

    $scope.login = function () {

        $http.post('http://localhost:8081/api/auth', { username: $scope.username, password: $scope.password}).success(function (data) {

            authService.setToken(data.token);

            $location.path("/homepage");

        }).error(function (error) {

            alert(error.reason);
        });
    }
})