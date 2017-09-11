import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return(
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">HercGrades</Link>
        <div className="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/courses">Courses</Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/login">
              <button className="button is-info">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;