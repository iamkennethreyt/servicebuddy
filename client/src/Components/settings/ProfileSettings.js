import { confirmAlert } from "react-confirm-alert"; // Importz
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { profileSettings } from "../../actions/authActions";
import { getWorkerTypes } from "../../actions/worketypesAction";

import Button from "@material-ui/core/Button";

import { getWorker } from "../..//actions/workersActions";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

import Avatar from "@material-ui/core/Avatar";
import Axios from "axios";

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      completeaddress: "",
      name: "",
      cityprovince: "",
      contactinfo: "",
      agency: "",
      workertype: "",
      details: "",
      errors: {},
      image: "",
      workertypes: [{ workertype: "" }],
      selectedFile: ""
    };
  }

  componentDidMount() {
    this.props.getWorker(this.props.auth.user.id);
    this.props.getWorkerTypes();
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
        email,
        details,
        workertype,
        agency,
        image
      } = nextProps.workers.worker;
      this.setState({
        completeaddress,
        name,
        cityprovince,
        contactinfo,
        email,
        details,
        workertype,
        agency,
        image
      });

      if (nextProps.workertypes) {
        this.setState({ workertypes: nextProps.workertypes });
      }
    }
  }

  onRoute = route => {
    this.props.history.push(route);
  };

  onSubmit = e => {
    const {
      completeaddress,
      name,
      cityprovince,
      contactinfo,
      workertype,
      agency,
      details
    } = this.state;
    e.preventDefault();
    const userData = {
      name,
      completeaddress,
      cityprovince,
      contactinfo,
      workertype,
      agency,
      details
    };
    this.props.profileSettings(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const workertypes = this.state.workertypes.map(x => {
      return x["workertype"];
    });
    const {
      email,
      name,
      contactinfo,
      cityprovince,
      completeaddress,
      image
    } = this.state;
    const { errors } = this.state;
    return (
      <div className="container">
        <p className="lead text-center">Settings Account</p>
        {this.props.auth.user.usertype === "worker" ? (
          <div>
            <Avatar
              alt="profile image"
              src={`/api/users/image/${image}`}
              style={{ margin: "auto", width: 100, height: 100 }}
            />
            <form
              className="custom-file"
              encType="multipart/form-data"
              onSubmit={e => {
                e.preventDefault();

                const formData = new FormData();
                formData.append(
                  "file",
                  this.state.selectedFile,
                  this.state.selectedFile.name
                );
                Axios.post("/api/users/upload", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                })
                  .then(() => {
                    confirmAlert({
                      message: "You had successfully update your profile",
                      buttons: [
                        {
                          label: "Ok"
                        }
                      ]
                    });
                  })
                  .catch(err => {
                    confirmAlert({
                      message: "You have not selected image yet",
                      buttons: [
                        {
                          label: "Ok"
                        }
                      ]
                    });
                  });
              }}
            >
              >
              <input
                type="file"
                name="file"
                id="file"
                className="custom-file-input"
                onChange={event => {
                  this.setState({
                    selectedFile: event.target.files[0]
                  });
                }}
              />
              <label htmlFor="file" className="custom-file-label">
                Choose your Profile
              </label>
              <input
                type="submit"
                value="Upload Profile"
                className="btn mt-1  btn-primary"
              />
            </form>
          </div>
        ) : null}

        <form onSubmit={this.onSubmit} className="">
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

          {this.props.auth.user.usertype !== "user" ? (
            <React.Fragment>
              <SelectListGroup
                name="workertype"
                value={this.state.workertype}
                options={workertypes}
                error={errors.workertype}
                onChange={this.onChange}
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
            </React.Fragment>
          ) : null}

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
    );
  }
}

ProfileSettings.propTypes = {
  profileSettings: PropTypes.func.isRequired,
  getWorker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getWorkerTypes: PropTypes.func.isRequired,
  workers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workers: state.workers,
  workertypes: state.workertypes.workertypes
});

export default connect(
  mapStateToProps,
  { profileSettings, getWorker, getWorkerTypes }
)(withRouter(ProfileSettings));
