import React, { useState } from "react";
import "./AccountSettings.css";
const config = require("../../config_frontend.js");

const host = config.server.host;

const ChangePassword = (props) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/changePassword`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      props.showAlert("Sorry! your current password is incorrect", "danger");
    } 
    else {
      props.showAlert("Password changed successfully", "success");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    }

    console.log("Password data submitted:", passwordData);
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Change Password</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentpass">
            Current Password <span>*</span>
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newpass">
            New Password <span>*</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="center-button">
          <button type="submit" className="mainbutton1">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
