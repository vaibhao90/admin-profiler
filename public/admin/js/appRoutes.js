angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
       .when('/admin', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
       // users page
		 .when('/admin/users', {
		 	templateUrl: 'views/users.html',
			controller: 'UserController'
		 })
         // docs page
		 .when('/admin/docs/:owner', {
		 	templateUrl: 'views/docs.html',
			controller: 'DocControlle`r'
		 })


      ;

	$locationProvider.html5Mode(true);

}]);