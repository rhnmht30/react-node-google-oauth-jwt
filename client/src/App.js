import React, { Component } from "react";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
class App extends Component {
  state = {
    user: {},
    token: ""
  };

  protectedRoute = () => {
    const token = this.state.token;
    const bearerToken = `Bearer ${token}`;
    console.log(token, bearerToken);
    axios
      .get("http://localhost:4500/protected", {
        headers: {
          Authorization: bearerToken
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    const responseGoogle = response => {
      axios
        .post("http://localhost:4500/getToken", response.profileObj)
        .then(res => {
          this.setState({ user: response.profileObj, token: res.data.token });
        })
        .catch(err => console.log(err));
      console.log(response);
    };
    const logout = response => {
      this.setState({ user: {}, token: "" });
      console.log("logged out");
    };
    return (
      <div>
        <h1>HOMEPAGE</h1>
        <GoogleLogin
          clientId="950041852674-1sj1geobh1fp6bsed16523b203umdtpu.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        {this.state.user ? this.state.user.name : null}
        <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
        <button onClick={this.protectedRoute}>Protected</button>
      </div>
    );
  }
}

export default App;
