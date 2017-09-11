import React, { Component } from "react";
import ApiUtil from "../utils/apiUtil";
import SeatingChartContainer from "./SeatingChartContainer";
import { students } from "../utils/sampleData";

class CourseContainer extends Component {
  constructor(props){
    super(props);
    this.fetchCourse = this.fetchCourse.bind(this);
    this.state = {
      id: props.match.params.course_id,
      name: "",
      students: this.convertToObj(students)
    }
  }

  componentDidMount(){
    // this.fetchCourse();
  }

  convertToObj(students){
    let obj = {}
    for(let i = 0; i < students.length; i++){
      let s = students[i];
      obj[s.id] = s;
    }
    return(obj);
  }

  fetchCourse() {
    const url = ApiUtil().buildRequestUri({
      resource: "courses",
      resourceId: this.state.id
    });
    console.log(url)
    fetch(url)
    .then(r => r.json())
    .then(r => {
      console.log(r)
      this.setState({
        name: r.name,
      });
    });
  }

  render(){
    return(
      <div>
        <h1 className="title is-1">{this.state.name || "Course"}</h1>
        <SeatingChartContainer courseId={this.state.id} students={this.state.students}/>
      </div>
    )
  }
}

export default CourseContainer;