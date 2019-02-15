import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { profileSettings } from "../../actions/authActions";
import { getWorker } from "../..//actions/workersActions";
import { Link } from "react-router-dom";

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

  onSubmit = e => {
    const { completeaddress, name, cityprovince, contactinfo } = this.state;
    e.preventDefault();
    const userData = {
      name,
      completeaddress,
      cityprovince,
      contactinfo
    };
    this.props.profileSettings(userData);
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
    const selectOptions = ["Cebu", "Bohol", "Bantayan"].map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 m-auto">
            <p className="lead text-center">Settings Account</p>
            <form onSubmit={this.onSubmit} className="p-3">
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  placeholder="Your new email"
                  name="email"
                  defaultValue={email}
                  onChange={this.onChange}
                  disabled
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name
                  })}
                  placeholder="Your new name"
                  name="name"
                  defaultValue={name}
                  onChange={this.onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.contactinfo
                  })}
                  placeholder="Your new contact information"
                  name="contactinfo"
                  defaultValue={contactinfo}
                  onChange={this.onChange}
                />
                {errors.contactinfo && (
                  <div className="invalid-feedback">{errors.contactinfo}</div>
                )}
              </div>

              <div className="form-group">
                <select
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.cityprovince
                  })}
                  name="cityprovince"
                  value={cityprovince}
                  onChange={this.onChange}
                >
                  {selectOptions}
                </select>
                {errors.cityprovince && (
                  <div className="invalid-feedback">{errors.cityprovince}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.completeaddress
                  })}
                  placeholder="Your new complete address"
                  name="completeaddress"
                  value={completeaddress}
                  onChange={this.onChange}
                />
                {errors.completeaddress && (
                  <div className="invalid-feedback">
                    {errors.completeaddress}
                  </div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
              <Link to="/settings/password">Password Settings</Link>
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
)(ProfileSettings);
