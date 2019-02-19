import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAdvertisements } from "../../actions/advertisementAction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAdvertisements();
  }
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

export default connect(
  null,
  { getAdvertisements }
)(Dashboard);
