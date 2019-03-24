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
	step: {
		type: [String],
		required: true
	},
	ingredient: {
		type: [String],
		required: true
	}

})

let recipe = module.exports = mongoose.model("recipe", recipeSchema)