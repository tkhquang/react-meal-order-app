import React, { Component } from "react";
import axios from "axios";
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

  logout = res => {
    this.setState({
      isAuthenticated: false,
      user: null
    });
  };

  signin = data => {
    this.setState({
      isAuthenticated: data.isAuthenticated,
      user: { ...data.user }
    });
  };

  componentDidMount() {
    axios
      .get("localhost:3001/auth/google/login-url")
      .then(response => {
        this.setState({
          loading: false,
          clientId: response.data["client_id"],
          redirectUri: response.data["redirect_url"]
        });
      })
      .catch(err => {
        //console.log("Error:", err);
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          "Loading"
        ) : (
          <div className="App">
            {this.state.isAuthenticated ? (
              <>
                <Header logout={this.logout} clientId={this.state.clientId} />
                <MenuPage />
              </>
            ) : (
              <Login
                signin={this.signin}
                setGoogleInfo={this.setGoogleInfo}
                clientId={this.state.clientId}
                redirectUri={this.props.redirectUri}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

export default App;
