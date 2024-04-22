import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const config = require("../config_frontend.js");

const host = config.server.host;

const AddProject = (props) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const [image, setImage] = useState("");
  const [profNames, setProfNames] = useState([]);

  const domainNames = [
    "Structures",
    "Aerodynamics",
    "Propulsion",
    "Controls",
    "Other",
  ];

  const [project, setProject] = useState({
    title: "",
    desc: "",
    prof: "",
    domain: "",
    imageUrl: "",
    urls: [{ url: "", urlDesc: "" }],
  });

  const getProfNames = async () => {
    const url = `${host}/api/prof/getprofs`;
    const result = await axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setProfNames(result.data);
    // setProfNames(prevProfNames => [...prevProfNames, ...result.data]);
    console.log(result.data);
    // console.log(result.data.name);
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
      getProfNames();
    }
  }, []);

  // const profs = [
  //   { label: "Professor 1", value: 1 },
  //   { label: "Professor 2", value: 2 },
  //   { label: "Professor 3", value: 3 },
  // ];

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUrls = [...project.urls];
    updatedUrls[index][name] = value;
    setProject({ ...project, urls: updatedUrls });
  };

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    console.log(e.target.files[0]);
    if (selectedFile) {
      // setSelectedFileName(selectedFile.name); // Set selected file name
      console.log(selectedFile);
      setImage(selectedFile);
    }
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
    if (project.title.trim() === "" || project.desc.trim() === "" || project.prof === "" || project.domain === ""){
        props.showAlert("Please add all the required fields", "danger");
    } 
    else {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("title", project.title);
        formData.append("desc", project.desc);
        formData.append("prof", project.prof);
        formData.append("domain", project.domain);
        formData.append("urls", JSON.stringify(project.urls));
        console.log(image);
        console.log(formData);

        // API Call
        const result = await axios
          .post(`${host}/api/projects/addproject`, formData, {
            headers: {
              // "Content-Type": "application/json",
              "Content-type": "multipart/form-data",
              "auth-token": localStorage.getItem("token"),
            },
          })
          .then((res) => {
            props.showAlert("Uploaded Successfully", "success");
          })
          .catch((er) => console.log("error", er));

        // alert("Uploaded Successfully")

        // const resp = await response.json();
        // console.log(resp);

        setProject({
          title: "",
          desc: "",
          prof: "",
          domain: "",
          imageUrl: "",
          urls: [{ url: "", urlDesc: "" }],
        });
        setImage("");
      
    }
  }

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
                    Project Title *
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
                    Description *
                  </label>
                  <textarea
                    rows="15"
                    className="form-control"
                    placeholder="Describe your project in detail "
                    name="desc"
                    value={project.desc}
                    onChange={(e) =>
                      setProject({ ...project, desc: e.target.value })
                    }
                    minLength={5}
                    required
                    // Add the following CSS to preserve line breaks
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
                <br />
                {/* -md-center */}
                <div className="d-grid gap-2 d-md-flex justify-content-evenly">
                  <div className="mb-3">
                    <label
                      htmlFor="domain"
                      className="form-label"
                      style={{ fontWeight: "600" }}
                    >
                      Choose a domain *
                    </label>
                    <select
                      className="form-select"
                      value={project.domain}
                      onChange={(e) =>
                        setProject({ ...project, domain: e.target.value })
                      }
                    >
                      <option value="">No domain chosen</option>
                      {domainNames.map((domain, idx) => (
                        <option key={idx} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <br /> */}
                  <div className="mb-3">
                    <label
                      htmlFor="professor"
                      className="form-label"
                      style={{ fontWeight: "600" }}
                    >
                      Choose a professor *
                    </label>
                    <select
                      className="form-select"
                      value={project.prof}
                      onChange={(e) =>
                        setProject({ ...project, prof: e.target.value })
                      }
                    >
                      <option value="">No professor chosen</option>
                      {profNames.map((prof, idx) => (
                        <option key={idx} value={prof}>
                          {prof}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <br /> */}
                  <div className="mb-3">
                    <label
                      htmlFor="image"
                      className="form-label"
                      style={{ fontWeight: "600" }}
                    >
                      Choose a cover photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      // accept="image/*"
                      // value = {project.imageUrl}
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImage}
                    />
                  </div>
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
