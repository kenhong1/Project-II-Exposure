// Middleware to verify that a user is autheticated


module.exports = function(req, res, next){
    console.log(req.user)
    if (!req.user) {
        console.log('🌋fucked up')
        req.flash("error", "you must be logged in to access that page")
        res.redirect("/auth/login")
    } else {
        console.log('🔥not fucked up')
        next(); 
    }
};