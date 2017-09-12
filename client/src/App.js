import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import SectionsContainer from "./components/SectionsContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={Home} />
          <Route path="/sections" component={SectionsContainer} />
        </div>
      </Router>
    );
  }
}

const Home = () => {
  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default App;
