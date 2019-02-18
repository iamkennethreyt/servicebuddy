import React, { Component } from "react";
import WorkerTypeForm from "./WorkerTypeForm";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";

import {
  getWorkerTypes,
  deleteWorkerType
} from "../../actions/worketypesAction";

class WorkerTypes extends Component {
  componentDidMount() {
    this.props.getWorkerTypes();
  }

  render() {
    const { workertypes, loading } = this.props.workertypes;
    let listworkertypes;
    if (workertypes === null || loading || workertypes === undefined) {
      listworkertypes = <Spinner />;
    } else {
      listworkertypes =
        Object.keys(workertypes).length === 0 ? (
          <h3>No Worker account yet added..</h3>
        ) : (
          workertypes.map((wt, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {wt.workertype}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  this.props.deleteWorkerType(wt._id);
                }}
              >
                delete
              </button>
            </li>
          ))
        );
    }
    return (
      <div>
        <h1>Worker Types</h1>
        <WorkerTypeForm />
        <ul className="list-group mt-4">{listworkertypes}</ul>
      </div>
    );
  }
}

WorkerTypes.propTypes = {
  getWorkerTypes: PropTypes.func.isRequired,
  deleteWorkerType: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  workertypes: state.workertypes
});

export default connect(
  mapStateToProps,
  { getWorkerTypes, deleteWorkerType }
)(WorkerTypes);
