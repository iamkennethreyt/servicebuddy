import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      cityprovince: "",
      contactinfo: "",
      completeaddress: "",
      usertype: "user",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      name,
      email,
      password,
      password2,
      contactinfo,
      completeaddress,
      cityprovince,
      usertype
    } = this.state;
    const userData = {
      name,
      email,
      password,
      password2,
      contactinfo,
      completeaddress,
      cityprovince,
      usertype
    };

    this.props.registerUser(userData, this.props.history);
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
            <p className="lead text-center">
              Register User Service Buddy account
            </p>
            <form onSubmit={this.onSubmit} className="p-3">
              <TextFieldGroup
                placeholder="Full Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />

              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <SelectListGroup
                name="cityprovince"
                value={this.state.cityprovince}
                options={["Cebu", "Bohol", "Bantayan"]}
                error={errors.cityprovince}
                onChange={this.onChange}
              />

              <TextFieldGroup
                placeholder="Contact Information"
                name="contactinfo"
                value={this.state.contactinfo}
                onChange={this.onChange}
                error={errors.contactinfo}
              />

              <TextAreaFieldGroup
                placeholder="Complete Address"
                name="completeaddress"
                value={this.state.completeaddress}
                onChange={this.onChange}
                error={errors.completeaddress}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />

              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterUser);
