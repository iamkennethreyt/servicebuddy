import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWorkerTypes } from "../../actions/worketypesAction";
import Spinner from "../common/Spinner";
import WorkersDashboard from "./WorkersDashboard";
import CreditCardInput from "react-credit-card-input";
import Axios from "axios";

class Dashboard extends Component {
  state = { cardNumber: "", cvc: "", expiry: "", message: "" };
  componentDidMount() {
    this.props.getWorkerTypes();
  }

  handleCardExpiryChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props.auth.user.usertype);
    let display;
    const { workertypes, loading } = this.props.workertypes;
    if (workertypes === null || loading || workertypes === undefined) {
      display = <Spinner />;
    } else {
      display =
        this.props.auth.user.usertype === "admin" ? (
          <WorkersDashboard />
        ) : (
          <div>
            <h5 className="text-cnter mt-3">List of all worker type</h5>
            {workertypes.map((wp, i) => {
              return (
                <Link
                  key={i}
                  to={`/workers/${wp.workertype}`}
                  className="btn btn-info btn-block mt-2"
                >
                  {wp.workertype}
                </Link>
              );
            })}
          </div>
        );
    }
    return (
      <div>
        <div className="text-center">
          <h3>Welcome to Service Buddy {this.props.auth.user.name}</h3>
        </div>
        {this.props.auth.user.usertype !== "worker" ? (
          display
        ) : (
          <div>
            {!this.props.auth.user.status ? (
              <div className="text-center text-muted">
                <h5>Your account wasn't deactivated yet.</h5>
                <div className="card">
                  <h6 className="mt-2">
                    Please Input your card info for payment
                  </h6>
                  <CreditCardInput
                    cardNumberInputProps={{
                      value: this.state.cardNumber,
                      onChange: e =>
                        this.setState({ cardNumber: e.target.value })
                    }}
                    cardExpiryInputProps={{
                      value: this.state.expiry,
                      onChange: e => this.setState({ expiry: e.target.value })
                    }}
                    cardCVCInputProps={{
                      value: this.state.cvc,
                      onChange: e => this.setState({ cvc: e.target.value })
                    }}
                    fieldClassName="input"
                  />
                  <button
                    className="btn-info btn"
                    onClick={e => {
                      Axios.put(
                        `/api/users/changestatus/${this.props.auth.user.id}`,
                        {
                          status: true
                        }
                      )
                        .then(() =>
                          alert(
                            "You may re login your account to our service buddy app"
                          )
                        )
                        .catch(err => console.log(err));
                    }}
                  >
                    Complete Payment
                  </button>
                </div>
                <div className="mt-3">
                  <h5>Or Contact Admin</h5>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      console.log({
                        message: this.state.message,
                        email: this.props.auth.user.email
                      });
                      Axios.post("/api/users/sendemailtoadmin", {
                        message: this.state.message,
                        email: this.props.auth.user.email
                      })
                        .then(res => {
                          alert(
                            "You had successfully send message to the Service Buddy developers"
                          );
                          console.log(res.data);
                        })
                        .catch(er => console.log(er));
                    }}
                  >
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Your Email"
                      name="email"
                      defaultValue={this.props.auth.user.email}
                      disabled
                    />

                    <textarea
                      rows="3"
                      placeholder="your message"
                      className="form-control mt-2"
                      name="message"
                      onChange={e => this.setState({ message: e.target.value })}
                    />

                    <button
                      className="btn btn-info btn-block mt-2"
                      type="submit"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  workertypes: PropTypes.object.isRequired,
  getWorkerTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workertypes: state.workertypes
});

export default connect(
  mapStateToProps,
  { getWorkerTypes }
)(Dashboard);
