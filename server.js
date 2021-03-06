const express = require('express');
const request = require('request');
const db = require("./models");
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require("./config/passportConfig"); 
const session = require("express-session"); 
const flash = require("connect-flash"); 
const isLoggedIn = require("./middleware/isLoggedIn"); 
const helmet = require("helmet")
const multer = require("multer"); 
const methodOverride = require("method-override"); 
const upload = multer({dest: "./upload/"});
const cloudinary = require('cloudinary'); 

const Unsplash = require('unsplash-js').default;

const UnsplashApi = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY,
  callBackUrl:process.env.UNSPLASH_CALL_BACK
});







require("dotenv").config(); 
const SequelizeStore = require("connect-session-sequelize")(session.Store); 

const app = express();

app.set('view engine','ejs');
app.use(methodOverride("_method")); 
app.set("layout extractScripts", true); 
app.use(express.static("static"));  
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(helmet()); 

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 30 * 60 * 1000
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



// ************************************************ HOME/PROFILE/ABOUT ROUTES ************************************************ 

//UNPLASH API CALL 

//index (home)
app.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/profile')
  } else {
    res.render('index');
  }
});

//profile
app.get('/profile', isLoggedIn, function(req, res) {
  console.log('hitting the get profile route post login')
  db.user.findById(req.user.id).then( function(user){
    user.getLocations().then( function(locations) {
      // res.json({user,locations})
      res.render('profile', {user,locations})
    })
  })
});

//render the about page 
app.get("/about", function(req, res){
  res.render("about")
})

app.use('/auth', require('./controllers/auth'));
app.use('/locations', require('./controllers/locations'));
app.use('/collections', require('./controllers/collections'));

const server = app.listen(process.env.PORT || 3000);

module.exports = server;
