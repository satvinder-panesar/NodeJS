const express = require("express")
const app = new express()
const path = require("path")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

app.use(bodyparser.json())
app.listen(8084, () => console.log("Server started"))

mongoose.set('useCreateIndex', true)

// connecting mongod
let mongoDB = 'mongodb://127.0.0.1/recipe_db';
mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log("connected to mongod"))
db.on('error', (error) => console.log(error));

// importing model
let recipe = require("./models/recipe")

//inserting sample data
let recipe_instance = new recipe({
	name: "stir fry mushrooms",
	username: "satvinder",
	steps: ["cook mushrooms and red peppers", "add wine", "mix well"],
	ingredients: ["red wine", "mushrooms", "red peppers"]
})

recipe_instance.save((err) => {
  // error code 11000 is duplicate key
  if (err) console.log(err.errmsg);
  else{
  	console.log("recipe instance saved")
  }
});








