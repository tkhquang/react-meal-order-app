import React, { Component } from "react";
import request from "./utils/request";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Header from "./components/Header";
import MenuPage from "./components/MenuPage";
import ErrorPage from "./components/ErrorPage";
import {
  GoogleAPI,
  googleGetBasicProfil,
  googleGetAuthResponse
} from "react-google-oauth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuthenticated: false,
      user: null,
      state: "",
      error: {
        status: false,
        code: null,
        message: ""
      }
    };
  }

  signOut = () => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        if (!auth2.isSignedIn.get()) {
          auth2.disconnect();
          return;
        }
        auth2.signOut().then(auth2.disconnect());
      }
    }
  };

  signInToGoogle = () => {
    const { name, email, imageUrl } = googleGetBasicProfil();
    const { id_token } = googleGetAuthResponse();
    request
      .get("/auth/google/callback", {
        params: {
          id_token
        }
      })
      .then(res => {
        this.setState({
          isAuthenticated: true,
          user: {
            name,
            email,
            imageUrl,
            fortressName: res.data.name,
            id: res.data.id
          }
        });
        window.localStorage.setItem("token", res.data.authorization);
      })
      .catch(err => {
        this.signOut();
        if (err.response) {
          this.setState({
            error: {
              status: true,
              code: err.response.status,
              message: err.response.data.error
                ? err.response.data.error.message
                : err.response.data
            }
          });
          return;
        }
        this.setState({
          error: {
            status: true,
            message: "Network Error"
          }
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  signOutOfGoogle = () => {
    if (this.state.user) {
      request
        .post("/auth/google/logout")
        .then(() => {
          this.setState({
            isAuthenticated: false,
            user: null
          });
          window.localStorage.removeItem("token");
          return;
        })
        .catch(err => {
          if (err.response) {
            this.setState({
              error: {
                status: true,
                code: err.response.status,
                message: err.response.data.error
                  ? err.response.data.error.message
                  : err.response.data
              }
            });
            return;
          }
          this.setState({
            error: {
              status: true,
              message: "Network Error"
            }
          });
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
      return;
    }
    this.setState({
      loading: false,
      isAuthenticated: false,
      user: null
    });
    window.localStorage.removeItem("token");
  };

  onUpdateSigninStatus = isSignIn => {
    if (isSignIn) {
      this.signInToGoogle();
      return;
    }
    this.signOutOfGoogle();
  };

  render() {
    return (
      <GoogleAPI
        clientId={process.env.REACT_APP_CLIENT_ID}
        onUpdateSigninStatus={this.onUpdateSigninStatus}
      >
        {this.state.loading ? (
          <Loading />
        ) : this.state.error.status ? (
          <ErrorPage
            code={this.state.error.code}
            message={this.state.error.message}
          />
        ) : this.state.isAuthenticated ? (
          <>
            <Header user={this.state.user} signOut={this.signOut} />
            <MenuPage userID={this.state.user.id} />
          </>
        ) : (
          <Login />
        )}
      </GoogleAPI>
    );
  }
}

export default App;
