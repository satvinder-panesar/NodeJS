const express = require("express")
const router = express.Router()
const recipe = require("../models/recipe")

router.get("/getAll", (req, res) => {
	recipe.find((err, recipes) => {
		res.json(recipes)
	})
})

router.get("/getRecipesBy/:username", (req, res) => {
	recipe.find({username: req.params.username}, (err, recipes) => {
		res.json(recipes)
	})
})

router.post("/addRecipe", (req, res) => {
	const recipe_instance = new recipe(req.body)
	recipe_instance.save((err) => {
	  // error code 11000 is duplicate key
	  if (err && err.code === 11000){
	  	res.status(400)
	  	res.json({message: "a recipe with name-username combination already exists"})
	  }
	  else{
	  	res.json({message: "recipe added"})
	  }
	});
})

module.exports = router