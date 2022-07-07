const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postname: { type: String, required: true},
  userid: { type: String, required: true},
  postcontent: { type: String}
});

const Post = mongoose.model("Post", postSchema);

async function create(title, created_by, description) {

  const newPost = Post({
    postname: title,
    userid: created_by,
    postcontent: description
  });
  
  const response = await newPost.save();
  return response;
}

async function updatePost(id, title, description) {
  const currentPost = await getPost(id);
  const updatedPost = await Post.findByIdAndUpdate(id, {
    postname: title,
    userid: currentPost.userid,
    postcontent: description
  }, {new : true});

  return updatedPost;
}

async function deletePost(id) {
  return await Post.findByIdAndRemove(id);
};

async function getPostsByUser(userid) {
  return await Post.find({ "userid": userid});
}

async function getPost(post_id) {
  return await Post.findOne({ "_id": post_id});
}

module.exports = { 
  create, updatePost, deletePost ,getPost, getPostsByUser
};