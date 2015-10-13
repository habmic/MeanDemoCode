/**
 * Created by HaberMic on 10/3/15.
 */
angular.module('app').controller('itemsController', function ($scope,$http) {

    $scope.newItem = {};
    $scope.items = [];

    $http.get('http://localhost:8081/api/items').success(function (data) {

       $scope.items = data;

    }).error(function(err, code){

        if(code == 403){
            $scope.unauthorized = true;
        }

    });

    $scope.addNewItem = function () {
        
        $http.post('http://localhost:8081/api/item', $scope.newItem).success(function (data) {

           $scope.items.push($scope.newItem);
        });
    };
    
    $scope.deleteItem = function (index) {

        $http.delete('http://localhost:8081/api/item?id=' + $scope.items[index]._id).success(function (data) {
            //delete $scope.items[index];
            $scope.items.splice(index,1);
        })
    };

})