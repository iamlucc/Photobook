var View = require("../models/view"),
    Comment = require("../models/comment");

// middleware
var middlewareFunctions = {};

middlewareFunctions.checkLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   
   req.flash("error", "Please login to do further action");
   res.redirect("/login");
    
}

middlewareFunctions.checkViewOwner = function(req, res, next){
   // whether user login
   if(req.isAuthenticated()){
      View.findById(req.params.id, function(err, foundView){
         if(err){
            console.log(err);
            req.flash("error", "This share is not found");
            res.redirect("back");
         }else{
            // check view exist
            if (!foundView) {
                 req.flash("error", "This is not found");
                 return res.redirect("back");
             }
            
            // whether user own this view
            if(foundView.author.id.equals(req.user._id)){
               // console.log(foundView);
               // render show next
               next();
            } else {
               req.flash("error", "You have no permission to do this action");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("error", "Please login to do further action");
      res.redirect("back");
   }  
    
}

middlewareFunctions.checkCommentOwner = function(req, res, next){
   // whether user login
   if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundMessage){
         if(err){
            console.log(err);
            res.redirect("back");
         }else{
            // check message exist
            if (!foundMessage) {
                 req.flash("error", "This is not found");
                 return res.redirect("back");
             }
             
            // whether user own this message
            if(foundMessage.author.id.equals(req.user._id)){
               // console.log(foundView);
               // render show next
               next();
            } else {
               req.flash("error", "You have no permission to do this action");
               res.redirect("back");
            }
         }
      });
   } else {
      req.flash("error", "Please login to do further action");
      res.redirect("back");
   }  
    
}

module.exports = middlewareFunctions;