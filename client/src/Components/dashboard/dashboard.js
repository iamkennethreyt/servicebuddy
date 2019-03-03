import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWorkerTypes } from "../../actions/worketypesAction";
import Spinner from "../common/Spinner";
import WorkersDashboard from "./WorkersDashboard";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWorkerTypes();
  }
  render() {
    let display;
    const { workertypes, loading } = this.props.workertypes;
    if (workertypes === null || loading || workertypes === undefined) {
      display = <Spinner />;
    } else {
      display =
        this.props.auth.user.usertype === "admin" ? (
          <WorkersDashboard />
        ) : (
          <div>
            <h5 className="text-cnter mt-3">List of all worker type</h5>
            {workertypes.map((wp, i) => {
              return (
                <Link
                  key={i}
                  to={`/workers/${wp.workertype}`}
                  className="btn btn-info btn-block mt-2"
                >
                  {wp.workertype}
                </Link>
              );
            })}
          </div>
        );
    }
    return (
      <div>
        <div className="text-center">
          <h3>Welcome to Service Buddy {this.props.auth.user.name}</h3>
        </div>
        {display}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  workertypes: PropTypes.object.isRequired,
  getWorkerTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workertypes: state.workertypes
});

export default connect(
  mapStateToProps,
  { getWorkerTypes }
)(Dashboard);
