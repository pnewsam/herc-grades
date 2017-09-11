import React from "react";
import { AssignmentListItem } from "./AssignmentListItem";

export const AssignmentList = (props) => {
  return(
    <div className="content">
    {props.assignments.map(a=>(
      <AssignmentListItem
        key={a.id}
        name={a.name}
        description={a.description}
        dueAt={a.due_at}
        createdAt={a.created_at}
      />
    ))}
    </div>
  )
};
