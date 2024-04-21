import React, { useState } from "react";
import "./AccountSettings.css";
const port = 5001;

const ChangePassword = () => {
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
    const url = `http://localhost:${port}/api/auth/changePassword`;
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
    if (!json.success) {
      alert("Sorry! your current password is incorrect");
    } else {
      alert("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    }
    console.log(json.response);

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
