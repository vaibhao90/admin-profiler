var sobreService = angular.module('SobreService', [])
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);




// Login Service
sobreService.service('LoginService', [ '$q', '$http',function($q,$http) {
  
        this.loginUser = function(src, parameters, caching) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var sub_url =  'be/user/login';
            var queryString = "";
            var req = {
               method: 'POST',
                 url: sub_url,
                 headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                data: parameters,
                parameters: parameters 
                };
            
         // //$http(req)
         //   if(parameters.email){
         //      queryString = "email="+parameters.email;
         //    }
         //    if(parameters.phone){
         //      var separater = parameters.email ? "&" : "";
         //      queryString =queryString+separater+"&phone="+encodeURIComponent(parameters.phone);
         //    }
         //    if(parameters.password){
         //      queryString= queryString+"&password="+parameters.password;
         //    }
       
         //   var url = src+sub_url+"?"+queryString;
           $http(req)
            .success(function(response){
                console.log(response);
                if(response.status === 'ERROR'){
                  deferred.reject(response);
                }else{
                  deferred.resolve(response);
                  console.log("figured");
                  console.log(response);
                }
            })
            .error(function(error){
              deferred.reject(error);
            }); 
           
            promise.success = function(fn) {   
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
  
}]);

// Users Service
sobreService.service('UserService', [ '$q', '$http',function($q,$http) {
  
       // get all the users 
        this.getUsers = function(src, parameters, caching) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var sub_url =  'be/user/list';
            var queryString = "";
            console.log(parameters);
           if(parameters.auth){
               queryString = "auth="+parameters.auth;
           }
           if(parameters.page){
             queryString =  queryString+"&page="+parameters.page;
           }else{
             queryString =  queryString+"&page=0";
           }
           if(parameters.pageSize){
              queryString =  queryString+"&pageSize="+parameters.pageSize;
           }else{
              queryString =  queryString+"&pageSize=20";
           }
       
           var url = src+sub_url+"?"+queryString;
                   
           $http.get(url)
            .success(function(response){
                console.log(response);
                if(response.status === 'ERROR'){
                  deferred.reject(response);
                }else{
                  deferred.resolve(response);
                  //console.log("figured");
                  console.log(response);
                }
            })
            .error(function(error){
              deferred.reject(error);
            }); 
           
            promise.success = function(fn) {   
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }

   //update existing user
         this.updateUser = function(src,auth,parameters, caching) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var sub_url =  'be/user/update';
            var queryString = "";
            console.log(parameters.id);
            queryString = "auth="+auth+"&id="+parameters.id;
           
   
           parameters.auth = auth;
           delete parameters.password;
            var req = {
               method: 'POST',
                 url: sub_url,
                 headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 data: parameters,
                parameters: parameters 
                };

           $http.post(sub_url,req)
            .success(function(response){
                console.log(response);
                if(response.status === 'ERROR'){
                  deferred.reject(response);
                }else{
                  deferred.resolve(response);
                  //console.log("figured");
                  console.log(response);
                }
            })
            .error(function(error){
              deferred.reject(error);
            }); 
           
            promise.success = function(fn) {   
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }

  ///create new user
         this.createUser = function(src,auth,parameters, caching) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var sub_url =  'be/user/register';
            var queryString = "";
            console.log(parameters.id);
            queryString = "auth="+auth;
           
   
           parameters.auth = auth;            
           $http.post(sub_url,parameters)
            .success(function(response){
                console.log(response);
                if(response.status === 'ERROR'){
                  deferred.reject(response);
                }else{
                  deferred.resolve(response);
                  //console.log("figured");
                  console.log(response);
                }
            })
            .error(function(error){
              deferred.reject(error);
            }); 
           
            promise.success = function(fn) {   
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    // get the doc list
       this.getDocs = function(src,auth,owner, caching) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var sub_url =  'be/doc/list';
            var queryString = "";
            queryString = "auth="+auth+"&owner="+owner;;
                     
       
           var url = src+sub_url+"?"+queryString;
                   
           $http.get(url)
            .success(function(response){
                console.log(response);
                if(response.status === 'ERROR'){
                  deferred.reject(response);
                }else{
                  deferred.resolve(response);
                  //console.log("figured");
                  console.log(response);
                }
            })
            .error(function(error){
              deferred.reject(error);
            }); 
           
            promise.success = function(fn) {   
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }       



      }]);



