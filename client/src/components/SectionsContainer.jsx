import React, { Component } from "react";

class SectionsContainer extends Component {
  componentDidMount(){
    fetch("/api/sections", {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }})
    .then(response => response.json())
    .then(json => console.log(json))
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