// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AddProject from "./pages/AddProject";
import UserProfile from "./pages/User/UserProfile";
import AllProjects from "./pages/AllProjects";
import Footer from "./components/HomePages/Footer";
import "./index.css";

import ProjectDetails from "./components/ProjectDetails/ProjectDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/allProjects" element={<AllProjects />} />
            <Route exact path="/addProject" element={<AddProject />} />

            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/projectdetails/:id"
              element={<ProjectDetails />}
            />
            <Route path="/user/:activepage" element={<UserProfile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
