const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: String,
  description: String,
});

const Post = mongoose.model('Post', PostsSchema);

module.exports = Post;


