import React, { Component } from "react";
import ApiUtil from "../utils/apiUtil";
import { assignments } from "../utils/sampleData";
import { AssignmentList } from "../components/Assignment/AssignmentList";

class AssignmentsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      courseId: props.courseId,
      assignments: assignments
    };
  }

  componentDidMount(){
    // fetchAssignments();
  }

  fetchAssignments() {
    const url = ApiUtil().buildRequestUri({
      resource: "courses",
      resourceId: this.state.id,
      nestedResource: "assignments"
    })
    fetch(url)
    .then(r => r.json())
    .then(r => {
      console.log(r)
      // this.setState({
      //   assignments: r.assignments
      // });
    });
  }

  render(){
    return(
      <div>
        <h1 className="title is-1">Assignments</h1>
        <AssignmentList assignments={this.state.assignments}/>
      </div>
    )
  }
}

export default AssignmentsContainer;