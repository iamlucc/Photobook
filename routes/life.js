var express = require("express");
var router = express.Router(); // app here
var View = require("../models/view");
var middleware = require("../middleware");

// index (life)
router.get("/", function(req, res){
   if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      View.find({name: regex}, function(err, allViews){
         if(err){
            console.log(err);
         }else{
            res.render("lives/index", {views: allViews, currentUser: req.user, page: "life"});
         }
      });
   } else {
   // retrieve view from database
      View.find({}, function(err, allViews){
         if(err){
            console.log(err);
         }else{
            res.render("lives/index", {views: allViews, currentUser: req.user, page: "life"});
         }
      });
   }
   //  res.render("life", {views: views});
});

// create (add new view to DB)
router.post("/", middleware.checkLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   };
   var newView = {
      name: name, 
      image: image, 
      description: description, 
      author: author
   };
   
   // console.log(req.user);
   
   // get data and store it in a array
   // views.push(newView);
   
   // create a new view and save to the DB
   View.create(newView, function(err, newCreated){
      if(err){
         console.log(err);
      }else{
         // console.log(newCreated);
         // redirect
         res.redirect("/life");
      }
   });
});

// new (form for adding new view)
router.get("/new", middleware.checkLoggedIn,function(req, res){
   res.render("lives/new");
});

// SHOW
router.get("/:id", function(req, res){
   // find a specific view according to ID
   View.findById(req.params.id).populate("comments").exec(function(err, foundView){
      if(err){
         console.log(err);
      }else{
         if (!foundView) {
            return res.status(400).send("This is not found");
         }
         // console.log(foundView);
         // render show detail information with tha view
         res.render("lives/show", {view: foundView});
      }
   });
});

// EDIT
router.get("/:id/edit", middleware.checkViewOwner, function(req, res){
   View.findById(req.params.id, function(err, foundView){
      if (!foundView) {
         return res.status(400).send("This is not found");
      }
      
      res.render("lives/edit", {view: foundView});
   });
});

// UPDATE
router.put("/:id", middleware.checkViewOwner, function(req, res){
   // find a specific view according to ID to update
   View.findByIdAndUpdate(req.params.id, req.body.life, function(err, updatedView){
      if(err){
         console.log(err);
         res.redirect("/life");
      }else{
         // console.log(foundView);
         // render show detail information with tha view
         res.redirect("/life/" + req.params.id);
      }
   });
});

// Destroy
router.delete("/:id", middleware.checkViewOwner, function(req, res){
   View.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/life");
      } else {
         res.redirect("/life");
      }
   });
});

// // authenticate middleware
// function checkLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//       return next();
//    }
   
//    res.redirect("/login");
// }

// authorization middleware
// function checkViewOwner(req, res, next){
//    // whether user login
//    if(req.isAuthenticated()){
//       View.findById(req.params.id, function(err, foundView){
//          if(err){
//             console.log(err);
//             res.redirect("back");
//          }else{
//             // whether user own this view
//             if(foundView.author.id.equals(req.user._id)){
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

// EscapeRegex for search
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;