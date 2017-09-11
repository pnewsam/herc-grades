import React from "react";

const CardColumn = (props) => {
  return (
    <div className={`column is-${props.is} card`}>
      <div className="card-content">
        {props.children}
      </div> 
    </div>
  );
};

export default CardColumn;