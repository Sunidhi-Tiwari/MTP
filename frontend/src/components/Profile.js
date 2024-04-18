import React, { useState } from "react";

const StudentInfo = () => {
  // State to manage editable fields
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [rollNumber, setRollNumber] = useState("123456");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [institutionalEmail, setInstitutionalEmail] = useState(
    "john.doe@university.edu"
  );
  const [personalEmail, setPersonalEmail] = useState("john.doe@gmail.com");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Save data to backend or update state in real application
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div
            className="bg-light p-4 rounded border"
            style={{ backgroundColor: "#F3E8E2" }}
          >
            <h2 className="text-primary mb-4">Personal Information</h2>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="name"
                  className="form-label"
                  style={{ color: "#D1510A" }}
                >
                  Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ borderColor: "#191818" }}
                  />
                ) : (
                  <p>{name}</p>
                )}
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="rollNumber"
                  className="form-label"
                  style={{ color: "#D1510A" }}
                >
                  Roll Number:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="rollNumber"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    style={{ borderColor: "#191818" }}
                  />
                ) : (
                  <p>{rollNumber}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="phoneNumber"
                  className="form-label"
                  style={{ color: "#D1510A" }}
                >
                  Phone Number:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ borderColor: "#191818" }}
                  />
                ) : (
                  <p>{phoneNumber}</p>
                )}
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="institutionalEmail"
                  className="form-label"
                  style={{ color: "#D1510A" }}
                >
                  Institutional Email:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="institutionalEmail"
                    value={institutionalEmail}
                    onChange={(e) => setInstitutionalEmail(e.target.value)}
                    style={{ borderColor: "#191818" }}
                  />
                ) : (
                  <p>{institutionalEmail}</p>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="personalEmail"
                  className="form-label"
                  style={{ color: "#D1510A" }}
                >
                  Personal Email:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    id="personalEmail"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    style={{ borderColor: "#191818" }}
                  />
                ) : (
                  <p>{personalEmail}</p>
                )}
              </div>
            </div>
            <div className="text-center">
              {isEditing ? (
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="btn btn-dark" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
