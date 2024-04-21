import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "./Login.css";

import GoogleLogo from "../../images/google.png";
const config = require("../../config_frontend.js");

const host = config.server.host;
const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // const handleGoogleLogin = () => {
  //   console.log("Google");
  // };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
        console.log(res.data);
        const email = res.data.email;
        const url = `${host}/api/auth/glogin`;
        const resp = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const json = await resp.json();
        console.log(json);
        if (json.success) {
          // Save the auth token and redirect
          console.log(json.authToken);
          localStorage.setItem("token", json.authToken);
          props.showAlert("Logged in successfully", "success");
          // alert("Logged In Successfully")
          navigate("/");
        } else {
          props.showAlert("Invalid credentials", "danger");
          // alert("Invalid credentials")
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    const url = `${host}/api/auth/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      console.log(json.authToken);
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in successfully", "success");
      // alert("Logged in successfully");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
      // alert("Invalid credentials");
    }
    // try {
    //   const url = http://localhost:${port}/api/auth;
    //   const { data: res } = await axios.post(url, data);
    //   localStorage.setItem("token", res.data);
    //   window.location = "/";
    // } catch (error) {
    //   if (
    //     error.response &&
    //     error.response.status >= 400 &&
    //     error.response.status <= 500
    //   ) {
    //     setError(error.response.data.message);
    //   }
    // }
  };

  return (
    <div className="login_container" style={{ background: "#B1D0E0" }}>
      <div className="login_form_container">
        <div className="leftlogin">
          <form className="form_container_login" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input_login"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input_login"
            />
            {error && <div className="error_msg_login">{error}</div>}
            <button type="submit" className="green_btn_login">
              Sign In
            </button>
          </form>
          <div className="google_login_container">
            <button className="google_login_btn" onClick={handleGoogleLogin}>
              <img
                src={GoogleLogo} // Replace this with the Google logo image URL
                alt="Google Logo"
                className="google_logo"
              />
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="rightlogin">
          <h1 className="heading">New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn_login">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
