import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Header from "./components/Header";
import MenuPage from "./components/MenuPage";
import { GoogleAPI, googleGetBasicProfil } from "react-google-oauth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isMounted: false,
      clientId: "",
      isAuthenticated: false,
      user: null,
      token: ""
    };
  }

  signInToGoogle = () => {
    const userProfile = googleGetBasicProfil();
    axios({
      method: "get",
      url: "http://localhost:8000/auth/google/callback",
      params: {
        state: this.state.token,
        email: userProfile.email
      }
    })
      .then(res => {
        this.setState({
          isAuthenticated: true,
          user: {
            ...userProfile,
            fortressName: res.data.name,
            token: res.data.token,
            id: res.data.id
          },
          loading: false
        });
      })
      .catch(err => {
        console.log("Get Callback Error:", err);
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  signOutOfGoogle = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  onUpdateSigninStatus = isSignIn => {
    if (isSignIn) {
      this.signInToGoogle();
      return;
    }
    this.signOutOfGoogle();
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/auth/google/login-url")
      .then(response => {
        this.setState({
          clientId: response.data["client_id"],
          redirectUri: response.data["redirect_uri"],
          token: response.data["state"],
          isMounted: true
        });
      })
      .catch(err => {
        console.log("Get auth/google/login-url:", err);
        this.setState({
          error: true
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.isMounted && (
          <GoogleAPI
            clientId={this.state.clientId}
            onUpdateSigninStatus={this.onUpdateSigninStatus}
          >
            {this.state.loading ? (
              <Loading />
            ) : this.state.isAuthenticated ? (
              <>
                <Header
                  logout={this.logout}
                  user={this.state.user}
                  clientId={this.state.clientId}
                />
                <MenuPage />
              </>
            ) : (
              <Login />
            )}
          </GoogleAPI>
        )}
      </div>
    );
  }
}

export default App;
