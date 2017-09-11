import React, { Component } from "react";
import ApiUtil from "../utils/apiUtil";
import {students} from "../utils/sampleData";
import StudentList from "../components/StudentList/StudentList";

class StudentsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      courseId: props.courseId,
      students: students
    };
  }

  componentDidMount(){
    // fetchStudents();
  }

  fetchStudents() {
    const url = ApiUtil().buildRequestUri({
      resource: "courses",
      resourceId: this.state.id,
      nestedResource: "users",
      queries: ["enrollment_type[student]=student"]
    })
    fetch(url)
    .then(r => r.json())
    .then(r => {
      console.log(r)
      // this.setState({
      //   students: r.stud
      // });
    });
  }

  render(){
    return(
      <div>
        <h3 className="title is-3">Students</h3>
        <StudentList students={students}/>
      </div>
    )
  }
}



export default StudentsContainer;