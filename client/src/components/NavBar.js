import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ active, isLoggedIn }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">Social Media App</h1>
        <div id="navbarNav">
          <ul className="navbar-nav">
            {!isLoggedIn && <li className="nav-item">
              <Link
                className={`nav-link ${active === "login" ? "active" : ""}`}
                to="/">Login
              </Link>
            </li>
            }
            {
              !isLoggedIn && <li className="nav-item">
                <Link
                  className={`nav-link ${active === "signup" ? "active" : ""}`}
                  to="/signup">SignUp
                </Link>
              </li>
            }
            {
              isLoggedIn && <li className="nav-item">
                <Link
                  className={`nav-link ${active === "home" ? "active" : ""}`}
                  to="/profile">Home
                </Link>
              </li>
            }
            {
              isLoggedIn && <li className="nav-item">
                <Link
                  className={`nav-link ${active === "users" ? "active" : ""}`}
                  to="/users">Users
                </Link>
              </li>
            }
            {
              isLoggedIn && <li className="nav-item">
                <Link
                  className={`nav-link`}
                  to="/">Logout
                </Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
