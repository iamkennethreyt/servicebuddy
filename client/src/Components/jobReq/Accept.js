import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import moment from "moment";

import { getJobs, cancelJob, completeJob } from "../../actions/jobsAction";

class Accept extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    console.log("dave", this.props.jobs.jobs);
    let display;
    if (this.props.jobs.jobs === null || this.props.jobs.jobs === undefined) {
      display = <Spinner />;
    } else {
      display = this.props.jobs.jobs
        .filter(x => x.workerAccept._id === this.props.auth.user.id)
        .map((x, i) => {
          return (
            <li key={i} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{x.user.name}</h5>
                <small>
                  {moment(x.date)
                    .startOf("minute")
                    .fromNow()}
                </small>
              </div>
              <p className="mb-1">
                Contact Info : <strong>{x.user.contactinfo}</strong>
                <br />
                Email : <strong>{x.user.email}</strong>
              </p>
              <p className="mb-1">{x.details}</p>

              <p>
                Location requested : <br />
                <strong>{x.location}</strong>
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  this.props.cancelJob(x._id, x.user._id);
                }}
              >
                Cancel Job
              </button>

              <button
                className="btn btn-success"
                onClick={() => {
                  this.props.completeJob(x._id);
                }}
              >
                Complete Job
              </button>
            </li>
          );
        });
    }
    return (
      <div className="container">
        <h4>List of all pending accept work</h4>
        <ul className="list-group">{display}</ul>
      </div>
    );
  }
}

Accept.propTypes = {
  getJobs: PropTypes.func.isRequired,
  cancelJob: PropTypes.func.isRequired,
  completeJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getJobs, cancelJob, completeJob }
)(Accept);
