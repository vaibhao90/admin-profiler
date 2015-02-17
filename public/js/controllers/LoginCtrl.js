var sobreApp = angular.module('LoginCtrl', []);

// Login Controller
sobreApp.controller('LoginController', function($scope,$http,$cookies,$location,$localstorage,LoginService) {
	  $scope.login = {};
	  $scope.message = "";

    


    $scope.loginCheck = function(login){
        console.log(login.email);
        console.log(login.phone);
        console.log(login.password);  
        LoginService.loginUser($scope.api_url,login,false)
          .success(function(response) {
               if(response.status==="OK"){
                          console.log(response.auth);
                         $scope.auth = response.auth;
                         $localstorage.set("auth",response.auth);
                         $cookies.auth = response.auth;
                          $location.path('/admin/users');
               } 
              
          }).error(function(response) {
              $scope.message = response.message;
          });
     };
});

// users controller
sobreApp.controller('UserController', function($scope,$http,$location,$localstorage,UserService) {
  
 $scope.userFlag = true;
   $scope.page = 0;
   $scope.sampleUser = {};
   $scope.pageSize = 10;
   $scope.users = []
   $scope.auth =  $localstorage.get("auth");
   $scope.docLists = [];
   $scope.owner = "";
    $scope.logout  = function(){
    $localstorage.set("auth","");
   $location.path('/admin');
  };


   $scope.getUsers = function(page,pageSize){
          $scope.userFlag = true;
          $scope.docLists = [];
          $scope.docFlag = false;
          var parameters = { auth: $scope.auth,page: page,pageSize: pageSize  };
          UserService.getUsers($scope.api_url,parameters,false)
          .success(function(response) {
          
            if(response.status==="OK"){
                       $scope.users = response.data.page.content;
                       $scope.page = response.data.page.number;
                       $scope.pageSize = response.data.page.size;
             } 

            
        }).error(function(response) {
            $scope.message = response.message;
        });

   };
    $scope.getUsers($scope.page,$scope.pageSize);
    $scope.createUser = function(user){
           if($scope.userFlag) $scope.userFlag = false;
           $scope.sampleUser =  user;
    };
    $scope.updateUser = function(user){

        if(user.id){
            UserService.updateUser($scope.api_url,$scope.auth,user,false)
            .success(function(response) {
       
            if(response.status==="OK"){
                        $scope.sampleUser = {};
                         $scope.getUsers($scope.page,$scope.pageSize);
             } 
           }).error(function(response) {
               $scope.message = response.message;
           });
      }else{
                UserService.createUser($scope.api_url,$scope.auth,user,false)
            .success(function(response) {
       
            if(response.status==="OK"){
                       console.log(response);
                         $scope.getUsers($scope.page,$scope.pageSize);
             } 
           }).error(function(response) {
                $scope.message = response.message;
           });

      }

    };

   $scope.getDocs = function(owner){
            UserService.getDocs($scope.api_url,$scope.auth,owner,false)
            .success(function(response) {
       
            if(response.status==="OK"){
                        $scope.sampleUser = {};
                        console.log(response); 
                       $scope.owner = owner;
                        $scope.docLists = response.data.documents; 
                         $scope.docFlag = true;  
                 //   $scope.getUsers($scope.page,$scope.pageSize);
             } 
           }).error(function(response) {
               $scope.message = response.message;
           });

   };


 });
sobreApp.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;
        console.log(value);

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        // if (country == 1) {
        //     country = "";
        // }

        number =  '-' + number.slice(0, 3) + '' + number.slice(3);
        return "+"+ country + ""+ city + "" + number.trim();
        //return (country + " (" + city + ") " + number).trim();
    };
});






