import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Tabs from "./Components/layouts/Tabs";
import PrivateRoute from "./Components/common/PrivateRoute";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import Dashboard from "./Components/dashboard/dashboard";
import Signin from "./Components/auth/SignIn";
import ProfileSettings from "./Components/settings/ProfileSettings";
import PasswordSettings from "./Components/settings/PasswordSettings";
import RegisterUser from "./Components/auth/RegisterUser";
import WorkerTypes from "./Components/workertypes/WorkerTypes";
import RegisterWorker from "./Components/auth/RegisterWorker";
import Advertisements from "./Components/advertisements/Advertisements";
import Workers from "./Components/workers/Workers";
import Worker from "./Components/workers/Worker";
import Header from "./Components/layouts/Header";
import Requests from "./Components/jobReq/Requests";
import Response from "./Components/jobReq/Response";
import Accept from "./Components/jobReq/Accept";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/registeruser" component={RegisterUser} />
            <Route exact path="/registerworker" component={RegisterWorker} />
            <div>
              <Header />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/settings"
                    component={ProfileSettings}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/response" component={Response} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/requests" component={Requests} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/accept" component={Accept} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/settings/password"
                    component={PasswordSettings}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/workertypes"
                    component={WorkerTypes}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/advertisements"
                    component={Advertisements}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/workers" component={Workers} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/workers/:workertype"
                    component={Workers}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/worker/:id" component={Worker} />
                </Switch>
              </div>
              <Tabs />
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
