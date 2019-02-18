import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { getWorkerTypes } from "../../actions/worketypesAction";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Button from "@material-ui/core/Button";

class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      cityprovince: "",
      contactinfo: "",
      completeaddress: "",
      usertype: "worker",
      workertype: "",
      agency: "",
      details: "",
      password: "",
      password2: "",
      errors: {},
      workertypes: [{ workertype: "" }]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.getWorkerTypes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.workertypes) {
      this.setState({ workertypes: nextProps.workertypes });
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
      usertype,
      agency,
      details,
      workertype
    } = this.state;
    const userData = {
      name,
      email,
      password,
      password2,
      contactinfo,
      completeaddress,
      cityprovince,
      usertype,
      agency,
      details,
      workertype
    };

    this.props.registerUser(userData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const workertypes = this.state.workertypes.map(x => {
      return x["workertype"];
    });
    const { errors } = this.state;

    return (
      <div className="container">
        <p className="lead text-center">Register User Service Buddy account</p>
        <form onSubmit={this.onSubmit} className="" noValidate>
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

          <TextFieldGroup
            placeholder="Complete Address"
            name="completeaddress"
            value={this.state.completeaddress}
            onChange={this.onChange}
            error={errors.completeaddress}
            rows="4"
            multiline
          />

          <SelectListGroup
            name="workertype"
            value={this.state.workertype}
            options={workertypes}
            error={errors.workertype}
            onChange={this.onChange}
          />

          <TextFieldGroup
            placeholder="Agency"
            name="agency"
            value={this.state.agency}
            onChange={this.onChange}
            error={errors.agency}
          />

          <TextFieldGroup
            placeholder="Biography"
            name="details"
            value={this.state.details}
            onChange={this.onChange}
            error={errors.details}
            multiline={true}
            rows="4"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className="mt-4"
          >
            Register
          </Button>
          <Button
            onClick={() => this.props.history.push("/signin")}
            type="submit"
            variant="outlined"
            fullWidth
            color="secondary"
            className="mt-2"
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  getWorkerTypes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workertypes: state.workertypes.workertypes
});

export default connect(
  mapStateToProps,
  { registerUser, getWorkerTypes }
)(RegisterUser);
