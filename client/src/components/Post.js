import React, { useState } from "react";

import { editPost, deletePost } from "../api";

const Post = ({ postname, postcontent, _id, onPostEdited, onPostDeleted }) => {
  const [onEditMode, setOnEditMode] = useState(false);
  const [postTitle, setPostTitle] = useState(postname);
  const [description, setDescription] = useState(postcontent);

  const handlePostDelete = async () => {
    await deletePost(_id);
    onPostDeleted();
  };

  const handleEditPost = async () => {
    setOnEditMode(false);
    var result = await editPost({
      postcontent: description,
      postname : postTitle,
      id: _id,
    });
    onPostEdited(result.data._doc);
  };

  const renderEditModeContent = () => {
    return (
      <div className="card">
        <div className="m-3">
          <div className="form-group">
            <input
              type="text"
              value={postTitle}
              className="form-control"
              placeholder="Enter Title"
              onChange={(event) => setPostTitle(event.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              value={description}
              className="form-control"
              placeholder="Enter Description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <br />
          <button className="btn btn-success" onClick={handleEditPost}>
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const renderNormalModeContent = () => {
    return (
      <div className="card mt-2" style={{ width: "38rem" }}>
        <div className="card-body">
          <h5 className="card-title">{postname}</h5>
          <p className="card-text">{postcontent}</p>
        </div>
        <div className="btn-group m-3">
          <button
            className="btn btn-primary"
            onClick={() => setOnEditMode(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handlePostDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  };

  return onEditMode ? renderEditModeContent() : renderNormalModeContent();
};

export default Post;
