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
	  	// 400 is for bad request
	  	res.status(400)
	  	res.json({message: "a recipe with name-username combination already exists"})
	  }
	  res.json({message: "recipe added"})
	});
})

router.post("/updateRecipe", (req, res) => {
	const myquery = { name: req.body.name, username: req.body.username }
	const newvalues = { $set: {steps: req.body.steps, ingredients: req.body.ingredients } }
  	recipe.updateOne(myquery, newvalues, (err, recipe) => {
  		if(err){
  			res.status(400)
  			res.json({message: "update failed"})
  		}
  		res.json({message: "update successful"})
  	})
})

router.post("/deleteRecipe", (req, res) => {
	const myquery = { name: req.body.name, username: req.body.username }
	recipe.remove(myquery, (err, recipe) => {
  		if(err){
  			res.status(400)
  			res.json({message: "delete failed"})
  		}
  		res.json({message: "delete successful"})
  	})
})

module.exports = router