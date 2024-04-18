import React from "react";

const FeaturesCard = (props) => {
  return (
    <div className="col-md-4">
      <div className="card my-4 mx-4" style={{ background: "#B1D0E0" }}>
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              textAlign: "center",
              color: "#406882",
              fontWeight: "bold",
            }}
          >
            {props.title}
          </h5>
          <p
            className="card-text"
            style={{ textAlign: "center", color: "#1A374D" }}
          >
            {props.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;
