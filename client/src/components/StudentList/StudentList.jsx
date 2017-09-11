import React from "react";
import StudentListItem from "./StudentListItem";

const StudentList = (props) => {
  return(
    <ul>
      {Object.entries(props.students).map(s=>
        <StudentListItem key={s[0]} name={s[1].name}/>
      )}
    </ul>
  )
}

export default StudentList;