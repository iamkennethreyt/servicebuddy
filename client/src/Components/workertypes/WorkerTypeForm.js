import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addWorkerType } from "../../actions/worketypesAction";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

class WorkerTypeForm extends Component {
  constructor() {
    super();
    this.state = {
      workertype: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      workertype: this.state.workertype
    };

    this.props.addWorkerType(userData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <p className="lead text-center">Add worker type</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Worker Type"
            name="workertype"
            value={this.state.workertype}
            onChange={this.onChange}
            error={errors.workertype}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className="mt-3"
          >
            Add
          </Button>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            className="mt-3"
            onClick={() => this.props.history.push("/")}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

WorkerTypeForm.propTypes = {
  addWorkerType: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addWorkerType }
)(withRouter(WorkerTypeForm));
