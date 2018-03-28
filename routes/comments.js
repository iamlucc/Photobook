var express = require("express");
var router = express.Router({mergeParams: true}); // merge view and comment id
var View = require("../models/view"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// comments
// NEW
router.get("/new", middleware.checkLoggedIn, function(req, res){
   View.findById(req.params.id, function(err, foundView){
      if(err){
         console.log(err);
         res.redirect("/life");
      }else{
         // render to the form
         res.render("comments/new", {view: foundView});
      }
   });
});

// CREATE
router.post("/", middleware.checkLoggedIn, function(req, res){
   // find a specific view by ID
   View.findById(req.params.id, function(err, foundView){
      if(err){
         console.log(err);
         res.redirect("/life");
      }else{
         // create a new message
         Comment.create(req.body.message, function(err, message){
            if(err){
               req.flash("error", "Opps, Something is wrong");
               console.log(err);
            } else {
               // associate usernae and id
               message.author.id = req.user._id;
               message.author.username = req.user.username;
               message.save();
               // connect the message with that view
               foundView.comments.push(message);
               foundView.save();
               // console.log(message);
               req.flash("success", "Leave a message successfully");
               // redirect
               res.redirect("/life/" + foundView._id);
            }
         });
      }
   });
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundMessage){
      if(err){
         res.redirect("back");
      } else {
         res.render("comments/edit", {view_id: req.params.id, comment: foundMessage});
      }
   });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.message, function(err, foundMessage){
      if(err){
         res.redirect("back");
      } else {
         res.redirect("/life/" + req.params.id);
      }
   });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
   // find the sepecific view to delete
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
         res.redirect("back");
      } else {
         req.flash("success", "Your meesage is removed");
         res.redirect("/life/" + req.params.id);
      }
   });
});

// Authenticate middleware
// function checkLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//       return next();
//    }
   
//    res.redirect("/login");
// };

// authorization middleware
// function checkCommentOwner(req, res, next){
//    // whether user login
//    if(req.isAuthenticated()){
//       Comment.findById(req.params.comment_id, function(err, foundMessage){
//          if(err){
//             console.log(err);
//             res.redirect("back");
//          }else{
//             // whether user own this message
//             if(foundMessage.author.id.equals(req.user._id)){
//                // console.log(foundView);
//                // render show next
//                next();
//             } else {
//                res.redirect("back");
//             }
//          }
//       });
//    } else {
//       res.redirect("back");
//    }  
// }

module.exports = router;