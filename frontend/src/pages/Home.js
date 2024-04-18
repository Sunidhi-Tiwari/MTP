import React from "react";
import KeyFeatures from "../components/HomePages/KeyFeatures";
// import Navbar from './Navbar';
import FirstPage from "../components/HomePages/FirstPage";
import FAQs from "../components/HomePages/FAQs";
import Footer from "../components/HomePages/Footer";
import AboutUsSection from "../components/HomePages/AboutUs";

const Home = () => {
  return (
    <div style={{ background: "#6998AB" }}>
      <FirstPage />
      <KeyFeatures />
      <FAQs />
      <AboutUsSection />
    </div>
  );
};

export default Home;
