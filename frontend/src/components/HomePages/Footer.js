import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white py-2"
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        background: "#1A374D",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p style={{ color: "white" }}>
              &copy; 2024 ProjectNexus. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
