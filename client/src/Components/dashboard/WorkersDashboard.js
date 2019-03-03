import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";

import { connect } from "react-redux";
import { getWorkers } from "../../actions/workersActions";
import Axios from "axios";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class WorkersDashboard extends React.Component {
  componentDidMount() {
    this.props.getWorkers();
  }
  state = {
    checked: ["wifi"]
  };

  render() {
    const { classes } = this.props;
    return (
      <List
        subheader={<ListSubheader>Settings</ListSubheader>}
        className={classes.root}
      >
        {this.props.workers.workers.map((w, i) => {
          return (
            <ListItem key={i}>
              <ListItemText primary={`${w.name}`} />
              <ListItemSecondaryAction>
                <Switch
                  onChange={e => {
                    Axios.put(`/api/users/changestatus/${w._id}`, {
                      status: e.target.checked
                    });
                  }}
                  defaultChecked={w.status}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

WorkersDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getWorkers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workers: state.workers
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getWorkers }
  )(WorkersDashboard)
);
