const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json({
    strict: false
}));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(3000, console.log('Example app listening on port 3000!'));

app.get('/', function (req, res) {res.sendFile(__dirname+'/pages/homepage.html')});

const authenticatedRoute = express.Router();

authenticatedRoute.use(function (req, res, next){
	if(req.query.username === "guest")
		next();
	else
		res.sendFile(__dirname+"/pages/invalidUser.html");
});

app.use('/api', authenticatedRoute);

authenticatedRoute.use('/users', require("./routers"));
