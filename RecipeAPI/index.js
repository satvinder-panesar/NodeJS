const express = require("express")
const app = new express()
const path = require("path")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const recipes = require("./routers/recipes")

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
const recipe = require("./models/recipe")

let recipe_instances = [
	{
		name: "stir fry mushrooms",
		username: "satvinder",
		steps: ["cook mushrooms and red peppers", "add wine", "mix well"],
		ingredients: ["red wine", "mushrooms", "red peppers"]
	},
	{
		name: "chicken rice bowl",
		username: "satvinder",
		steps: ["cook chicken and rice", "add corn, peppers and tomatoes", "mix well"],
		ingredients: ["chicken", "rice", "corn", "peppers", "tomatoes"]
	}
]

for(let i in recipe_instances){
	let recipe_instance = new recipe(recipe_instances[i])
	recipe_instance.save((err) => {
	  // error code 11000 is duplicate key
	  if (err) console.log(err.errmsg);
	  else{
	  	console.log(`recipe instance ${i} saved`)
	  }
	});
}

app.use("/api/recipes", recipes)








