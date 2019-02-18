import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
        <AppBar position="static" color="secondary">
          <Toolbar className="text-center">
            <Typography variant="h6" color="inherit">
              Service Buddy
            </Typography>
          </Toolbar>
        </AppBar>
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
