// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AddProject from "./pages/AddProject";
import UserProfile from "./pages/User/UserProfile";
import AllProjects from "./pages/AllProjects";
import Footer from "./components/HomePages/Footer";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import Alert from "./components/Alert";
import "./index.css";

function App() {
  // const [alert, setAlert] = useState(null);
  // const showAlert=(message, type)=>{
  //   setAlert({
  //     msg:message,
  //     type:type
  //   })
  //   setTimeout(()=>{
  //     setAlert(null);
  //   },1500)
  // }
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <Alert alert={alert} />
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
