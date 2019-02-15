import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Service Buddy</h1>
        <Link to="/workers" className="btn btn-info btn-block mt-4">
          Go Find
        </Link>
      </div>
    );
  }
}

export default Dashboard;
