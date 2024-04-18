import React from "react";

const FeaturesCard = (props) => {
  return (
      <div className="col-md-4">
        <div className="card my-4 mx-4">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
          </div>
        </div>
      </div>
  );
};

export default FeaturesCard;
