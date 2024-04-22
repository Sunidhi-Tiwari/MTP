// ProjectDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";
import ProjectImage from "../ProjectImage/ProjectImage";
import img from "../../images/aerospace.jpg";
// const port = 5001;

const config = require("../../config_frontend.js");

const host = config.server.host;

const ProjectDetails = () => {
  const { id } = useParams();

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example random array of resources
  // const Resources = [
  //   { url: "https://www.google.com", urlDesc: "Google" },
  //   { url: "https://www.youtube.com", urlDesc: "YouTube" },
  //   { url: "https://www.amazon.com", urlDesc: "Amazon" },
  //   { url: "https://www.flipkart.com", urlDesc: "Flipkart" },
  // ];

  useEffect(() => {
    const url = `${host}/api/projects/getproject/${id}`;
    axios
      .get(url)
      .then((res) => {
        setProjectData(res.data.data);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry!! This page doesn't exist</p>;
  }

  if (!projectData) {
    return <p>No project data available.</p>;
  }

  const { title, desc, prof, domain, student, image, urls, date } = projectData;
  console.log(date);

  var date1 = new Date(date);
  var formattedDate = date1.toLocaleDateString();

  const handleClick = () => {
    if (image) {
      window.open(`${host}/files/${image}`, "_blank");
    } else {
      window.open(`${host}/files/aerospace.jpg`, "_blank");
    }
  };

  return (
    <div className="research-project">
      <div className="top-section" style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          {!image || !`${host}/files/${image}` ? (
            <ProjectImage
              projectimage={img}
              className="card-img-top"
              alt="project"
            />
          ) : (
            <ProjectImage
              projectimage={`${host}/files/${image}`}
              className="card-img-top"
              alt="project"
            />
          )}
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: "10px",
              fontSize: "10px",
              padding: "2px",
            }}
            onClick={handleClick}
          >
            View full image
          </button>
        </div>

        <div>
          <h2 style={{ color: "#406882", fontWeight: "bold" }}>{title}</h2>
        </div>
      </div>

      <div className="content-section">
        <div className="left-column">
          <h3 style={{ color: "#406882" }}>Description of Project</h3>
          <p style={{ color: "#1A374D", whiteSpace: "pre-wrap" }}>{desc}</p>
        </div>
        <div className="right-column">
          <div>
            <p style={{ color: "#1A374D" }}>
              <b style={{ color: "#406882" }}>Domain:</b> {domain}
            </p>
            <p style={{ color: "#1A374D" }}>
              <b style={{ color: "#406882" }}>Professor:</b> {prof}
            </p>
            <p style={{ color: "#1A374D" }}>
              <b style={{ color: "#406882" }}>Author:</b> {student}
            </p>
            <p style={{ color: "#1A374D" }}>
              <b style={{ color: "#406882" }}>Added on:</b> {formattedDate}
            </p>
          </div>
          {urls && urls.length > 0 && (
            <div>
              <h3 style={{ color: "#406882" }}>Resources:</h3>
              {urls.map((resource, index) => (
                <div key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#1A374D" }}
                  >
                    {resource.urlDesc}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
