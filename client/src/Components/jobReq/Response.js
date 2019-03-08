import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import moment from "moment";

import { getJobs, acceptJob } from "../../actions/jobsAction";

class Responses extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    let display;
    if (this.props.jobs.jobs === null || this.props.jobs.jobs === undefined) {
      display = <Spinner />;
    } else {
      display = this.props.jobs.jobs
        .filter(x => !x.reqStatus)
        .filter(x => x.jobType === this.props.auth.user.workertype)
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
                className="btn btn-success"
                onClick={() => {
                  this.props.acceptJob(x._id);
                }}
              >
                Accept this Request
              </button>
            </li>
          );
        });
    }
    return (
      <div className="container">
        <h4>List of Request of {this.props.auth.user.workertype}</h4>
        <ul className="list-group">{display}</ul>
      </div>
    );
  }
}

Responses.propTypes = {
  getJobs: PropTypes.func.isRequired,
  acceptJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getJobs, acceptJob }
)(Responses);
