import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    if (word === "danger") word = "error";
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  };
  return (
    <>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dimmisible fade show sticky-top`}
          role="alert"
          style={{ marginBottom: "0px", top: "50px" }}
        >
          <strong>{capitalize(props.alert.type)}</strong> :{" "}
          {capitalize(props.alert.msg)}
        </div>
      )}
    </>
  );
};

export default Alert;
