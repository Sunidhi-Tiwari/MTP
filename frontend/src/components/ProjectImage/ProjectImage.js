import React from "react";
import "./ProjectImage.css";

const ProjectImage = ({ projectimage }) => {
  return (
    <div className="projectimage">
      <div className="projectimgfilter"></div>
      <img className="projectimg" src={projectimage} alt="noimg" />
    </div>
  );
};

export default ProjectImage;
