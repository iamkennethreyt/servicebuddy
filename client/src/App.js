import React, { Component } from "react";
import Signin from "./Components/SigninPage/SignIn";

class App extends Component {
  state = {
    index: 0
  };
  render() {
    return (
      <div>
        <Signin />
      </div>
    );
  }
}

export default App;
