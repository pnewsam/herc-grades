import React from "react";
import { formatName } from "../../utils/nameUtil";

const StudentListItem = (props) => {
  return(
    <li>{formatName(props.name)}</li>
  )
}

export default StudentListItem;