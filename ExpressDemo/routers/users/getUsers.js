const express = require('express');
const router = express.Router();
var path = require("path");

router.get("/getUsers", function(req, res) {
	res.sendFile(path.resolve(__dirname+"/../../pages/userData.html"));
})

module.exports = router;