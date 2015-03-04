angular.module('MainCtrl', []).controller('MainController', function($scope) {

		
	$scope.flag = false ;
	$scope.api_url =  $scope.flag ? "http://sobre.volsted.com/be/"  : "/"  ;
    $scope.auth_token = "";
     


});