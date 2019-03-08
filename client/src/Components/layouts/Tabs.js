import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FolderShared from "@material-ui/icons/FolderShared";

import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Home from "@material-ui/icons/Home";
import People from "@material-ui/icons/NaturePeople";
import Power from "@material-ui/icons/PowerSettingsNew";
import Settings from "@material-ui/icons/Settings";
import Note from "@material-ui/icons/Note";
import Add from "@material-ui/icons/FontDownload";
import _ from "lodash";
import { confirmAlert } from "react-confirm-alert"; // Import

const styles = theme => ({
  paper: {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none"
  }
});

class Navbar extends Component {
  state = { value: 0, open: false, valueAdd: 10 };
  onLogoutClick(e) {
    e.preventDefault();

    confirmAlert({
      message: "Are you sure to logout the account?",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            this.props.logoutUser();
            this.setState({ value: 0 });
          }
        },
        {
          label: "Cancel"
        }
      ]
    });
  }

  onRoute = route => {
    this.props.history.push(route);
  };

  handleChange = (e, value) => {
    e.preventDefault();
    this.setState({ value });
    // this.handleOpen();
  };

  componentDidMount() {
    // console.log();
    if (this.props.history.location.pathname === "/workers") {
      this.setState({ value: 1 });
    }

    if (this.props.history.location.pathname === "/settings") {
      this.setState({ value: 2 });
    }
  }

  rand = num => {
    return Math.floor(Math.random() * Math.floor(num));
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // console.log(this.props.auth.user.status === true)
    const { classes } = this.props;
    let imgStatic =
      "https://images.unsplash.com/photo-1550431729-428daf3a19e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

    if (!_.isEmpty(this.props.advertisements)) {
      imgStatic = this.props.advertisements[
        this.rand(this.props.advertisements.length)
      ];
    }
    return !_.isEmpty(this.props.auth.user) ? (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <img src={imgStatic.advertisement} alt="Advertisement" />
          </div>
        </Modal>
        <div style={{ height: "70px" }} />
        <Tabs
          position="fixed"
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          className="fixed-bottom bg-light"
        >
          <Tab
            icon={<Home />}
            label="HOME"
            onClick={this.onRoute.bind(this, "/")}
          />
          {this.props.auth.user.usertype === "user" ? (
            <Tab
              icon={<People />}
              label="Workers"
              onClick={this.onRoute.bind(this, "/workers")}
            />
          ) : null}
          {this.props.auth.user.usertype === "user" ? (
            <Tab
              icon={<FolderShared />}
              label="Request"
              onClick={this.onRoute.bind(this, "/requests")}
            />
          ) : null}

          {this.props.auth.user.usertype === "worker" &&
          this.props.auth.user.status === true ? (
            <Tab
              icon={<FolderShared />}
              label="Request"
              onClick={this.onRoute.bind(this, "/response")}
            />
          ) : null}
          {this.props.auth.user.usertype === "worker" &&
          this.props.auth.user.status === true ? (
            <Tab
              icon={<FolderShared />}
              label="Pendings"
              onClick={this.onRoute.bind(this, "/accept")}
            />
          ) : null}
          <Tab
            icon={<Settings />}
            label="settings"
            onClick={this.onRoute.bind(this, "/settings")}
          />

          {this.props.auth.user.usertype === "admin" ? (
            <React.Fragment>
              <Tab
                icon={<Note />}
                label="types"
                onClick={this.onRoute.bind(this, "/workertypes")}
              />
              <Tab
                icon={<Add />}
                label="Ads"
                onClick={this.onRoute.bind(this, "/advertisements")}
              />
            </React.Fragment>
          ) : null}

          <Tab
            icon={<Power />}
            label="SIGNOUT"
            onClick={this.onLogoutClick.bind(this)}
          />
        </Tabs>
      </React.Fragment>
    ) : null;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  advertisements: state.advertisements.advertisements
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(withStyles(styles)(Navbar)));
