import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const config = require("../../config_frontend.js");

const host = config.server.host;

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    rollNumber: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   if(cred.password !== cred.cpassword){
    //     props.showAlert("Passwords donot match",'danger');
    // }
    // else{
    const url = `${host}/api/auth/createuser`;
    // const url = `${host}/api/auth/createuser`;
    const { name, rollNumber, phone, email, password } = data;

    if (password.length < 8) {
      props.showAlert("Password must be at least 8 characters long", "danger");
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, rollNumber, phone, email, password }),
    });
    const output = await response.json();

    if (output.success) {
      localStorage.setItem("token", output.authToken);
      props.showAlert("Account created successfully", "success");
      navigate("/");
    } else {
      // props.showAlert("Invalid credentials",'danger')
      props.showAlert("User with this email address alredy exists", "danger");
    }
    console.log(output);

    // }

    // try {
    //   const url = `http://localhost:${5001}/api/users`;
    //   const { data: res } = await axios.post(url, data);
    //   navigate("/login");
    //   console.log(res.message);
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
    <div className="signup_container" style={{ background: "#B1D0E0" }}>
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>New? Create Account</h1>
            <input
              type="text"
              placeholder="Name as per ERP"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Roll Number"
              name="rollNumber"
              onChange={handleChange}
              value={data.rollNumber}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Contact Number"
              name="phone"
              onChange={handleChange}
              value={data.phone}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}

            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
