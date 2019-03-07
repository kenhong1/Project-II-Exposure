const express = require("express");
const db = require("../models");
const router = express.Router();



// Post onto Profiles Page
router.get("/profile/spots", function(req, res){
    db.usersLocations.create({
        id:req.params.id
    }).then(function(){
        res.redirect("/profile")
    });
}); 


// Delete Off of Profile Page 
router.delete("/spots/:id", function(req,res){
    res.send("delete")
})









module.exports = router;  