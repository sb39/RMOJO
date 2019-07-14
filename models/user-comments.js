const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const commentShema = new Schema({
    username : String, 
    comment  : String
});
const Comment = mongoose.model('comment', commentShema);

module.exports = Comment;