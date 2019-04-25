import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import Logo from "../logo.svg";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  responseGoogle = response => {
    const { name, googleId, email } = { ...response.profileObj };
    const requestBody = {
      name: name,
      email: email,
      google_id: googleId
    };
    axios({
      method: "post",
      url: "https://localhost:3001/auth/login/google",
      data: requestBody
    })
      .then(res => {
        this.props.signin({
          isAuthenticated: true,
          user: {
            ...res.profileObj,
            token: res.data.token,
            id: res.data.id
          }
        });
      })
      .catch(err => {
        //console.log("Error:", err);
        // this.setState({
        //   loading: false,
        //   error: true
        // });

        // Testing
        this.props.signin({
          isAuthenticated: true,
          user: {
            ...response.profileObj,
            token: "",
            id: 1
          }
        });
      });
  };
  responseError = err => {
    //console.log(err);
    this.setState({
      error: true
    });
  };

  render() {
    return (
      <div className="Login">
        <div>
          <img className="logo-img" src={Logo} alt="Lunch Order" />
        </div>
        <GoogleLogin
          clientId={this.props.clientId}
          redirectUri={this.props.redirectUri}
          buttonText="Login With Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseError}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
    );
  }
}
export default Login;
