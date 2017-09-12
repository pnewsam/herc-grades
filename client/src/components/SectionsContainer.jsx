import React, { Component } from "react";
import axios from "axios";

class SectionsContainer extends Component {
  componentDidMount(){
    axios.get("/api/sections")
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
  }
  render(){
    return(
      <div>
        <h1>SectionsContainer</h1>
      </div>
    )
  }
}

export default SectionsContainer;