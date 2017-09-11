import React from "react";
import FormField from "../bulma/FormField";

const Configuration = (props) => {
    return(
      <div>
        <h3 className="title is-3">First, select the number of rows and columns.</h3>
        <h5 className="subtitle is-5">Remember, you have {props.numStudents} students.</h5>
        <form action="" onSubmit={props.handleSubmit}>
          <FormField label="Number of Rows">
            <input
              id="numRows"
              className="input"
              type="number"
              value={props.numRows}
              onChange={props.handleChange}
            />
          </FormField>
          <FormField label="Number of Columns">
            <input
              id="numCols"
              className="input"
              type="number"
              value={props.numCols}
              onChange={props.handleChange}
            />
          </FormField>
          <FormField>
            <button
              className="button is-primary"
              type="submit"
            >
              Submit
            </button>
          </FormField>
        </form>
      </div>
    )
}

export default Configuration;