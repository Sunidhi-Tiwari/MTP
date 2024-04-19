import React from "react";
import { useNavigate } from "react-router-dom";
import "./Features.css";

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#B1D0E0", color: "#1A374D" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="text-center key">Welcome to the Research Project</h1>
      <h1 className="text-center key mb-4">Collabration Platform</h1>
      <br></br>
      <br></br>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <button
          type="button"
          class="btn"
          onClick={() => navigate("/allProjects")}
        >
          Explore Projects
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default FirstPage;
