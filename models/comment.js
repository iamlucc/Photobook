var mongoose = require("mongoose");

// comment schema
var commentSchema = new mongoose.Schema({
      content: String,
      author: {
            id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
            },
            
            username: String
      },
      date: {type: Date, default: Date.now}
   });

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment