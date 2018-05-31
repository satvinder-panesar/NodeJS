var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request')

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
	res.render("Homepage",{data : "Please Enter Below Details"});
});

app.post("/ValidateLogin",function(req,res){
	let obj = JSON.parse(fs.readFileSync('User.json', 'utf8'));
	let login_status = "failure";
	for(let i=0; i<obj.length; i++){
		if(obj[i].id == req.body.username){
			if(obj[i].password == req.body.password)
				login_status = "success";
		}
	}
	if(login_status == "success"){		
		res.render("Choice");		
	}
	else
		res.render("Homepage",{data : "Incorrect Login Details"});
});

app.get("/ShowCurrentWeather",function(req,resp){
	var city;
	let response="No data";
	request('http://ipinfo.io', function(error, res, body) {
		let obj = JSON.parse(fs.readFileSync('temperature.json', 'utf8'));	
		for(let i=0; i<obj.length; i++){
			if(obj[i].city == JSON.parse(body)["city"]){
				response = 'zip_code:'+obj[i].zip_code+'<br><br>city:'+obj[i].city+'<br><br>state:'+obj[i].state+'<br><br>temp_f:'+obj[i].temp_f;
			}			
		}
		resp.send("City identified as "+JSON.parse(body)["city"]+" <br>Details "+response);
	});	
});

app.post("/ShowUserEnteredCity",function(req,res){
	let response="No data";
	let obj = JSON.parse(fs.readFileSync('temperature.json', 'utf8'));	
	for(let i=0; i<obj.length; i++){
		if(obj[i].zip_code == req.body.zipcode){
			response = 'zip_code:'+obj[i].zip_code+'<br><br>city:'+obj[i].city+'<br><br>state:'+obj[i].state+'<br><br>temp_f:'+obj[i].temp_f;
		}			
	}	
	res.send(response);
});