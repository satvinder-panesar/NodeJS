const express = require("express")
const router = express.Router()
const recipe = require("../models/recipe")

router.get("/getAll", (req, res) => {
	recipe.find((err, recipes) => {
		res.json(recipes)
	})
})

module.exports = router