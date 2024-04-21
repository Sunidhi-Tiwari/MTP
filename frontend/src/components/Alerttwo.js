import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alert = (props) => {
  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {props.alert && (
        <div
          className={`alert visible ${props.alert.type}`}
          style={{ height: "50px" }}
        >
          {props.alert.type}: {props.alert.msg}
        </div>
      )}
      ;
    </>
  );
};

export default Alert;
