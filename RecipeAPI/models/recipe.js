const mongoose = require("mongoose")

let recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
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

recipeSchema.index({name: 1, username: 1}, {unique: true})

// for model name recipe, collection name is recipes
let recipe = module.exports = mongoose.model("recipe", recipeSchema)