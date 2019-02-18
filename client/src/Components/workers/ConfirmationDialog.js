import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

import Star from "@material-ui/icons/StarRate";

class ConfirmationDialog extends React.Component {
  state = {
    open: false,
    value: 0
  };

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOk = () => {
    this.setState({ open: false });
  };
  handleCancel = () => {
    this.setState({ open: false });
  };

  onChangeStar = value => {
    this.setState({ value });
  };
  render() {
    return (
      <React.Fragment>
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
            <Button onClick={this.handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default ConfirmationDialog;
