import React from "react";

const FormSelect = (props) => {
  return(
    <div className="control">
      <div className="select">
        <select id={props.id} onChange={props.handleChange}>
          {props.children}
        </select>
      </div>
    </div>
  )
}

export default FormSelect;
