const express = require('express');
const db = require("./models");
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require("./config/passportConfig"); 
const session = require("express-session"); 
const flash = require("connect-flash"); 
const isLoggedIn = require("./middleware/isLoggedIn"); 
const helmet = require("helmet")
const multer = require("multer"); 
const upload = multer({dest: "./upload/"});
const cloudinary = require('cloudinary'); 

require("dotenv").config(); 
const SequelizeStore = require("connect-session-sequelize")(session.Store); 

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("static"));  
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("layout extractScripts", true); 
app.use(ejsLayouts);
app.use(helmet()); 

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 30 * 60 * 1000
}); 


// GEO Coder 
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAP_BOX_KEY
});  


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore 
}));

//use this line once to set up the store table
// sessionStore.sync(); 


// must come after SESSION and before PASSPORT
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.alerts = req.flash(); 
  res.locals.currentUser = req.user; 
  next();
})

// ************************************************************************************************************************

//index (home)
app.get('/', function(req, res) {
  res.render('index');
});


//location
app.get("/location", function(req, res){
  res.render("location")
})


//profile
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});


// upload CLOUDINARY
app.get('/upload', function(req, res) {
  var public_id = "euwaw2atg7xuvewiahue"
  var imgUrl = cloudinary.url(public_id, {width: 500, height: 500, crop: 'crop', gravity: 'face', radius: 'max'})
  res.render('index', {src:imgUrl});
});

app.post("/upload", upload.single('myFile'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    res.send(result); 
  });
});


// MAPBOX GEOCODEr
app.get("/locations/location", function(req, res){
  geocodingClient.forwardGeocode({
      query: "bar " + req.query.city + ", " + req.query.state
  }).send().then(function(response){
      let results = []
      response.body.features.forEach(function(feature){
          results.push(feature.center); 
      })
      res.render("show", {results})
  })
});




app.use('/auth', require('./controllers/auth'));

const server = app.listen(process.env.PORT || 3000);

module.exports = server;
