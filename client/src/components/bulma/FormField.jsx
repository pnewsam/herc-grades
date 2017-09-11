import React from "react";

const FormField = (props) => {
  if (props.label) {
    return (
      <div className="field">
        <label className="label" htmlFor={props.label}>{props.label}</label>
        <div className="control">
          {props.children}
        </div>
      </div>
    );
  } else {
    return(
      <div className="field">
        <div className="control">
          {props.children}
        </div>
      </div>  
    )
  }
};

export default FormField;