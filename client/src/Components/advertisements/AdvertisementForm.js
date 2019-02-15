import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAdvertisement } from "../../actions/advertisementAction";
import TextFieldGroup from "../common/TextFieldGroup";

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
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 m-auto">
            <p className="lead text-center">Add Advertisment</p>
            <form onSubmit={this.onSubmit} className="p-3">
              <TextFieldGroup
                placeholder="Paste image URL of advertisement"
                name="advertisement"
                value={this.state.advertisement}
                onChange={this.onChange}
                error={errors.advertisement}
              />

              <input type="submit" className="btn btn-info btn-block mt-2" />
            </form>
          </div>
        </div>
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
)(AdvertisementForm);
