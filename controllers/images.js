const express = require('express');
const router = express.Router();
const db = require("../models"); 


router.get("/images", function(req, res){
    res.render("images")
})















module.exports = router; 