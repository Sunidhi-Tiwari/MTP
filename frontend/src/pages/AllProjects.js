import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const AllProjectsPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState("");

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
    // Implement search functionality here
  };

  const filteredProjects = allProjects.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDomain === "" || project.domain === selectedDomain) &&
      (selectedProfessor === "" || project.prof === selectedProfessor)
    );
  });

  return (
    <div className="container">
      <h3 className="text-center key">All Projects</h3>
      <div className="row mb-3 align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by project title"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearchSubmit}
            >
              <i className="bi bi-search"></i>
            </button>
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
            >
              Domain
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
            >
              Professor
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
                  onClick={() => handleProfessorChange("Professor 1")}
                >
                  Professor 1
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleProfessorChange("Professor 2")}
                >
                  Professor 2
                </button>
              </li>
              {/* Add more options as needed */}
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={idx}
            id={project._id}
            title={project.title}
            domain={project.domain}
            prof={project.prof}
            desc={project.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProjectsPage;
