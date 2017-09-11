import React from "react";

const CenteredCard = (props) => {
  return (
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <div className="card">
          <div className="card-content">
            {props.children}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default CenteredCard;