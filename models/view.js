var mongoose = require("mongoose");

// view database schema
var viewSchema =new mongoose.Schema({
      name: String,
      image: String,
      description: String,
      date: {type: Date, default: Date.now},
      author: {
          id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
          
          username: String
      },
      comments: [
         {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
          }
      ]
   });

var View = mongoose.model("View", viewSchema);

module.exports = View