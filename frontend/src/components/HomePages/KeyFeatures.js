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
      desc: "Efficiently locate projects based on specific keywords or filters like domain and professor, facilitating quick and precise exploration.",
    },
    {
      title: "User Profiles",
      desc: "Create personalized profiles for students and professors showcasing their projects and contact information.",
    },
    {
      title: "Project Management",
      desc: "Simplifies the management of project submissions, approvals, and updates, ensuring a smooth workflow from start to finish.",
    },
    // {
    //   title: "Email Notifications",
    //   desc: "Receive notifications for project approvals, rejections, and updates via email.",
    // },
    {
      title: "Secure Authentication",
      desc: "Guarantees data security by implementing authorization measures, safeguarding sensitive information effectively.",
    },
    {
      title: "Responsive Design",
      desc: "Seamless accessibility and usability on desktops, laptops, tablets, and smartphones with optimal user experience.",
    },

    // {
    //   title: "Project Visibility",
    //   desc: "Enhance project visibility both internally and externally to attract potential collaborators and sponsors.",
    // },
  ];

  return (
    <div
      className="container"
      style={{ background: "#6998AB", color: "#1A374D" }}
    >
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
