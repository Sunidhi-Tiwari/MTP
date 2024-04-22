import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../images/navbaricon.png";
const config = require("../config_frontend.js");

const host = config.server.host;
const Navbar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  const [name, setName] = useState(null);
  let [flag, setFlag] = useState(true);
  const getName = async () => {
    if (!localStorage.getItem("token")) {
      setName("Profile");
    }
    else{
      const url = `${host}/api/auth/getuser`;
      const result = await axios.get(url, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setName(result.data.name);
      console.log(result.data);
      console.log(result.data.name);
    }
  };

  useEffect(() => {
    
      getName();

  }, [localStorage.getItem("token")]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
    props.showAlert("Logged out succesfully", "success");
  };

  const handleAddProject = () => {
    if (!localStorage.getItem("token")) {
      props.showAlert("Please login first to add project", "danger");
      navigate("/login");
    } else {
      navigate("/addProject");
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ background: "#406882" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          <img
            src={Logo}
            alt="ProjectNexus"
            style={{ maxHeight: "40px", marginRight: "10px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0 text-center align-items-center"
            // style={{
            //   position: "fixed",
            //   left: "50%",
            //   transform: "translateX(-50%)",
            //   margin: 0,
            //   padding: 0,
            // }}
            style={{position: "relative", left: "34%"}}
          >
            {/* <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                Home
              </Link>
            </li> */}
            <li className="nav-item align-items-center">
              <Link
                className={`nav-link ${
                  location.pathname === "/allProjects" ? "active" : ""
                }`}
                to="/allProjects"
                style={{ textDecoration: "none", color: "white" }}
              >
                All Projects
              </Link>
            </li>
            <li className="nav-item align-items-center">
              <button
                className={`nav-link ${
                  location.pathname === "/addProject" ? "active" : ""
                }`}
                // to="/addProject"
                onClick={handleAddProject}
                style={{ textDecoration: "none", color: "white" }}
              >
                Add Project
              </button>
            </li>
            {/* <li className="nav-item mx-2">
              <Link
                className={`nav-link ${
                  location.pathname === "/user/accountsettings" ? "active" : ""
                }`}
                to="/user/accountsettings"
              >
                Your Profile
              </Link>
            </li> */}
          </ul>
          
            <div
              className="d-flex justify-content-end collapse navbar-collapse align-items-center"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {name}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                    style={{ background: "#B1D0E0" }}
                  >
                    {!localStorage.getItem("token") ? (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/login"
                            style={{ textDecoration: "none", color: "#1A374D" }}
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/signup"
                            style={{ textDecoration: "none", color: "#1A374D" }}
                          >
                            Signup
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/user/accountsettings"
                            style={{ textDecoration: "none", color: "#1A374D" }}
                          >
                            Profile Details
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/user/currentprojects"
                            style={{ textDecoration: "none", color: "#1A374D" }}
                          >
                            Current Projects
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/user/pendingrequests"
                            style={{ textDecoration: "none", color: "#1A374D" }}
                          >
                            Pending Requests
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/"
                            onClick={handleLogout}
                            style={{ textDecoration: "none", color: "#1A374D" }}
                          >
                            Logout
                          </Link>
                        </li>
                        {/* <li>
                        <Link className="dropdown-item" to="/">
                          Something else here
                        </Link>
                      </li> */}
                      </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          
          {/* form */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
