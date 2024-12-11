const mongoose = require("mongoose")


const CreatePostSchema = new mongoose.Schema(
    {
        name: String,
        title: String,
        description: String,
        username: String,
        
    }
)

const CreatePostModel = mongoose.model("CreatePost", CreatePostSchema);

module.exports = CreatePostModel;