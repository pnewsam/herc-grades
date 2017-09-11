import React, { Component } from "react";
import database from "../scripts/firebase";
import SeatingChart from "../components/SeatingChart/SeatingChart";
import SeatingChartForm from "../components/SeatingChart/SeatingChartForm";

class SeatingChartContainer extends Component {
  constructor(props){
    super(props);
    this.seatStudents = this.seatStudents.bind(this);
    this.calculateSeatWidth = this.calculateSeatWidth.bind(this);
    this.state = {
      courseId: props.courseId,
      students: props.students,
      formActive: true,
      seatAssignments: {},
      seats: {},
      containerWidth: 0
    };
  }

  componentDidMount(){
    let ref = database.ref("seatingCharts/" + this.state.courseId + "/seatAssignments");
    ref.once("value").then(snap => {
      if (snap.val() !== null) {
        this.setState({ seatAssignments: snap.val() });
      } else {
        // this.setState({ formActive: true });
      }
    });
    this.seatStudents();
    this.setState({
      containerWidth: this.container.offsetWidth
    })
    window.addEventListener('resize', e => {
      this.setState({
        containerWidth: this.container.offsetWidth
      });
    });
  }

  seatStudents(){
    let sA = this.state.seatAssignments;
    let seats = {};
    for (let prop in sA) {
      let s = this.state.students.filter(student => student.id === sA[prop]);
      seats[prop] = s;
    }
    this.setState({
      seats: seats
    });
  }

  inactivateForm(){
    this.setState({
      formActive: false
    });
  }

  calculateSeatWidth(containerWidth){
    return ((containerWidth) / this.state.numCols) - 20;
  }

  render(){
    if (this.state.formActive) {
      console.log('form!')
      return(
        <div ref={container => { this.container = container }}>
          <SeatingChartForm
            students={this.state.students}
            courseId={this.state.courseId}
            inactivateForm={this.inactivateForm}
          />
        </div>
      )
    } else {
      console.log('noform!')
      return(
        <div ref={container => { this.container = container }}>
          <SeatingChart
            seats={this.state.seats}
            seatWidth={this.calculateSeatWidth(this.state.containerWidth)}
            students={this.state.students}
          />
        </div>
      )
    }
  }
}

export default SeatingChartContainer;