import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Header from "./components/Header";
import MenuPage from "./components/MenuPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuthenticated: false,
      user: null,
      // Testing
      clientId:
        "69429009715-i0h07ju17u4o6m8b6m0a4tt9k2dld881.apps.googleusercontent.com",
      redirectUri: ""
    };
  }

  logout = () => {
    window.localStorage.clear();
    this.setState({
      isAuthenticated: false,
      user: null
    });
  };

  signin = userData => {
    window.localStorage.setItem("user", JSON.stringify({ ...userData }));
    this.setState({
      isAuthenticated: true,
      user: { ...userData }
    });
  };

  loggedInCheck = () => {
    if (!window.localStorage.getItem("user")) {
      this.setState({
        loading: false
      });
      return;
    }
    const user = { ...JSON.parse(window.localStorage.getItem("user")) };
    axios({
      method: "post",
      url: "localhost:3001/auth/verify", // placeholder
      data: { token: user.token }
    })
      .then(res => {
        this.props.signin({
          isAuthenticated: true,
          user: { ...res.data },
          loading: false
        });
      })
      .catch(err => {
        console.log("Error:", err);
        // this.setState({
        //   error: true,
        //   loading: false,
        // });

        // Testing
        this.setState({
          isAuthenticated: true,
          user: { ...user },
          loading: false
        });
      });
  };

  componentDidMount() {
    axios
      .get("localhost:3001/auth/google/login-url")
      .then(response => {
        this.setState({
          clientId: response.data["client_id"],
          redirectUri: response.data["redirect_url"]
        });
        this.loggedInCheck();
      })
      .catch(err => {
        console.log("Error:", err);
        // this.setState({
        //   error: true,
        //   loading: false
        // });
        this.loggedInCheck(); // Testing
      });
  }

  render() {
    return (
      <div className="App">
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
          <Login
            signin={this.signin}
            setGoogleInfo={this.setGoogleInfo}
            clientId={this.state.clientId}
            redirectUri={this.props.redirectUri}
            isSignedIn={false}
          />
        )}
      </div>
    );
  }
}

export default App;
