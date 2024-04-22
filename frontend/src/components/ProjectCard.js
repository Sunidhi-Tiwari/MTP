import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/aerospace.jpg";
import ProjectImage from "./ProjectImage/ProjectImage";
const config = require("../config_frontend.js");

const host = config.server.host;

const ProjectCard = (props) => {
  const navigate = useNavigate();
  const { project, updateProject, deleteProject, page, md } = props;
  const [type, setType] = useState("");
  // let [flag, setFlag] = useState(true);
  const getType = async () => {
    const url = `${host}/api/auth/getuser`;
    const result = await axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setType(result.data.type);
    console.log(result.data);
    console.log(result.data.name);
    console.log(result.data.type);
  };

  const handleApprove = async () => {
    const url = `${host}/api/projects/approveProject/${project._id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        // 'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Project approved");
  };

  useEffect(() => {
    if (page !== "all") getType();
  }, []);

  const trimDesc = (desc) => {
    if (desc.length > 50) desc = desc.slice(0, 50) + "....";
    return desc;
  };
  console.log(project._id);
  console.log(project.image);
  return (
    <div className={`col-md-${md}`}>
      <div className="card my-3 mx-2" style={{ borderColor: "#1A374D" }}>
        {!project.image || !`${host}/files/${project.image}` ? (
          <ProjectImage
            projectimage={img}
            className="card-img-top"
            alt="project"
          />
        ) : (
          <ProjectImage
            projectimage={`${host}/files/${project.image}`}
            className="card-img-top"
            alt="project"
          />
        )}

        <div className="card-body">
          <div className="d-flex bd-highlight">
            <h5 className="p flex-grow-1 bd-highlight card-title">
              {project.title}
            </h5>
            {page !== "all" ? (
              <i
                className="p-2 bd-highlight far fa-trash-alt"
                onClick={() => {
                  deleteProject(project._id);
                }}
              ></i>
            ) : (
              <></>
            )}

            {page !== "all" && type === "student" ? (
              <i
                className="p-2 bd-highlight far fa-edit"
                onClick={() => {
                  updateProject(project);
                }}
              ></i>
            ) : (
              <></>
            )}
          </div>
          <p className="card-text">{trimDesc(project.desc)}</p>

          <br></br>
          <br></br>
          <div className="d-flex">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/projectdetails/${project._id}`)}
            >
              Read More
            </button>
            {type === "prof" && page === "pending" ? (
              <button className="btn btn-success" onClick={handleApprove}>
                Approve
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
