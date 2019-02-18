import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { profileSettings } from "../../actions/authActions";
import Button from "@material-ui/core/Button";

import { getWorker } from "../..//actions/workersActions";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      completeaddress: "",
      name: "",
      cityprovince: "",
      contactinfo: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getWorker(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.workers) {
      const {
        completeaddress,
        name,
        cityprovince,
        contactinfo,
        email
      } = nextProps.workers.worker;
      this.setState({
        completeaddress,
        name,
        cityprovince,
        contactinfo,
        email
      });
    }
  }

  onRoute = route => {
    this.props.history.push(route);
  };

  onSubmit = e => {
    const { completeaddress, name, cityprovince, contactinfo } = this.state;
    e.preventDefault();
    const userData = {
      name,
      completeaddress,
      cityprovince,
      contactinfo
    };
    this.props.profileSettings(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      email,
      name,
      contactinfo,
      cityprovince,
      completeaddress
    } = this.state;
    const { errors } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 m-auto">
            <p className="lead text-center">Settings Account</p>
            <form onSubmit={this.onSubmit} className="p-3">
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={this.onChange}
                error={errors.email}
                disabled={true}
              />

              <TextFieldGroup
                placeholder="Full name"
                name="name"
                value={name}
                onChange={this.onChange}
                error={errors.name}
              />

              <TextFieldGroup
                placeholder="Contact Info"
                name="contactinfo"
                value={contactinfo}
                onChange={this.onChange}
                error={errors.contactinfo}
              />

              <SelectListGroup
                name="cityprovince"
                value={cityprovince}
                options={["Cebu", "Bohol", "Bantayan"]}
                error={errors.cityprovince}
                onChange={this.onChange}
              />

              <TextFieldGroup
                placeholder="Your Complete Address"
                name="completeaddress"
                value={completeaddress}
                onChange={this.onChange}
                error={errors.completeaddress}
                rows="4"
                multiline
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className="mt-3"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={this.onRoute.bind(this, "/settings/password")}
                className="mt-2"
              >
                Password Settings
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={this.onRoute.bind(this, "/")}
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

ProfileSettings.propTypes = {
  profileSettings: PropTypes.func.isRequired,
  getWorker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workers: state.workers
});

export default connect(
  mapStateToProps,
  { profileSettings, getWorker }
)(withRouter(ProfileSettings));
