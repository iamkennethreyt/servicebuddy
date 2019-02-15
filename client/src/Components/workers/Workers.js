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
          <ul className="list-group list-group-flush">
            {workers.map((w, i) => (
              <li key={i} className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{w.name}</h5>
                  <small>{w.workertype}</small>
                </div>
                <p className="mb-1">{w.details}</p>
                <p className="mb-1">{w.contactinfo}</p>
                <p className="mb-1">{w.email}</p>
                <p className="mb-1">{w.completeaddress}</p>
                <p className="mb-1">{w.cityprovince}</p>
                <p className="mb-1">{w.agency}</p>
                <Link to={`worker/${w._id}`}>View Profile</Link>
              </li>
            ))}
          </ul>
        );
    }
    return (
      <div>
        <h1>Workers</h1>
        {listworkers}
      </div>
    );
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
