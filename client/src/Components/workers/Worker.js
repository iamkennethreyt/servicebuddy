import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import {
  getWorker,
  rateWorker,
  addFeedBack
} from "../../actions/workersActions";

import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Star from "@material-ui/icons/StarRate";
import TextFieldGroup from "../common/TextFieldGroup";

class Worker extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: 0,
      feedback: "",
      errors: {},
      openModal: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleOpenAlert = () => {
    this.setState({ openModal: true });
    this.props.getWorker(this.props.match.params.id);
  };

  handleCloseAlert = () => {
    this.setState({ openModal: false });
  };

  componentDidMount() {
    this.props.getWorker(this.props.match.params.id);
  }

  //ON DIALAOG FUNCTIONS
  handleClickListItem = () => {
    this.setState({ open: true });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      feedback: this.state.feedback,
      _id: this.props.workers.worker._id
    };

    this.props.addFeedBack(userData, this.handleOpenAlert);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOk = data => {
    this.setState({ open: false });
    this.props.rateWorker(data, this.handleOpenAlert);
  };
  handleCancel = () => {
    this.setState({ open: false });
  };

  onChangeStar = value => {
    this.setState({ value });
  };

  render() {
    const { errors } = this.state;
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
          <p className="m-0" onClick={this.handleClickListItem}>
            <strong>Rating : </strong>
            <Star
              fontSize="large"
              color={w.rating >= 1 ? "secondary" : "inherit"}
            />
            <Star
              fontSize="large"
              color={w.rating >= 2 ? "secondary" : "inherit"}
            />
            <Star
              fontSize="large"
              color={w.rating >= 3 ? "secondary" : "inherit"}
            />
            <Star
              fontSize="large"
              color={w.rating >= 4 ? "secondary" : "inherit"}
            />
            <Star
              fontSize="large"
              color={w.rating >= 5 ? "secondary" : "inherit"}
            />
          </p>
          <hr />
          <p className="lead text-center">Add Feedback</p>

          <Dialog
            open={this.state.openModal}
            onClose={this.handleCloseAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Successfully added feedback/rate to {w.name}
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleCloseAlert} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder={`Post your feed back for ${w.name}`}
              name="feedback"
              value={this.state.feedback}
              onChange={this.onChange}
              error={errors.feedback}
              multiline
              rows="3"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className="mt-3"
            >
              Post Feedback
            </Button>
          </form>
          <div className="my-2" />
          <ul className="list-group">
            {w.feedbacks.map((fb, i) => {
              return (
                <li
                  key={i}
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-2 h5">{fb.user.name}</h5>
                    <small className="text-muted">
                      {moment(fb.date)
                        .startOf("minute")
                        .fromNow()}
                    </small>
                  </div>
                  <p className="mb-2">{fb.feedback}</p>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">{fb.user.email}</small>
                  </div>
                </li>
              );
            })}
          </ul>
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
          Back
        </Button>
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={this.handleOpenAlert}
        >
          Open alert dialog
        </Button> */}

        {currentuser}
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
              onClick={this.onChangeStar.bind(this, 1)}
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
  auth: PropTypes.object.isRequired,
  addFeedBack: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  workers: state.workers,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getWorker, rateWorker, addFeedBack }
)(withRouter(Worker));
