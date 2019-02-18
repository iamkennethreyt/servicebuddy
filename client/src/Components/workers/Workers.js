import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getWorkers } from "../../actions/workersActions";
import Spinner from "../common/Spinner";

class Workers extends Component {
  componentDidMount() {
    this.props.getWorkers();
  }
  render() {
    const { workers, loading } = this.props.workers;
    let listworkers;
    if (workers === null || loading || workers === undefined) {
      listworkers = <Spinner />;
    } else {
      listworkers =
        Object.keys(workers).length === 0 ? (
          <h3>No Workers account yet added..</h3>
        ) : (
          <ul className="list-group list-group-flush text-muted">
            {workers.map((w, i) => (
              <li key={i} className="list-group-item">
                <h4 className="my-1 text-center">{w.name}</h4>
                <p className="m-0">
                  <strong>Worker Type : </strong>
                  {w.workertype}
                </p>
                <p className="m-0">
                  <strong>Worker Details : </strong>
                  {w.details}
                </p>
                <p className="m-0">
                  <strong>Contact Info : </strong>
                  {w.contactinfo}
                </p>
                <p className="m-0">
                  <strong>Email : </strong>
                  {w.email}
                </p>
                <p className="m-0">
                  <strong>Complete Address : </strong>
                  {w.completeaddress}
                </p>
                <p className="m-0">
                  <strong>Agency : </strong>

                  {w.agency}
                </p>
                <p className="m-0">
                  <strong>Rating : </strong>

                  {w.rating}
                </p>
                <Link to={`worker/${w._id}`}>View Profile</Link>
              </li>
            ))}
          </ul>
        );
    }
    return <div>{listworkers}</div>;
  }
}

Workers.propTypes = {
  getWorkers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workers: state.workers
});

export default connect(
  mapStateToProps,
  { getWorkers }
)(Workers);
