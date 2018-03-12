var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/photo_book");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // .ejs skip

// Database schema
var viewSchema =new mongoose.Schema({
      name: String,
      image: String,
      description: String
   });

var View = mongoose.model("View", viewSchema);

// for testing
// View.create(
//    {
//       name: "Tom Zheng", 
//       image: "https://source.unsplash.com/RFgO9B_OR4g",
//       description: "This is a amazing view. I can feel my breath, heart and life!"
      
//    }, function(err, view){
//       if(err){
//          console.log(err);
//       }else{
//          console.log("New view added!");
//          console.log(view);
//       }
//    });

// var views = [
//             {name: "Jason Chang", image: "https://source.unsplash.com/IuSemNxGS88"},
//             {name: "Tom Zheng", image: "https://source.unsplash.com/RFgO9B_OR4g"},
//             {name: "Jim Lu", image: "https://source.unsplash.com/rzCi3mD-6ho"},
//             {name: "Push Yeh", image: "https://images.unsplash.com/photo-1508583732154-e9ff899f8534?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=46d9d3c806be516cd9bcdd23e3171c67&auto=format&fit=crop&w=700&q=80"},
//             {name: "Weili Hu", image: "https://images.unsplash.com/photo-1484244233201-29892afe6a2c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2db8de5b9f0478ba59dfd9d61f4d64fe&auto=format&fit=crop&w=1050&q=80"},
//             {name: "Jim Lu", image: "https://images.unsplash.com/photo-1518653173366-b93be0d34136?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a1f1d5cc6b904d9a31504be3496d38ec&auto=format&fit=crop&w=700&q=80"},
//             {name: "Push Yeh", image: "https://images.unsplash.com/photo-1493589976221-c2357c31ad77?ixlib=rb-0.3.5&s=2710bb260367c873296ddfd3efb1e09a&auto=format&fit=crop&w=634&q=80"},
//             {name: "Weili Hu", image: "https://images.unsplash.com/photo-1479888912530-af5a74b7adea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4019fad81f9b86008c0b93251a3acfec&auto=format&fit=crop&w=1050&q=80"}
//             ]

// landing page
app.get("/", function(req, res){
   res.render("landing");
});

// index (life)
app.get("/life", function(req, res){
   // retrieve view from database
   View.find({}, function(err, allViews){
      if(err){
         console.log(err);
      }else{
         res.render("index", {views: allViews});
      }
   });
   //  res.render("life", {views: views});
});

// create (add new view to DB)
app.post("/life", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newView = {name: name, image: image, description: description};
   
   // get data and store it in a array
   // views.push(newView);
   
   // create a new view and save to the DB
   View.create(newView, function(err, newCreated){
      if(err){
         console.log(err);
      }else{
         // redirect
         res.redirect("/life");
      }
   });
});

// new (form for adding new view)
app.get("/life/new", function(req, res){
   res.render("new");
});

// show (more information)
app.get("/life/:id", function(req, res){
   // find a specific view according to ID
   View.findById(req.params.id, function(err, foundView){
      if(err){
         console.log(err);
      }else{
         // render show detail information with tha view
         res.render("show", {view: foundView});
      }
   });
});

// listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Photobook server has worked!");
});
