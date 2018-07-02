const express = require('express');
const router = express.Router();

router.get("/getUsers", require("./users/getUsers"));

module.exports = router;