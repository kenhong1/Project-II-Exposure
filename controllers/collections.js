const express = require("express");
const db = require("../models");
const router = express.Router();







// POST ONTO PROFILE PAGE
router.post("/", function(req, res){
    db.user.findById(req.user.id).then( function(user) {
        user.addLocation(req.body.id).then( data => res.redirect('/profile'))
    })
})


module.exports = router;  