const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const commentShema = new Schema({
    username : String, 
    googleId : String,
    thumbnail : String
});
const Comment = mongoose.model('user', commentShema);

module.exports = Comment;