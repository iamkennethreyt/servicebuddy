import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter, Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Home from "@material-ui/icons/Home";
import People from "@material-ui/icons/NaturePeople";
import Power from "@material-ui/icons/PowerSettingsNew";
import Settings from "@material-ui/icons/Settings";
import _ from "lodash";

class Navbar extends Component {
  state = { value: 0 };
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  onRoute = route => {
    this.props.history.push(route);
  };

  handleChange = (e, value) => {
    e.preventDefault();
    this.setState({ value });
  };

  render() {
    return !_.isEmpty(this.props.auth.user) ? (
      <React.Fragment>
        <div className="pt-4" />
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
          <Tab
            icon={<People />}
            label="Workers"
            onClick={this.onRoute.bind(this, "/workers")}
          />
          <Tab
            icon={<Settings />}
            label="SETTINGS"
            onClick={this.onRoute.bind(this, "/settings")}
          />
          <Tab
            icon={<Power />}
            label="SIGN OUT"
            onClick={this.onLogoutClick.bind(this)}
          />
        </Tabs>
      </React.Fragment>
    ) : null;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
