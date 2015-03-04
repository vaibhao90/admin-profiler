var sobreApp = angular.module('LoginCtrl', []);

// Login Controller
sobreApp.controller('LoginController', function($scope,$http,$cookies,$location,$localstorage,LoginService) {
	  $scope.login = {};
	  $scope.message = "";
 
    $scope.validatePhone = function(tel){
      var country="", city, number ; 
     if (!tel) { return ''; }
     var value1 = tel.toString().trim().replace(/^\+/, '');
     var value = value1.toString().trim().replace(/^\-  /, '');
     if (value.match(/[^0-9]/)) {
        
      }else{
         if(tel.match(/'1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?'/)){
               $scope.login.phone = tel;
          }else{
                $scope.login.phone = "";
             }   

         switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = "+1-";
               // city = value.slice(0, 3);
                //number = value.slice(3);
                number = value;
                $scope.login.phone = country+""+number; 
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = "+"+value[0]+"-";
              //  city = value.slice(1, 4);
                number = value.slice(1);
                $scope.login.phone = country+""+number; 
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = "+"+value.slice(0, 3)+"-";
                //city = value.slice(3, 5);
                number = value.slice(3);
                $scope.login.phone = country+""+number; 
                break;

            default:
                 $scope.login.phone = tel;
        }
        // if (country == 1) {
        //     country = "";
        // }
        console.log(number);
        //number = number.slice(0, 3) + '-' + number.slice(3);
       //$scope.login.phone = country+""+number; 
       // return (country + " (" + city + ") " + number).trim();
         //$scope.login.phone = country+

      }
    };


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
   $scope.pageSize = 20;
   $scope.users = []
   $scope.auth =  $localstorage.get("auth");
   $scope.docLists = [];
   $scope.owner = "";
   $scope.lastPageFlag = false;
   $scope.lastPageNum = 0;
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
                       $scope.lastPageFlag = response.data.page.last;
                       $scope.lastPageNum = response.data.page.totalPages;
                       $scope.auth = response.auth;
                       $localstorage.set("auth",response.auth); 
             } 
           
        }).error(function(response) {
            console.log("here is error");
            if (response.message && response.message.indexOf("expired authorization token")!=-1) $scope.logout();

           //
        });

   };
    $scope.getUsers($scope.page,$scope.pageSize);
    $scope.createUser = function(user){
           $scope.message = "";
           if($scope.userFlag) $scope.userFlag = false;
           $scope.sampleUser =  user;
    };
    $scope.updateUser = function(user){

        if(user.id){
            UserService.updateUser($scope.api_url,$scope.auth,user,false)
            .success(function(response) {
       
            if(response.status==="OK"){
                        $scope.sampleUser = {};
                        $scope.auth = response.auth;
                         $localstorage.set("auth",response.auth);
                        $scope.getUsers($scope.page,$scope.pageSize);

             } 
           }).error(function(response) {
               $scope.message = response.message;
               if (response.message.indexOf("expired authorization token")!=-1) $scope.logout();
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
                 if (response.message.indexOf("expired authorization token")!=-1) $scope.logout();
           });

      }

    };

   // $scope.getDocs = function(owner){

   //          UserService.getDocs($scope.api_url,$scope.auth,owner,false)
   //          .success(function(response) {
       
   //          if(response.status==="OK"){
   //                      $scope.sampleUser = {};
   //                      console.log(response); 
   //                     $scope.owner = owner;
   //                      $scope.docLists = response.data.documents; 
   //                       $scope.docFlag = true;  
   //               //   $scope.getUsers($scope.page,$scope.pageSize);
   //           } 
   //         }).error(function(response) {
   //             $scope.message = response.message;
   //         });

   // };


 });

sobreApp.controller('DocController', function($scope,$routeParams,$http,$location,$localstorage,UserService) {
   $scope.auth =  $localstorage.get("auth");
   $scope.docLists = [];
   $scope.owner = $routeParams.owner;

     $scope.getDocs = function(owner){

                UserService.getDocs($scope.api_url,$scope.auth,owner,false)
                .success(function(response) {
           
                if(response.status==="OK"){
                             $scope.sampleUser = {};
                             console.log(response); 
                             $scope.auth = response.auth;
                             $localstorage.set("auth",response.auth); 
                             $scope.owner = owner;
                             $scope.docLists = response.data.documents; 
                             $scope.docFlag = true;  
                     //   $scope.getUsers($scope.page,$scope.pageSize);
                 } 
               }).error(function(response) {
                   $scope.message = response.message;
               });
       };

      $scope.getDocs($scope.owner);


});







