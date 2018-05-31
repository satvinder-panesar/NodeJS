var express = require('express');
var app = express();
var path = require('path');
var oracledb = require('oracledb');
var bodyParser = require('body-parser');

app.listen(8084);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

console.log("Server started at 8084");

app.get("/", function(req,res){
	res.render("index");
});

app.get("/View",function(req,res){	
	oracledb.getConnection(
	  {
		user          : "examples",
		password      : "password",
		connectString : "localhost:1522/XE"
	  },
	  function(err, connection)
	  {
		if (err) { console.error(err); return; }
		connection.execute(
		  "SELECT type, price "
		+ "FROM petrolpumps ",
		  function(err, result)
		  {
			if (err) { console.error(err); return; }
			console.log(result);
			res.render('view',{ data : result.rows});
		  });
	  });
});

app.post("/Add",function(req,res){
	
	if(req.body.type == null || req.body.price == 0){res.send("All fields are mandatory");}
	
	oracledb.autoCommit = true;	
	
	oracledb.getConnection(
	  {
		user          : "examples",
		password      : "password",
		connectString : "localhost:1522/XE"
	  },
	  function(err, connection)
	  {
		if (err) { console.error(err); return; }
		connection.execute(
			 "INSERT INTO petrolpumps(type, price) VALUES (:t, :p)",
			{
			  t: req.body.type,
			  p: req.body.price
			},
			function(err, result)
			  {
				if (err) { console.error(err); return; }
				console.log("Insertion done");
				res.send('Insertion done');
			  }
		);
	});
});

app.get("/Login",function(req,res){
	res.render("login");
});

app.get("/Register",function(req,res){
	res.render("register");
});

app.post("/ValidateRegistration",function(req,res){
	oracledb.autoCommit = true;	
	oracledb.getConnection(
	  {
		user          : "examples",
		password      : "password",
		connectString : "localhost:1522/XE"
	  },
	  function(err, connection)
	  {
		if (err) { console.error(err); return; }
		connection.execute(
		  "SELECT emailid "
		+ "FROM users where emailid = :emailid",
		{emailid : req.body.emailid},
		  function(err, result)
		  {
			if (err) { console.error(err); return; }
			if (result.rows.length == 0){
				connection.execute(
					 "INSERT INTO users (emailid, password, address) VALUES (:emailid, :password, :address)",
					{
					   emailid: req.body.emailid,
					  password: req.body.password,
					  address: req.body.address
					},
					function(err, result)
					  {
						if (err) { console.error(err); return; }
						console.log("Insertion done");
						res.send('Insertion done');
					  }
			);
			}
			else{
				res.send('Email ID already in use');
			}
		  });
	  });
});


app.post("/ValidateLogin",function(req,res){
	oracledb.autoCommit = true;	
	oracledb.getConnection(
	  {
		user          : "examples",
		password      : "password",
		connectString : "localhost:1522/XE"
	  },
	  function(err, connection)
	  {
		if (err) { console.error(err); return; }
		connection.execute(
		  "SELECT emailid "
		+ "FROM users where emailid = :emailid and password = :password",
		{emailid : req.body.emailid, password : req.body.password},
		  function(err, result)
		  {
			if (err) { console.error(err); return; }
			if (result.rows.length == 0){
				res.send("Email ID not registered");
			}
			else{
				res.render('add');
			}
		  });
	  });
});
