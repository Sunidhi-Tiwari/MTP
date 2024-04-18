import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/aerospace.jpg";

const ProjectCard = (props) => {
  const navigate = useNavigate();
  console.log(props.id);
  return (
    <div className="col-md-4">
      <div className="card my-3 mx-2">
        <img src={img} className="card-img-top" alt="project"></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.desc}</p>
          <p className="card-text">{props.domain}</p>
          <div className="d-flex">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/projectdetails/${props.id}`)}
            >
              Read More
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleApprove(props.id)}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function handleApprove(id) {
    // Handle approval logic here
    console.log(`Project with ID ${id} approved.`);
  }
};

export default ProjectCard;
