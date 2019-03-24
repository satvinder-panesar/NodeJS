const express = require("express")
const app = new express()
const path = require("path")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

app.use(bodyparser.json())
app.listen(8084, () => console.log("Server started"))

mongoose.set('useCreateIndex', true)

let mongoDB = 'mongodb://127.0.0.1/recipe_db';
mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log("connected to mongod"))
db.on('error', (error) => console.log(error));

let recipe = require("./models/recipe")





