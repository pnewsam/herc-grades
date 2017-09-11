import React, { Component } from "react";

import CenteredCard from "../bulma/CenteredCard";

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      pass: '',
      passConf: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render(){
    return(
      <CenteredCard>
        <h1 className="title is1">Log in to your account</h1>
        <form>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                id="email"
                type="text"
                placeholder="Enter email here..."
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                id="pass"
                type="password"
                placeholder="Enter password here..."
                value={this.state.pass}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                id="passConf"
                type="password"
                placeholder="Retype password here..."
                value={this.state.passConf}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">Submit</button>
        </form>
      </CenteredCard>
    )
  }
}

export default LoginForm;