var mongoose = require("mongoose");

var View = require("./models/view"); // view
var Comment = require("./models/comment");

var data = [
    {
        name: "Jason Chang", 
        image: "https://source.unsplash.com/IuSemNxGS88",
        description: "I feel my breath, heart and life!"
        
    },
    {
        name: "Tom Zheng", 
        image: "https://source.unsplash.com/RFgO9B_OR4g",
        description: "I miss there and you so much."
        
    },
    {
        name: "Jim Lu", 
        image: "https://source.unsplash.com/rzCi3mD-6ho",
        description: "I enjoy taking on challenges."
        
    }
]


function Seed(){
    // remove all
    View.remove({}, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Remove!");
        }
        // create views
        data.forEach(function(seed){
            View.create(seed, function(err, view){
                if(err){
                    console.log(err);
                } else {
                    console.log("add a new view");
                    
                    // create a comment
                    Comment.create(
                        {
                            content: "I like your share!",
                            author: "Amy"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                view.comments.push(comment);
                                view.save();
                                console.log("Add a new comment");
                            }
                        });
                    
                }
            });
        });
    });
    
    
    // 
}

module.exports = Seed;

