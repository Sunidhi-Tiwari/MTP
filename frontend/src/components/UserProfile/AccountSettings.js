import React, { useState } from "react";
import "./AccountSettings.css";
const port = 5001;

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rollNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:${port}/api/users/accountSettings`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name: formData.name, email: formData.email, rollNumber: formData.rollNumber, phone: formData.phone})
    });
    const json = await response.json(); 
    console.log(json.response);
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
            value={formData.name}
            onChange={handleChange}
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
          />
        </div>

        <button type="submit" className="mainbutton1">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
