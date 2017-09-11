import React from "react";
import "./assignment.css";
import moment from "moment";

export const AssignmentListItem = (props) => {
  let description = props.description || "";

  function formatDate(date){
    return moment(date).format("dddd, MMMM Do YYYY");
  }

  return(
    <div>
      <h4 className="title is-4">{props.name}</h4>
      <table className="table is-narrow assignment__details">
        <tbody>
        <tr>
            <td><strong>Created At:</strong></td>
            <td>{formatDate(props.createdAt)}</td>
          </tr>
          <tr>
            <td><strong>Due At:</strong></td>
            <td>{formatDate(props.dueAt)}</td>
          </tr>
          <tr>
            <td><strong>Description:</strong></td>
            <td>{description.replace(/<[^>]*>/g, '')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}