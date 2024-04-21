import React from "react";
import SingleBanner from "../../components/Banner/SingleBanner";
import { useParams } from "react-router-dom";
import UserSidebar from "../../components/UserProfile/UserSidebar";
import AccountSettings from "../../components/UserProfile/AccountSettings";
import "./UserProfile.css";
import ChangePassword from "../../components/UserProfile/ChangePassword";
import img from "../../images/websitepic.jpg";
import CurrentProjects from "../../components/UserProfile/CurrentProjects";
import PendingRequests from "../../components/UserProfile/PendingRequests";

const UserProfile = (props) => {
  const { activepage } = useParams();
  return (
    <div className="userprofile">
      <SingleBanner bannerimage={img} heading="My Profile" />
      <div className="userprofilein">
        <div className="left_profile">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right_profile">
          {activepage === "accountsettings" && <AccountSettings showAlert = {props.showAlert}/>}
          {activepage === "changepassword" && <ChangePassword showAlert = {props.showAlert}/>}
          {activepage === "currentprojects" && <CurrentProjects showAlert = {props.showAlert}/>}
          {activepage === "pendingrequests" && <PendingRequests showAlert = {props.showAlert}/>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
