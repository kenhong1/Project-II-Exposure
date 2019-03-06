const express = require('express');
const router = express.Router();
const db = require("../models"); 
const request = require('request');


// GET ALL LOCATIONS
router.get("/index", function(req, res){
    db.location.findAll()
    .then(function(locations){
    res.render("locations/index", {locations})
    })
}); 

// GET THE NEW FORM TO POST THE LOCATION
router.get("/new", function(req, res){
    res.render("locations/new")
});

// POST A NEW LOCATION
router.post("/", function(req, res){
    db.location.create(
        {name: req.body.name
    }).then(function(locations){
        res.redirect("locations/index"); 
    });
});



// GET A LOCATION BY ID
router.get("/:id", function(req, res){
    db.location.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.image] 
    }).then(function(location){
        console.log(process.env)
        var unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${location.name}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
            // request call to API
            request(unsplashUrl, function(error, response, body){
            var unsplashPics = JSON.parse(body).results;
            res.render("locations/show", {unsplashPics, location} )
            console.log(body)
            console.log("************************ ⬆️ ⬆️ ⬆️  UNSPLASH API CALL ABOVE ⬆️ ⬆️ ⬆️ ************************");
        });
    });
});

// EDIT 1 LOCATION BY ID
router.get("/:id/edit", function(req, res){
    db.location.findById(parseInt(req.params.id)).then(function(locations){
        console.log("YOU HAVE EDITED THE PAGE")
        res.render("locations/edit", {locations})
    });
});














// UPDATE 1 THE LOCATION BY ID
router.put("/:id", function(req,res) {
    db.location.update({
            name: req.body.name,
    },  {
        where: {
            name: req.params.name
    }
        }).then(function(locations) {
        res.redirect("/locations/index");
        });
    });








// DELETE
router.delete("/:id", function(req, res){
    db.location.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(locations){
        res.redirect("/locations/index")
    });
});









// cloudinaryUrl: results.public_id 


module.exports = router;