//var Client = require('node-rest-client').Client;
module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
 

	app.get('/be/user/login', function(req, res) {
		var Client = require('node-rest-client').Client;

        //console.log(req);
		var client = new Client();
         var result = {};
       //  console.log(req);
		// set content-type header and data as json in args parameter
		var args = {
		  data: { email: req.email,password: req.password },
		  headers:{"Content-Type": "application/json"} 
		};
        var parameters = "";
        if(req.query.email)  parameters = "email="+req.query.email;
        if(req.query.phone)  parameters = parameters+"&phone="+req.query.phone; 
        if(req.query.password)  parameters = parameters+"&password="+req.query.password; 
        console.log(parameters);
		client.get("http://sobre.volsted.com/be/user/login?"+parameters, args, function(data,response) {
		//client.post("http://sobre.volsted.com/be/user/login",req.query, function(data,response) {	
		      // parsed response body as js object
		   // console.log(data);
		    result = data;
		    res.json(data);
		    // raw response
		   // console.log(response);
		}); 
		
	});	    

    app.get('/be/user/list', function(req, res) {
		var Client = require('node-rest-client').Client;
        console.log(req);
		var client = new Client();
         var result = {};
         var args = {
		   headers:{"Content-Type": "application/json"} 
		};
        
          var page = req.query.page || 0 ;
          var pageSize = req.query.pageSize || 10;
		client.get("http://sobre.volsted.com/be/user/list?auth="+req.query.auth+"&page="+page+"&pageSize="+pageSize, args, function(data,response) {
		      // parsed response body as js object
		    console.log(data);
		    result = data;
		    res.json(data);
		    // raw response
		    console.log(response);
		}); 
	});	    


 app.get('/be/user/update', function(req, res) {
		var Client = require('node-rest-client').Client;
        console.log(req);
		var client = new Client();
        var result = {};
        var args = {
		   headers:{"Content-Type": "application/json"} 
		};
         //console.log("Request aa gayi");
        //console.log(req.query.user);
        var user = req.query ;
         console.log("#################");
        console.log(req.query);
        console.log("#################");
		///client.get("http://sobre.volsted.com/be/user/update?auth="+req.query.auth+"&id="+user.id+"&name"+user.name+"&email="+user.email+"&phone="+user.phone+"&password="+user.password+"&role="+user.role, args, function(data,response) {
	    client.get("http://sobre.volsted.com/be/user/update?auth="+req.query.auth+"&id="+user.id+"&role="+user.role, args, function(data,response) {
		      // parsed response body as js object
		    console.log(data);
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


 



	app.get('/admin', function(req, res) {
		res.sendfile('./public/index.html');
	});

};