import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getWorkerTypes } from "../../actions/worketypesAction";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert"; // Import
import Axios from "axios";

class Requests extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      details: "",
      dateTo: "",
      dateFrom: "",
      jobType: "",
      workertypes: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { location, details, dateTo, dateFrom, jobType } = this.state;
    const reqJobData = {
      location,
      details,
      dateTo,
      dateFrom,
      jobType
    };

    Axios.post("/api/jobs", reqJobData).then(() => {
      alert("SUCCESSFULLY POST REQUEST JOB");
    });
  }
  componentDidMount() {
    this.props.getWorkerTypes();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workertypes) {
      this.setState({ workertypes: nextProps.workertypes });
    }
  }

  render() {
    const { errors } = this.state;
    const jobTypes = this.state.workertypes.map(x => {
      return x["workertype"];
    });
    // location: "",
    // details: "",
    // dateto: "",
    // datefrom: "",
    // jobtype: "",
    return (
      <div className="container">
        <p className="lead text-center">Register User Service Buddy account</p>
        <form onSubmit={this.onSubmit} noValidate>
          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            multiline={true}
            rows="4"
          />

          <TextFieldGroup
            placeholder="Details of Request"
            name="details"
            value={this.state.details}
            onChange={this.onChange}
            error={errors.details}
            multiline={true}
            rows="4"
          />

          <TextFieldGroup
            placeholder="Input Date to MM/DD/YYYY"
            name="dateTo"
            value={this.state.dateTo}
            onChange={this.onChange}
            error={errors.dateTo}
          />

          <TextFieldGroup
            placeholder="Input Date from MM/DD/YYYY"
            name="dateFrom"
            value={this.state.dateFrom}
            onChange={this.onChange}
            error={errors.dateFrom}
          />

          <SelectListGroup
            name="jobType"
            value={this.state.jobType}
            options={jobTypes}
            error={errors.jobType}
            onChange={this.onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className="mt-4"
          >
            Request
          </Button>
        </form>
      </div>
    );
  }
}

Requests.propTypes = {
  auth: PropTypes.object.isRequired,
  getWorkerTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workertypes: state.workertypes.workertypes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getWorkerTypes }
)(withRouter(Requests));
