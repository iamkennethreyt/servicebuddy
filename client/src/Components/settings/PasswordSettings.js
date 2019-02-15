import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { updatePassword } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class PasswordSettings extends Component {
  state = {
    password: "",
    password2: "",
    password3: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      password: this.state.password,
      password2: this.state.password2,
      password3: this.state.password3
    };
    this.props.updatePassword(data, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 m-auto">
            <p className="lead text-center">Settings Account</p>
            <form className="border border-light p-2" onSubmit={this.onSubmit}>
              <p className="h4 mb-4">Password Settings</p>

              <TextFieldGroup
                placeholder="New Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />

              <TextFieldGroup
                placeholder="New Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />

              <TextFieldGroup
                placeholder="Confirm Password"
                name="password3"
                type="password"
                value={this.state.password3}
                onChange={this.onChange}
                error={errors.password3}
              />

              <button type="submit" className="btn btn-info btn-block mt-4">
                Save
              </button>

              <Link to="/" className="btn btn-info btn-block mt-4">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PasswordSettings.protoTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(withRouter(PasswordSettings));
