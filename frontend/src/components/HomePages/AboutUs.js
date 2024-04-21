import React from "react";
import { Link } from "react-router-dom";
import MiraMitraimg from "../../images/MiraMitra.png";
import Sunidhiimg from "../../images/Sunidhi.jpg";
import Muditimg from "../../images/Mudit.jpg";

const AboutUsSection = () => {
  return (
    <section id="about-us" className="py-5" style={{ background: "#6998AB" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <h1 className="text-center mb-4" style={{ color: "#406882" }}>
              Our Vision
            </h1>
            <p className="text-center" style={{ color: "#1A374D" }}>
              We are Sunidhi Tiwari and Mudit Kumar Bhugari, dual degree
              students from the Department of Aerospace Engineering, IIT
              Kharagpur. Under the guidance of Professor Mira Mitra, we have
              developed a comprehensive website to serve as a centralized
              platform for organizing and showcasing various projects. Our
              vision for this website is to boost engagement among professors,
              scholars, and students, enhance project visibility both internally
              and externally, and streamline project management by facilitating
              resource sharing.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="text-center col-lg-4 mb-4">
            <Link
              to="https://www.iitkgp.ac.in/department/AE/faculty/ae-mira"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                className="rounded-circle mb-3"
                src={MiraMitraimg}
                alt="Mira Mitra"
                style={{ width: "200px", height: "200px" }}
              />
              <h5 style={{ color: "#1A374D" }}>Professor Mira Mitra</h5>
            </Link>
            <p style={{ color: "#1A374D" }}>
              Department of Aerospace Engineering
            </p>
            <p style={{ color: "#1A374D" }}>IIT Kharagpur</p>
          </div>
          <div className="text-center col-lg-4 mb-4">
            <Link
              to="https://www.linkedin.com/in/sunidhi-tiwari-3a3072201/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                className="rounded-circle mb-3"
                src={Sunidhiimg}
                alt="Sunidhi Tiwari"
                style={{ width: "200px", height: "200px" }}
              />
              <h5 style={{ color: "#1A374D" }}>Sunidhi Tiwari</h5>
            </Link>
            <p style={{ color: "#1A374D" }}>
              Dual Degree Student, Aerospace Department
            </p>
            <p style={{ color: "#1A374D" }}>IIT Kharagpur</p>
          </div>
          <div className="text-center col-lg-4 mb-4">
            <Link
              to="https://www.linkedin.com/in/mudit-bhugari-35b1101a6/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                className="rounded-circle mb-3"
                src={Muditimg}
                alt="Mudit Kumar Bhugari"
                style={{ width: "200px", height: "200px" }}
              />
              <h5 style={{ color: "#1A374D" }}>Mudit Kumar Bhugari</h5>
            </Link>
            <p style={{ color: "#1A374D" }}>
              Dual Degree Student, Aerospace Department
            </p>
            <p style={{ color: "#1A374D" }}>IIT Kharagpur</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
