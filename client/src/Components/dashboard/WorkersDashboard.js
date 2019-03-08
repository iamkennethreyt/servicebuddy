import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import { getWorkers } from "../../actions/workersActions";
import Axios from "axios";
import Fuse from "fuse.js";

const options = {
  caseSensitive: true,
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 0,
  keys: ["name"]
};

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
    value: ""
  };

  render() {
    const { classes } = this.props;

    const fused = new Fuse(this.props.workers.workers, options);

    let searchedworkers = fused.search(this.state.value);

    if (this.state.value === "") {
      searchedworkers = this.props.workers.workers;
    }
    return (
      <List
        subheader={<ListSubheader>List of all registered User</ListSubheader>}
        className={classes.root}
      >
        <TextFieldGroup
          placeholder="Search Worker"
          value={this.state.search}
          onChange={e => this.setState({ value: e.target.value })}
        />
        <p className="text-right pr-2" style={{ marginBottom: "-8px" }}>
          Status
        </p>
        {searchedworkers.map((w, i) => {
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
