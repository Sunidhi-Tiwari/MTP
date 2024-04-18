// ProjectDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";
import ProjectImage from "../ProjectImage/ProjectImage";
import img from "../../images/aerospace.jpg";
const port = 5001;

const ProjectDetails = () => {
  const { id } = useParams();

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example random array of resources
  const Resources = [
    { url: "https://www.google.com", urlDesc: "Google" },
    { url: "https://www.youtube.com", urlDesc: "YouTube" },
    { url: "https://www.amazon.com", urlDesc: "Amazon" },
    { url: "https://www.flipkart.com", urlDesc: "Flipkart" },
  ];

  useEffect(() => {
    const url = `http://localhost:${port}/api/projects/getproject/${id}`;
    axios
      .get(url, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
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
    return <p>Error: {error}</p>;
  }

  if (!projectData) {
    return <p>No project data available.</p>;
  }

  const { title, desc, prof, domain, studentName, image } = projectData;

  return (
    <div className="research-project">
      <div className="top-section">
        <ProjectImage projectimage={img} alt="Noimg" />
        <h2 style={{ color: "#406882", fontWeight: "bold" }}>{title}</h2>
      </div>
      <div className="content-section">
        <div className="left-column">
          <h3 style={{ color: "#406882" }}>Description of Project</h3>
          <p style={{ color: "#1A374D" }}>{desc}</p>
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
              <b style={{ color: "#406882" }}>Author:</b> {studentName}
            </p>
          </div>
          {Resources && Resources.length > 0 && (
            <div>
              <h3 style={{ color: "#406882" }}>Resources:</h3>
              {Resources.map((resource, index) => (
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
