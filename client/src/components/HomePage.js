import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddPostForm from "./AddPostForm";
import NavBar from "./NavBar";
import Post from "./Post";

import { getAllPostsByUser, deleteProfile } from "../api";

const HomePage = ({ currentUser }) => {
  const navigate = useNavigate()

  const [posts, setPosts] = useState([]);

  const onPostAdded = (post) => {
    setPosts([...posts, post]);
  };

  const handleDeleteProfile = async () => {
    await deleteProfile(currentUser.userId);
    navigate('/');
  }

  const handlePostEdit = (post) => {
    var editedPosts = posts.map((e) => {
      if (e._id === post._id) return post;
      return e;
    });
    setPosts([...editedPosts]);
  };

  const handlePostDelete = (id) => {
    var deleted = posts.filter((e) => e._id !== id);
    setPosts([...deleted]);
  };

  useEffect(() => {
    async function fetchData() {
      var result = await getAllPostsByUser(currentUser.userId);
      setPosts(result.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar active={"home"} isLoggedIn={true} />
      <div>
        <section className="h-100 gradient-custom-2">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-9 col-xl-7">
                <div className="card">
                  <div
                    className="rounded-top text-white d-flex flex-row"
                    style={{ backgroundColor: "#000", height: "200px" }}
                  >
                    <div
                      className="ms-4 mt-5 d-flex flex-column"
                      style={{ width: "150px" }}
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder"
                        className="img-fluid img-thumbnail mt-4 mb-2"
                        style={{ width: "150px", zIndex: 1 }}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <div
                        className="ms-3"
                        style={{ marginTop: "130px", width: "300px" }}
                      >
                        <h5>{currentUser.username}</h5>
                        <p>New York</p>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={handleDeleteProfile}
                        style={{
                          height: "50px",
                          width: "150px",
                          marginBottom: "20px",
                        }}
                      >
                        Delete Profile
                      </button>
                    </div>
                  </div>
                  <div
                    className="p-4 text-black"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="d-flex justify-content-end text-center py-1 h-200"></div>
                  </div>
                  <div className="card-body p-4 text-black">
                    <div className="mb-5">
                      <p className="lead fw-normal mb-1">About</p>
                      <div
                        className="p-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <p className="font-italic mb-1">Web Developer</p>
                        <p className="font-italic mb-1">Lives in New York</p>
                      </div>
                    </div>
                    <AddPostForm
                      userId={currentUser.userId}
                      onPostAdded={onPostAdded}
                    />
                    <br />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead fw-normal mb-0">Recent Posts</p>
                    </div>
                    <div className="posts">
                      {posts.map((e, index) => {
                        return (
                          <Post
                            key={index}
                            {...e}
                            onPostEdited={(post) => handlePostEdit(post)}
                            onPostDeleted={() => handlePostDelete(e._id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
