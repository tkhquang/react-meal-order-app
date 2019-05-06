import React, { Component } from "react";
import axios from "axios";
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
    const userProfile = googleGetBasicProfil();
    const userAuthRes = googleGetAuthResponse();
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API}/auth/google/callback`,
      headers: {
        id_token: userAuthRes.id_token
      }
    })
      .then(res => {
        this.setState({
          loading: false,
          isAuthenticated: true,
          user: {
            ...userProfile,
            fortressName: res.data.name,
            access_token: res.data.access_token,
            id: res.data.id
          }
        });
      })
      .catch(err => {
        this.signOut();
        if (err.response) {
          this.setState({
            loading: false,
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
          loading: false,
          error: {
            status: true,
            message: "Network Error"
          }
        });
      });
  };

  signOutOfGoogle = () => {
    if (this.state.user) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/auth/google/logout`,
        headers: {
          access_token: this.state.user.access_token
        }
      })
        .then(() => {
          this.setState({
            loading: false,
            isAuthenticated: false,
            user: null
          });
          return;
        })
        .catch(err => {
          if (err.response) {
            this.setState({
              loading: false,
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
            loading: false,
            error: {
              status: true,
              message: "Network Error"
            }
          });
        });
      return;
    }
    this.setState({
      loading: false,
      isAuthenticated: false,
      user: null
    });
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
        ) : (
          <>
            {this.state.isAuthenticated ? (
              <>
                <Header user={this.state.user} signOut={this.signOut} />
                <MenuPage user={this.state.user} />
              </>
            ) : (
              <Login />
            )}
          </>
        )}
      </GoogleAPI>
    );
  }
}

export default App;
