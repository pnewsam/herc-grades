import React, { Component } from "react";

class Seat extends Component {
  constructor(props){
    super(props);
    this.seatStyles = this.seatStyles.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      student: props.studentName,
      selected: false,
      mouseOver: false,
      value: ""
    }
  }

  seatStyles(){
    let styles = {
      display: "table",
      textAlign: "center",
      border: "solid 2px grey",
      margin: "0 5px",
      height: `${this.props.width}px`,
      width: `${this.props.width}px`
    }
    if (this.state.student) {
      styles = Object.assign(styles, { backgroundColor: "#3273DC", color: "white" });
    }
    if (this.state.mouseOver) {
      styles = Object.assign(styles, { border: "solid 3px pink" });
    }
    if (this.state.selected) {
      styles = Object.assign(styles, { border: "solid 4px red" });
    }
    return (styles);
  }
    
  handleSelect(e){
    let selected = this.state.selected;
    if (selected) {
      selected = false;
    } else {
      selected = true;
    }
    this.setState({
      selected: selected
    });
  }

  handleMouseOver(e){
    this.setState({
      mouseOver: true
    });
  }

  handleMouseOut(e){
    this.setState({
      mouseOver: false
    });
  }

  render(){
    console.log(this.state)
    return(
      <div
        id={this.props.coords}
        style={this.seatStyles()}
        data-target-value={this.state.value}
        onClick={this.handleSelect}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <span style={{ display: "table-cell", verticalAlign: "middle"}}>
          {this.state.student}
        </span>
      </div>
    )
  }
}

export default Seat;