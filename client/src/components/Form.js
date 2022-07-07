import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, registerUser } from "../api";

const Form = ({ isSignUp, onSignInComplete }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleNavigation = () => {
    if (isSignUp) {
      return navigate("/")
    }
    return navigate("/signup")
  }

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      if (isSignUp) {
        await registerUser(username, password);
        navigate('/');
        setLoading(false);
      }
      else {
        var result = await login(username, password);
        setLoading(false);
        onSignInComplete({
          username,
          userId: result.data._doc._id
        });
        navigate('/profile');
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100 form-wrapper">
        <div className="form-image">
          <img src="form_image.png" />
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100 form">
          <div className="col-xl-10 col-md-11">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-12 col-xl-10">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">
                        Social Media Application
                      </h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Phone number or email address"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>

                      <div className="text-center">

                        <a
                          onClick={handleButtonClick}
                          className="btn btn-primary px-5"
                          role="button">
                          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
                        </a>
                        <p className="text text-center text-danger">{error}</p>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">
                          {!isSignUp
                            ? "Don't have an account?"
                            : "Already Have An Account"}
                        </p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={handleNavigation}
                        >
                          {!isSignUp ? "Create new" : "Log In"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;


