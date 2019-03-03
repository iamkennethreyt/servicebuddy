import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getWorkers } from "../../actions/workersActions";
import Spinner from "../common/Spinner";
import Star from "@material-ui/icons/StarRate";
import TextFieldGroup from "../common/TextFieldGroup";

import Fuse from "fuse.js";

const options = {
  caseSensitive: true,
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 0,
  keys: [
    "completeaddress",
    "completeaddress",
    "email",
    "name",
    "rating",
    "workertype"
  ]
};

class Workers extends Component {
  state = {
    value: ""
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  componentDidMount() {
    this.props.getWorkers();
  }
  render() {
    const { workers, loading } = this.props.workers;

    const fused = new Fuse(this.props.workers.workers, options);

    let searchedworkers = fused.search(this.state.value);

    if (this.state.value === "") {
      searchedworkers = workers;
    }

    let listworkers;
    if (workers === null || loading || workers === undefined) {
      listworkers = <Spinner />;
    } else {
      listworkers =
        Object.keys(workers).length === 0 ? (
          <h3>No Workers account yet added..</h3>
        ) : (
          <ul className="list-group list-group-flush text-muted">
            <TextFieldGroup
              placeholder="Search anything"
              name="value"
              value={this.state.search}
              onChange={this.onChange}
            />
            {searchedworkers
              .filter(y => y.status === true)
              .filter(x => {
                if (this.props.match.params.workertype) {
                  // console.log("condition true");
                  return x.workertype === this.props.match.params.workertype;
                } else {
                  return x.workertype;
                }
              })
              .map((w, i) => (
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
                    <Star
                      fontSize="large"
                      color={w.rating >= 1 ? "secondary" : "inherit"}
                    />
                    <Star
                      fontSize="large"
                      color={w.rating >= 2 ? "secondary" : "inherit"}
                    />
                    <Star
                      fontSize="large"
                      color={w.rating >= 3 ? "secondary" : "inherit"}
                    />
                    <Star
                      fontSize="large"
                      color={w.rating >= 4 ? "secondary" : "inherit"}
                    />
                    <Star
                      fontSize="large"
                      color={w.rating >= 5 ? "secondary" : "inherit"}
                    />
                  </p>
                  <Link to={`worker/${w._id}`}>View Profile</Link>
                </li>
              ))}
          </ul>
        );
    }
    return (
      <div>
        <h3 className="text-center">
          List of all {this.props.match.params.workertype}
        </h3>
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
