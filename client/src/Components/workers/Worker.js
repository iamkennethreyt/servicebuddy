import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { getWorker, rateWorker } from "../../actions/workersActions";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Star from "@material-ui/icons/StarRate";

class Worker extends Component {
  state = {
    open: false,
    value: 0
  };

  componentDidMount() {
    this.props.getWorker(this.props.match.params.id);
  }

  //ON DIALAOG FUNCTIONS
  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOk = data => {
    this.setState({ open: false });
    this.props.rateWorker(data);
  };
  handleCancel = () => {
    this.setState({ open: false });
  };

  onChangeStar = value => {
    this.setState({ value });
  };

  render() {
    const { worker: w, loading } = this.props.workers;
    let currentuser;

    if (w === null || loading || w === undefined) {
      currentuser = <Spinner />;
    } else {
      currentuser = _.isEmpty(w) ? (
        <h3>No Worker on this link</h3>
      ) : (
        <div className="text-muted">
          <h4 className="my-1 text-center">{w.name}</h4>
          <p className="m-0">
            <strong>Worker Type : </strong>
            {w.workertype}
          </p>
          <p className="m-0">
            <strong>Worker Details : </strong>
            {w.details}
          </p>
          <p className="m-0">
            <strong>Contact Info : </strong>
            {w.contactinfo}
          </p>
          <p className="m-0">
            <strong>Email : </strong>
            {w.email}
          </p>
          <p className="m-0">
            <strong>Complete Address : </strong>
            {w.completeaddress}
          </p>
          <p className="m-0">
            <strong>Agency : </strong>

            {w.agency}
          </p>
          <p className="m-0">
            <strong>Rating : </strong>
            {w.rating}
          </p>
        </div>
      );
    }

    return (
      <div className="container mt-3">
        <Button
          onClick={() => this.props.history.goBack()}
          variant="outlined"
          color="secondary"
        >
          Back{" "}
        </Button>
        {currentuser}
        <Button onClick={this.handleClickListItem}>Rate this worker</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          onEntering={this.handleEntering}
          aria-labelledby="confirmation-dialog-title"
          onClose={this.handleClose}
          open={this.state.open}
        >
          <DialogTitle id="confirmation-dialog-title">
            Rate this Worker
          </DialogTitle>
          <DialogContent>
            <Star
              fontSize="large"
              color={this.state.value >= 1 ? "secondary" : "inherit"}
              onClick={this.onChangeStar.bind(this, 2)}
            />
            <Star
              fontSize="large"
              color={this.state.value >= 2 ? "secondary" : "inherit"}
              onClick={this.onChangeStar.bind(this, 2)}
            />
            <Star
              fontSize="large"
              color={this.state.value >= 3 ? "secondary" : "inherit"}
              onClick={this.onChangeStar.bind(this, 3)}
            />
            <Star
              fontSize="large"
              color={this.state.value >= 4 ? "secondary" : "inherit"}
              onClick={this.onChangeStar.bind(this, 4)}
            />
            <Star
              fontSize="large"
              color={this.state.value >= 5 ? "secondary" : "inherit"}
              onClick={this.onChangeStar.bind(this, 5)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleOk.bind(this, {
                rating: this.state.value,
                _id: w._id
              })}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Worker.propTypes = {
  rateWorker: PropTypes.func.isRequired,
  getWorker: PropTypes.func.isRequired,
  workers: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  workers: state.workers,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getWorker, rateWorker }
)(withRouter(Worker));
