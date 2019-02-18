import React, { Component } from "react";
import AdvertisementForm from "./AdvertisementForm";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";

import {
  getAdvertisements,
  deleteAdvertisement
} from "../../actions/advertisementAction";

class Advertisements extends Component {
  componentDidMount() {
    this.props.getAdvertisements();
  }

  render() {
    const { advertisements, loading } = this.props.advertisements;
    let listadvertisements;
    if (advertisements === null || loading || advertisements === undefined) {
      listadvertisements = <Spinner />;
    } else {
      listadvertisements =
        Object.keys(advertisements).length === 0 ? (
          <h3>No Advertisements yet added..</h3>
        ) : (
          advertisements.map((wt, i) => (
            <li key={i} className="list-group-item align-items-center">
              <img src={wt.advertisement} className="card-img-top" alt="..." />

              <button
                className="btn btn-sm btn-danger mt-2"
                onClick={() => {
                  this.props.deleteAdvertisement(wt._id);
                }}
              >
                delete
              </button>
            </li>
          ))
        );
    }
    return (
      <div>
        <h1>Advertisements</h1>
        <AdvertisementForm />
        <ul className="list-group mt-3">{listadvertisements}</ul>
      </div>
    );
  }
}

Advertisements.propTypes = {
  getAdvertisements: PropTypes.func.isRequired,
  deleteAdvertisement: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  advertisements: state.advertisements
});

export default connect(
  mapStateToProps,
  { getAdvertisements, deleteAdvertisement }
)(Advertisements);
