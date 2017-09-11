import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import CoursesContainer from "./containers/CoursesContainer";
import CourseContainer from "./containers/CourseContainer";
import Navbar from "./components/Navbar";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="section">
            <div className="container">
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/courses/:course_id" component={CourseContainer}/>
              <Route exact path="/courses" component={CoursesContainer}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const Home = () => {
  return(
    <h1>Home</h1>
  )
}

export default App;
