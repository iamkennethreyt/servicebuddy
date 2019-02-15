import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addWorkerType } from "../../actions/worketypesAction";
import TextFieldGroup from "../common/TextFieldGroup";

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
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 m-auto">
            <p className="lead text-center">Add worker type</p>
            <form onSubmit={this.onSubmit} className="p-3">
              <TextFieldGroup
                placeholder="Worker Type"
                name="workertype"
                value={this.state.workertype}
                onChange={this.onChange}
                error={errors.workertype}
              />

              <input type="submit" className="btn btn-info btn-block mt-2" />
            </form>
          </div>
        </div>
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
)(WorkerTypeForm);
