import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProjectCard from "../ProjectCard";

const config = require("../../config_frontend.js");

const host = config.server.host;

const CurrentProjects = (props) => {
  const [currentProjects, setCurrentProjects] = useState([]);
  let [flag, setFlag] = useState(true);
  const getProjects = async () => {
    const url = `${host}/api/users/approvedProjects`;
    const result = await axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setCurrentProjects(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
      console.log("On Pending Requests Page");
      getProjects();
    }
  }, []);

  const deleteProject = async (id) => {
    const response = await fetch(
      `${host}/api/projects/deleteproject/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    const newProjects = currentProjects.filter((project) => { return project._id !== id })
    setCurrentProjects(newProjects)
    props.showAlert("Project deleted successfully", "success");
  };

  // const context = useContext(projectContext);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [project, setProject] = useState({id: "", title: "", desc: ""})

  const updateProject = (currentProject) => {
      ref.current.click();
      setProject({id: currentProject._id, title: currentProject.title, desc: currentProject.desc})
  }

  const handleClick = async (e)=>{ 
    const url = `${host}/api/projects/updateproject/${project.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title: project.title, desc: project.desc})
    });
    const json = await response.json(); 
    console.log(json);
      refClose.current.click();
      props.showAlert("Project updated successfully",'success');

    let newProjects = JSON.parse(JSON.stringify(currentProjects))
    // Logic to edit in client
    for (let index = 0; index < newProjects.length; index++) {
      const element = newProjects[index];
      if (element._id === project.id) {
        newProjects[index].title = project.title;
        newProjects[index].desc = project.desc;
        break; 
      }
    }  
    setCurrentProjects(newProjects);

  }

  const onChange = (e)=>{
      setProject({...project, [e.target.name]: e.target.value})
  }

  if(currentProjects.length === 0) {
    return <div className="container">Sorry!! You don't have any approved projects</div>;
  }
  else{
  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit Project Details</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <form className="my-3">
                          <div className="mb-3">
                              <label htmlFor="title" className="form-label">Title</label>
                              <input type="text" className="form-control" id="title" name="title" value={project.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="desc" className="form-label">Description</label>
                              <textarea rows = "5" type="text" className="form-control" id="desc" name="desc" value={project.desc} onChange={onChange} minLength={5} required/>
                          </div>
                          {/* <div className="mb-3">
                              <label htmlFor="tag" className="form-label">Tag</label>
                              <input type="text" className="form-control" id="etag" name="etag" value={project.etag} onChange={onChange} />
                          </div> */}

                      </form>
                  </div>
                  <div className="modal-footer">
                      <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button onClick={handleClick} type="button" className="btn btn-primary">Update Project</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="container row">
        {currentProjects &&
          currentProjects.map((project, idx) => {
            return (
              <ProjectCard
                project = {project}
                updateProject={updateProject}
                deleteProject={deleteProject}
                flag = {true}
                page = "current"
                md = {6}
                key={idx}
              />
            );
          })}
      </div>
    </div>
  );
  } 
};

export default CurrentProjects;
