import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { getWorker } from "../../actions/workersActions";
import Spinner from "../common/Spinner";

class Worker extends Component {
  componentDidMount() {
    this.props.getWorker(this.props.match.params.id);
  }

  render() {
    const { worker, loading } = this.props.workers;
    let currentuser;

    if (worker === null || loading || worker === undefined) {
      currentuser = <Spinner />;
    } else {
      currentuser = _.isEmpty(worker) ? (
        <h3>No Worker on this link</h3>
      ) : (
        <div>
          <p>{worker.name}</p>
          <p>{worker.completeaddress}</p>
          <p>{worker.rating}</p>
          <p>{worker.contactinfo}</p>
          <p>{worker.workertype}</p>
          <p>{worker.agency}</p>
          <p>{worker.details}</p>
          <p>{worker.email}</p>
        </div>
      );
    }

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 m-auto" />
          {currentuser}
        </div>
      </div>
    );
  }
}

Worker.propTypes = {
  getWorker: PropTypes.func.isRequired,
  workers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  workers: state.workers
});

export default connect(
  mapStateToProps,
  { getWorker }
)(Worker);
