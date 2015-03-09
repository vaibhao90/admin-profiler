var Client = require('node-rest-client').Client;
var httpProxy = require('http-proxy');

var  request = require('request');
module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
/* 

	//app.get('/be/user/login', function(req, res) {
	app.post('/be/user/login', function(req, res) {	
		var Client = require('node-rest-client').Client;

        //console.log(req);
		var client = new Client();
         var result = {};
       // console.log(req.body);
		// set content-type header and data as json in args parameter
		// var args = {
		//   data: req.body,
		//   headers:{"Content-Type": "application/x-www-form-urlencoded"} ,
		//   parameters: req.body
		// };
        // var parameters = "";
        // if(req.query.email)  parameters = "email="+req.query.email;
        // if(req.query.phone)  parameters = "phone="+req.query.phone; 
        // if(req.query.password)  parameters = parameters+"&password="+req.query.password; 
       // console.log(args);
		client.post("http://sobre.volsted.com/be/user/login",req.body, function(data,response) {
	console.log(response);		
	 	//client.get("http://sobre.volsted.com/be/user/login",args, function(data,response) {	
		      // parsed response body as js object
		   //console.log(response);
		    result = data;
		    res.json(data);
		    // raw response
		   // console.log(response);
		}); 
		
	});	    

    app.get('/be/user/list', function(req, res) {
		var Client = require('node-rest-client').Client;
       // console.log(req);
		var client = new Client();
         var result = {};
         var args = {
		   headers:{"Content-Type": "application/json"} 
		};
        
          var page = req.query.page || 0 ;
          var pageSize = req.query.pageSize || 10;
		client.get("http://sobre.volsted.com/be/user/list?auth="+req.query.auth+"&page="+page+"&pageSize="+pageSize, args, function(data,response) {
		      // parsed response body as js object
		//    console.log(data);
		    result = data;
		    res.json(data);
		    // raw response
		  //  console.log(response);
		}); 
	});	    


 app.post('/be/user/update', function(req, res) {
		var Client = require('node-rest-client').Client;
        console.log(req);
		var client = new Client();
        var result = {};
  //       var args = {
  //          data:	req.body,
		//    headers:{"Content-Type": "application/json"} 
		// };
  //        //console.log("Request aa gayi");
  //       //console.log(req.query.user);
  //         var user = req.body ;
  //      //  console.log("#################");
  //       console.log(req.body);
  //   //    console.log("#################");
  //       user.phone = encodeURIComponent(user.phone);

		//client.get("http://sobre.volsted.com/be/user/update?auth="+req.body.auth+"&id="+user.id+"&name"+user.name+"&email="+user.email+"&phone="+user.phone+"&password="+user.password+"&role="+user.role, args, function(data,response) {
	    client.post("http://sobre.volsted.com/be/user/update",req.body, function(data,response) {
		      // parsed response body as js object
		    //console.log(data);
		    result = data;
		    res.json(data);
		    // raw response
		    console.log(response);
		}); 
	
		
	});	    

  app.get('/be/doc/list', function(req, res) {
		var Client = require('node-rest-client').Client;
       // console.log(req);
		var client = new Client();
        var result = {};
        var args = {
		   headers:{"Content-Type": "application/json"} 
		};
       
        var user = req.query ;
        
		client.get("http://sobre.volsted.com/be/doc/list?auth="+user.auth+"&owner="+user.owner, function(data,response) {
		      // parsed response body as js object
		    console.log(data);
		    result = data;
		    res.json(data);
		    // raw response
		    console.log(response);
		}); 
		
	});	    


 

*/
      app.get('/be/*',function(req,res) {
		  //modify the url in any way you want
                      
  			var newurl = 'http://sobre.volsted.com/be/';
 			 request(newurl).pipe(res);
			});
      app.post('/be/*',function(req,res) {
var url = 'http://sobre.volsted.com/be/'+ req.url;
  var r = null;
  if(req.method === 'POST') {
     r = request.post({uri: url, json: req.body});
  } else {
     r = request(url);
  }

  req.pipe(r).pipe(res);
//		 console.log(req.url);
                  //modify the url in any way you want
  //                      var newurl = 'http://sobre.volsted.com/'+req.url;
//                         request(newurl).pipe(res);
                        });



	app.get('/admin', function(req, res) {
		res.sendfile('./public/index.html');
	});


};
