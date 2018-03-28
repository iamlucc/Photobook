var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

// landing
router.get("/", function(req, res){
   res.render("landing");
});

// authentication
// register form
router.get("/register", function(req, res) {
   res.render("register", {page: "register"}); 
});

// do sign up
router.post("/register", function(req, res) {
   // req.body.username;
   // req.body.password;
   var newUser = new User({username: req.body.username})
   User.register(newUser, req.body.password, function(err, user){
       if(err){
         //  console.log(err);
         req.flash("error", err.message);
         return res.redirect("/register");
         // return res.render("register");
       }
       
       passport.authenticate("local")(req, res, function(){
         req.flash("success", "Hello, " + user.username +". Share and Enjoy your life!");
         res.redirect("/life");
       });
   });
});

// login form
router.get("/login", function(req, res) {
   res.render("login", {page: "login"}); 
});

// do login
router.post("/login", passport.authenticate("local", 
   {
      successRedirect: "/life", 
      failureRedirect: "/login"
      
   }), function(req, res) {
      res.send("Hi, there!");
});

// log out
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Log out successfully");
   res.redirect("/life");
});

// // authenticate middleware
// function checkLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//       return next();
//    }
   
//    res.redirect("/login");
// };

module.exports = router;