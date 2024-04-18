import React from "react";
import FeaturesCard from "./FeaturesCard";

const KeyFeatures = () => {
  let features = [
    {
      title: "Project Collaboration",
      desc: "Foster collaboration among students and professors by facilitating communication and resource sharing.",
    },
    {
      title: "Project Search",
      desc: "Quickly find projects of interest using keywords or filters.",
    },
    {
      title: "User Profiles",
      desc: "Create personalized profiles for students and professors showcasing their projects and contact information.",
    },
    {
      title: "Project Management",
      desc: "Seamlessly manage project submissions, approvals, and updates.",
    },
    // {
    //   title: "Email Notifications",
    //   desc: "Receive notifications for project approvals, rejections, and updates via email.",
    // },
    {
      title: "Secure Authentication",
      desc: "Ensure data security with secure user authentication and authorization.",
    },
    {
      title: "Responsive Design",
      desc: "Access the platform from any device with a responsive and mobile-friendly design.",
    },
    
    // {
    //   title: "Project Visibility",
    //   desc: "Enhance project visibility both internally and externally to attract potential collaborators and sponsors.",
    // },
  ];

  return (
    <div className = "container" style={{ background: "rgb(22, 17, 17)", color: "white" }}>
      <br></br>
      <br></br>
      <h1 className="text-center key">Key Features</h1>
      <br></br>
      <br></br>
      <div>
        <div className="row">
          {features &&
            features.map((feat, idx) => {
              return (
                <FeaturesCard title={feat.title} desc={feat.desc} key={idx} />
              );
            })}
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default KeyFeatures;
