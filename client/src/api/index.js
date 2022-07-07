import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

const unFollowUser = async (followingId, followerId) => {
  var result = await axiosInstance.post(`/user/unfollow/`, {
    followingId,
    followerId
  });
  return result;
};

const followUser = async (followingId, followerId) => {
  var result = await axiosInstance.post(`/user/follow/`, {
    followingId,
    followerId
  });
  return result;
};

const deleteProfile = async (id) => {
  var result = await axiosInstance.delete(`/user/delete/${id}`);
  return result;
};

const deletePost = async (id) => {
  var result = await axiosInstance.delete(`/post/deletepost/${id}`);
  return result;
};

const editPost = async ({ id, postname, postcontent }) => {
  var result = await axiosInstance.put("/post/updatepost", {
    id,
    postname,
    postcontent,
  });
  return result;
};

const getAllUsers = async () => {
  var result = await axiosInstance.get("/user/getallusers");
  return result;
};

const getAllPostsByUser = async (userid) => {
  var result = await axiosInstance.post("/post/getPostsByUser", {
    userid: userid,
  });
  return result;
};

const createPost = async ({ title, description, userId }) => {
  var result = await axiosInstance.post("/post/createpost", {
    postname: title,
    userid: userId,
    postcontent: description,
  });
  return result;
};

const registerUser = async (username, password) => {
  var result = await axiosInstance.post("/user/register", {
    username,
    password,
  });
  return result;
};

const login = async (username, password) => {
  var result = await axiosInstance.post("/user/login", { username, password });
  return result;
};

export {
  registerUser,
  login,
  createPost,
  getAllPostsByUser,
  editPost,
  deletePost,
  deleteProfile,
  getAllUsers,
  followUser,
  unFollowUser
};
