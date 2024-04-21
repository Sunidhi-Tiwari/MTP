import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccountSettings.css";
const config = require("../../config_frontend.js");

const host = config.server.host;

const AccountSettings = (props) => {
  let [flag, setFlag] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rollNumber: "",
  });

  const getDetails = async () => {
    const url = `${host}/api/auth/getuser`;
    const result = await axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setFormData({
      name: result.data.name,
      phone: result.data.phone,
      email: result.data.email,
      rollNumber: result.data.rollNumber,
    });
    console.log(result.data);
    console.log(result.data.name);
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
      getDetails();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/users/accountSettings`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        rollNumber: formData.rollNumber,
        phone: formData.phone,
      }),
    });
    const json = await response.json();
    console.log(json.response);
    props.showAlert("Changes saved successfully", "success");
    console.log("Form submitted:", formData);
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Personal Information</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Your Name <span>*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            disabled="true"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            id="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone/Mobile <span>*</span>
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="rollNumber">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            id="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            disabled
          />
        </div> */}

        <div className="center-button">
          <button type="submit" className="mainbutton1">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
