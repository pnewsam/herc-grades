import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiUtil from "../utils/apiUtil";

class CoursesContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      courses: []
    }
  }

  componentDidMount(){
    const url = ApiUtil().buildRequestUri({
      resource: "courses"
    });
    console.log(url);
    fetch(url)
    .then(r => r.json())
    .then(r => {
      this.setState({ courses: r })
      console.log(this.state)
    });
  }

  render(){
    return(
      <div>
        <h1 className="title is-1">Courses</h1>
        <ul>
        {this.state.courses.map(c=>
          <li><Link to={"courses/" + c.id}>{c.name}</Link></li>
        )}
        </ul>
      </div>
    )
  }
}

export default CoursesContainer;