import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alert = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`alert ${isVisible ? "visible" : "hidden"} ${
        props.alert.type
      }`}
    >
      {props.alert.msg}
    </div>
  );
};

export default Alert;
