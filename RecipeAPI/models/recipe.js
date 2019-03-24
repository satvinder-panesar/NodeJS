const mongoose = require("mongoose")

let recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	steps: {
		type: [String],
		required: true
	},
	ingredients: {
		type: [String],
		required: true
	}

})

let recipe = module.exports = mongoose.model("recipe", recipeSchema)