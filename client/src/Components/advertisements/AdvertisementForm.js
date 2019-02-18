import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAdvertisement } from "../../actions/advertisementAction";
import TextFieldGroup from "../common/TextFieldGroup";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

class AdvertisementForm extends Component {
  constructor() {
    super();
    this.state = {
      advertisment: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      advertisement: this.state.advertisement
    };

    this.props.addAdvertisement(userData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <p className="lead text-center">Add Advertisment</p>
        <form onSubmit={this.onSubmit} className="">
          <TextFieldGroup
            placeholder="Paste image URL of advertisement"
            name="advertisement"
            value={this.state.advertisement}
            onChange={this.onChange}
            error={errors.advertisement}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className="mt-3"
          >
            Add
          </Button>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            className="mt-3"
            onClick={() => this.props.history.push("/")}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

AdvertisementForm.propTypes = {
  addAdvertisement: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addAdvertisement }
)(withRouter(AdvertisementForm));
