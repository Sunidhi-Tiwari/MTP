import React from "react";
import "./Features.css";

const KeyFeatures = () => {
  return (
    <div style={{ background: "rgb(22, 17, 17)", color: "white" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="text-center key">Key Features</h1>
      <br></br>
      <br></br>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Project Search</h5>
                
                <p className="card-text">
                Quickly find projects of interest using keywords or filters.

                </p>
              </div>
            </div>
          </div>
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">User Profiles</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                Create personalized profiles for students and professors, showcasing their projects and contact information.

                </p>
              </div>
            </div>
          </div>
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Project Management</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                Seamlessly manage project submissions, approvals, and updates.

                </p>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* <div className="row align-items-center mx-5"> */}
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Email Notifications</h5>
                
                <p className="card-text">
                Receive notifications for project approvals, rejections, and updates via email.

                </p>
              </div>
            </div>
          </div>
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Secure Authentication</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                Ensure data security with secure user authentication and authorization.

                </p>
              </div>
            </div>
          </div>
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Responsive Design</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                Access the platform from any device with a responsive and mobile-friendly design.

                </p>
              </div>
            </div>
          </div>
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Project Collaboration</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                Foster collaboration among students and professors by facilitating communication and resource sharing.
                </p>
              </div>
            </div>
          </div>
          <div className="col my-4">
            <div className="card" style={{ width: "22rem" }}>
              <div className="card-body">
                <h5 className="card-title">Project Visibility</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                Enhance project visibility both internally and externally to attract potential collaborators and sponsors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default KeyFeatures;
