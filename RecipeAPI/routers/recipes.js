const express = require("express")
const router = express.Router()
const recipe = require("../models/recipe")

let handleError = (err, message, res) => {
	// error code 11000 is duplicate key
	if(err.code === 11000){
  		// 400 is for bad request
  		res.status(400)
  		res.json({status: "a recipe with name-username combination already exists"})
  	}
  	else if(err.name === "ValidationError"){
  		res.status(400)
  		res.json({status: err.message})
  	}else{
  		// 500 is for server error
  		res.status(500)
  		res.json({status: message})
  	}
}

let validRequest = (req) => {
	if(req.body.name && req.body.name.length > 0 && req.body.username && req.body.username.length > 0)
		return true
	else
		return false
}

router.get("/getAll", (req, res) => {
	recipe.find((err, recipes) => {
		if(err)
			handleError(err, "get failed", res)
		else
			res.json(recipes)
	})
})

router.get("/getRecipesBy/:username", (req, res) => {
	recipe.find({username: req.params.username}, (err, recipes) => {
		if(err)
			handleError(err, "get failed", res)
		else
			res.json(recipes)
	})
})

router.post("/addRecipe", (req, res) => {
	if(!validRequest(req)){
		const err = {name: "ValidationError", message: "name and username are required fields"}
		handleError(err, "", res)
	}
	else{
		const recipe_instance = new recipe(req.body)
		recipe_instance.save((err) => {
		  if (err){
		  	handleError(err, "add failed", res)
		  }else
		  	res.json({status: "recipe added"})
		});
	}
})

router.post("/updateRecipe", (req, res) => {
	if(!validRequest(req)){
		const err = {name: "ValidationError", message: "name and username are required fields"}
		handleError(err, "", res)
	}else{
		const myquery = { name: req.body.name, username: req.body.username }
		const newvalues = { $set: {steps: req.body.steps, ingredients: req.body.ingredients } }
	  	recipe.updateOne(myquery, newvalues, { runValidators: true }, (err) => {
	  		if(err){
	  			handleError(err, "update failed", res)
	  		}
	  		else
	  			res.json({status: "update successful"})
	  	})
	}
})

router.post("/deleteRecipe", (req, res) => {
	if(!validRequest(req)){
		const err = {name: "ValidationError", message: "name and username are required fields"}
		handleError(err, "", res)
	}else{
		const myquery = { name: req.body.name, username: req.body.username }
		recipe.remove(myquery, (err) => {
	  		if(err){
	  			handleError(err, "delete failed", res)
	  		}
	  		else
	  			res.json({status: "delete successful"})
	  	})
	}
})

module.exports = router