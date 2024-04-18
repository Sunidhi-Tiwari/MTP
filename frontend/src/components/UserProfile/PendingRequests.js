import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../ProjectCard";

const port = 5001;

const PendingRequests = () => {
  const [projectIds, setProjectIds] = useState([]);
  let [flag, setFlag] = useState(true);
  const getProjects = async () => {
    const url = `http://localhost:${port}/api/users/pendingProjects`;
    const result = await axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setProjectIds(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
      console.log("On Pending Requests Page");
      getProjects();
    }
  }, []);

  return (
    <div>
      <div className="container row">
        {projectIds &&
          projectIds.map((project, idx) => {
            return (
              <ProjectCard
                id={project._id}
                title={project.title}
                desc={project.desc}
                key={idx}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PendingRequests;
