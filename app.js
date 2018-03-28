var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
    
var View = require("./models/view"), // view
    Comment = require("./models/comment"),
    User = require("./models/user"),
    Seed = require("./seeds");

// Routes    
var lifeRoutes = require("./routes/life"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/index")


mongoose.connect("mongodb://localhost/photo_book_2");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // .ejs skip
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// Seed(); // seeds to seed DB

// passport config
app.use(require("express-session")({
   secret: "Just take on challenges and surmount it!",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass current user to each rout
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.fail = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

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

app.use("/life", lifeRoutes);
app.use("/life/:id/comments", commentRoutes);
app.use("/", authRoutes);

// listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Photobook server has worked!");
});
