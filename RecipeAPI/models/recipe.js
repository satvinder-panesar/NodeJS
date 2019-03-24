const mongoose = require("mongoose")

let checkLimit = (arr) => {
	return arr.length > 0
}

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
		required: true,
		validate: [checkLimit, "at least one step is required"]
	},
	ingredients: {
		type: [String],
		required: true,
		validate: [checkLimit, "at least one ingredient is required"]
	}

})

recipeSchema.index({name: 1, username: 1}, {unique: true})

// for model name recipe, collection name is recipes
let recipe = module.exports = mongoose.model("recipe", recipeSchema)