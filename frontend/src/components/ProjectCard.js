import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/aerospace.jpg";
import ProjectImage from "./ProjectImage/ProjectImage";
const port = 5001;

const ProjectCard = (props) => {
  const navigate = useNavigate();
  const { project, updateProject, deleteProject, flag, md } = props;
  
  // const deleteProject = async (id) => {
  //   const response = await fetch(
  //     `http://localhost:${port}/api/projects/deleteproject/${id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     }
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   // const newNotes = notes.filter((note) => { return note._id !== id })
  //   // setNotes(newNotes)
  // };

  const trimDesc = (desc) => {
      if(desc.length > 50)
        desc = desc.slice(0,50) + "...."
      return desc;
  }
  console.log(project._id);
  return (
    <div className={`col-md-${md}`}>
      <div className="card my-3 mx-2">
        <ProjectImage
          projectimage={img}
          className="card-img-top"
          alt="project"
        />
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{project.title}</h5>
            {flag ? (
              <>
                <i
                  className="far fa-trash-alt mx-3"
                  onClick={() => {
                    deleteProject(project._id);
                  }}
                ></i>
                <i
                  className="far fa-edit"
                  onClick={() => {
                    updateProject(project);
                  }}
                ></i>
              </>
            ) : (
              <></>
            )}
          </div>
          <p className="card-text">{trimDesc(project.desc)}</p>
          <h7 className="card-text">
            <small className="text-muted">{project.prof}</small>
          </h7>
          <br></br>
          <h7 className="card-text">
            <small className="text-muted">{project.domain}</small>
          </h7>
          <br></br>
          <br></br>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/projectdetails/${project._id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
