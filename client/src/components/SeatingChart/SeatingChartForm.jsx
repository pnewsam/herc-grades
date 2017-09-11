import React, { Component } from "react";
import SeatingChart from "./SeatingChart";
import CardColumn from "../bulma/CardColumn";
import database from "../../scripts/firebase";
import ConfigurationPhase from "./ConfigurationPhase";
import SeatingPhase from "./SeatingPhase";

class SeatingChartForm extends Component {
  constructor(props){
    super(props);
    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    this.handleConfigurationSubmit = this.handleConfigurationSubmit.bind(this);
    this.handleSeatingSubmit = this.handleSeatingSubmit.bind(this);
    this.handleSeatingChange = this.handleSeatingChange.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.calculateSeatWidth = this.calculateSeatWidth.bind(this);
    this.state = {
      seats: {},
      students: props.students,
      numRows: 0,
      numCols: 0,
      width: 0,
      seatWidth: 0,
      phase: 1
    };
  }

  calculateSeatWidth(containerWidth){
    return ((containerWidth) / this.state.numCols) - 20;
  }

  componentDidMount(){
    let cW = this.container.offsetWidth;
    this.setState({
      width: cW
    })
    window.addEventListener('resize', e => {
      this.setState({
        width: cW
      });
    });
  }

  handleReturn(e){
    let prevPhase = this.state.phase - 1;
    this.setState({
      phase: prevPhase
    });
  }

  handleConfigurationChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  handleConfigurationSubmit(e){
    e.preventDefault();
    let s = {}
    for (let i = 0; i < this.state.numRows; i++) {
      s[i] = {}
      for (let j = 0; j < this.state.numCols; j++) {
        s[i][j] = 0;
      }
    }
    let w = this.calculateSeatWidth(this.state.width);
    this.setState({
      seats: s,
      seatWidth: w,
      phase: 2
    });
  }

  handleSeatingSubmit(e){
    e.preventDefault();
    let ref = database.ref("seatingCharts/" + this.props.courseId + "/seatAssignments");
    let o = this.state.seats;
    ref.set(o);
    this.props.inactivateForm;
  }

  handleSeatingChange(e){
    let seats = this.state.seats;
    let coords = e.target.value;
    seats[coords[0]][coords[1]] = e.target.id;
    this.setState({
      seats: seats
    });
  }
  
  render(){
    console.log('seatingChartForm render!')
    switch (this.state.phase) {
      case 1:
        return(
          <div className="columns">
            <CardColumn is={8}>
              <div ref={container => { this.container = container }}>
                <SeatingChart seats={this.state.seats} seatWidth={this.state.seatWidth}/>
              </div>
            </CardColumn>
            <CardColumn is={4}>
            <ConfigurationPhase
              handleSubmit={this.handleConfigurationSubmit}
              handleChange={this.handleConfigurationChange}
              numRows={this.state.numRows}
              numCols={this.state.numCols}
              numStudents={Object.keys(this.state.students).length}
            />
            </CardColumn>
          </div>
        )
      case 2:
        return(
          <div className="columns">
            <CardColumn is={8}>
              <div ref={container => { this.container = container }}>
                <SeatingChart
                  seats={this.state.seats}
                  seatWidth={this.state.seatWidth}
                  students={this.state.students}
                />
              </div>
            </CardColumn>
            <CardColumn is={4}>
              <SeatingPhase
                handleReturn={this.handleReturn}
                handleChange={this.handleSeatingChange}
                handleSubmit={this.handleSeatingSubmit}
                students={this.state.students}
                seats={this.state.seats}
              />
            </CardColumn>
          </div>
        )
    }
  }
}

export default SeatingChartForm;