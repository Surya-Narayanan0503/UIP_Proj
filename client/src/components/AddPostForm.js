import React, { useState } from "react";

import { createPost } from "../api";

const AddPostModal = (props) => {

  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPost = async () => {
    let result = await createPost({
      title : postTitle,
      userId : props.userId,
      description : description
    });

    let createdPost = {
      _id : result.data._doc._id,
      postname : result.data._doc.postname,
      userid : result.data._doc.userid,
      postcontent : result.data._doc.postcontent,
    };
    setPostTitle("");
    setDescription("");
    
    props.onPostAdded(createdPost);
  };

  return (
    <div className="card">
      <div className="m-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Post Title</label>
          <input
            type="text"
            value={postTitle}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Title"
            onChange={(event) => setPostTitle(event.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleInputEmail2">Post Description</label>
          <input
            type="text"
            value={description}
            className="form-control"
            id="exampleInputEmail2"
            placeholder="Enter Description"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleAddPost}>
          Add Post
        </button>
      </div>
    </div>
  );
};

export default AddPostModal;
