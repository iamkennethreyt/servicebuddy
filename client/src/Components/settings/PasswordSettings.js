import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updatePassword } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "@material-ui/core/Button";

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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className="mt-3"
              >
                Change
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => this.props.history.push("/settings")}
                className="mt-2"
              >
                Cancel
              </Button>
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
