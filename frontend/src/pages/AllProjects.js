import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
const port = 5001;

const AllProjectsPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [profNames, setProfNames] = useState([]);
  const domainNames = [
    "Structures","Aerodynamics","Propulsion", "Controls", "Other"
  ];

  const getProfNames = async () => {
    const url = `http://localhost:${port}/api/prof/getprofs`;
    const result = await axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setProfNames(result.data);
    console.log(result.data);
    // console.log(result.data.name);
  };

  useEffect(() => {
    getProfNames();
  },[]);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const url = "http://localhost:5001/api/projects/get-all-projects";
    const result = await axios.get(url);
    setAllProjects(result.data.data);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDomainChange = (domain) => {
    setSelectedDomain(domain);
  };

  const handleProfessorChange = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleSearchSubmit = () => {
    // Filter projects based on search term
    const filteredProjects = allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.prof.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update the state with the filtered projects
    setAllProjects(filteredProjects);
  };

  // Display a message when no projects are found
  const noProjectsMessage = (
    <div className="text-center mt-3">
      <p>
        Sorry, we don't have anything matching your search. Please try searching
        for something else.
      </p>
    </div>
  );

  const filteredProjects = allProjects.filter((project) => {
    return (
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.prof.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDomain === "" || project.domain === selectedDomain) &&
      (selectedProfessor === "" || project.prof === selectedProfessor)
    );
  });

  return (
    <div className="container">
      <br />
      <h2
        className="card-title text-center mb-4"
        style={{ color: "#406882", fontWeight: "2400" }}
      >
        All Projects
      </h2>
      <div className="row mb-3 justify-content-between align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for project"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ borderColor: "#1A374D" }}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={handleSearchSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    stroke: "#6c757d",
                    borderColor: "#1A374D",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="domainDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ background: "white", color: "#406882" }}
            >
              {selectedDomain ? selectedDomain : "Domain"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="domainDropdown">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleDomainChange("")}
                >
                  All Domains
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleDomainChange("Domain 1")}
                >
                  Domain 1
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleDomainChange("Domain 2")}
                >
                  Domain 2
                </button>
              </li>
              {/* Add more options as needed */}
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="professorDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ background: "white", color: "#406882" }}
            >
              {selectedProfessor ? selectedProfessor : "Professor"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="professorDropdown">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleProfessorChange("")}
                >
                  All Professors
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleProfessorChange("Manoranjan Sinha")}
                >
                  Manoranjan Sinha
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleProfessorChange(" Mira Mitra")}
                >
                  Mira Mitra
                </button>
              </li>
              {/* Add more options as needed */}
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredProjects.length === 0
          ? noProjectsMessage
          : filteredProjects.map((project, idx) => (
              <ProjectCard project={project} flag={false} md={4} key={idx} />
            ))}
      </div>
    </div>
  );
};

export default AllProjectsPage;
