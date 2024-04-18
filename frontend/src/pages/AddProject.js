import React, { useState } from "react";

const AddProject = () => {
  const host = "http://localhost:5001";
  const [profval, setProfval] = useState("");
  const [domainval, setDomainval] = useState("");
  const [project, setProject] = useState({
    title: "",
    desc: "",
    imageUrl: "",
    urls: [{ url: "", urlDesc: "" }],
  });

  const profs = [
    { label: "Professor 1", value: 1 },
    { label: "Professor 2", value: 2 },
    { label: "Professor 3", value: 3 },
  ];

  const domains = [
    { label: "Domain 1", value: 1 },
    { label: "Domain 2", value: 2 },
    { label: "Domain 3", value: 3 },
  ];

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUrls = [...project.urls];
    updatedUrls[index][name] = value;
    setProject({ ...project, urls: updatedUrls });
  };

  const addUrlInput = () => {
    setProject({
      ...project,
      urls: [...project.urls, { url: "", urlDesc: "" }],
    });
  };

  const removeUrlInput = (index) => {
    const updatedUrls = [...project.urls];
    updatedUrls.splice(index, 1);
    setProject({ ...project, urls: updatedUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(`${host}/api/projects/addproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: project.title,
        desc: project.desc,
        prof: profs.find((prof) => prof.value === parseInt(profval))?.label,
        domain: domains.find((domain) => domain.value === parseInt(domainval))
          ?.label,
        imageUrl: project.imageUrl,
        urls: project.urls,
      }),
    });

    const resp = await response.json();
    console.log(resp);
    setProject({
      title: "",
      desc: "",
      imageUrl: "",
      urls: [{ url: "", urlDesc: "" }],
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div
            className="card border p-4 shadow"
            style={{ background: "#B1D0E0" }}
          >
            <h4
              className="card-title text-center mb-4"
              style={{ color: "#406882", fontWeight: "2400" }}
            >
              Add Project
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Project Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a title for your project"
                  name="title"
                  value={project.title}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                  minLength={5}
                  required
                />
              </div>
              <br />
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Description
                </label>
                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="Describe your project in detail "
                  name="desc"
                  value={project.desc}
                  onChange={(e) =>
                    setProject({ ...project, desc: e.target.value })
                  }
                  minLength={5}
                  required
                />
              </div>
              <br />
              <div className="mb-3">
                <label
                  htmlFor="domain"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Choose a Domain
                </label>
                <select
                  className="form-select"
                  value={domainval}
                  onChange={(e) => setDomainval(e.target.value)}
                >
                  <option value="">Select Domain</option>
                  {domains.map((domain) => (
                    <option key={domain.value} value={domain.value}>
                      {domain.label}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="mb-3">
                <label
                  htmlFor="professor"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Choose Professor
                </label>
                <select
                  className="form-select"
                  value={profval}
                  onChange={(e) => setProfval(e.target.value)}
                >
                  <option value="">Select Professor</option>
                  {profs.map((prof) => (
                    <option key={prof.value} value={prof.value}>
                      {prof.label}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="mb-3">
                <label
                  htmlFor="image"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Choose a cover photo for your project
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    setProject({ ...project, imageUrl: e.target.value })
                  }
                />
              </div>
              <br />

              <div className="mb-3">
                <label
                  htmlFor="url"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Relevant URLs (Like ResearchGate, ScienceDirect Link)
                </label>
                {project.urls.map((url, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    <div className="col-md-6 mb-2 mb-md-0">
                      <input
                        type="text"
                        placeholder="Enter URL"
                        className="form-control"
                        name="url"
                        value={url.url}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="Enter URL Title (Like ResearchGate, max 5 words)"
                        className="form-control"
                        name="urlDesc"
                        value={url.urlDesc}
                        onChange={(e) => onChange(e, index)}
                      />
                    </div>
                    {index === project.urls.length - 1 && (
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={addUrlInput}
                        >
                          Add More
                        </button>
                      </div>
                    )}
                    {index !== 0 && (
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeUrlInput(index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="d-grid"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
