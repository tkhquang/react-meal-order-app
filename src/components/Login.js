import React, { Component } from "react";
import { CustomGoogleLogin } from "react-google-oauth";
import Logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  responseError = err => {
    console.log("Login Error: ", err);
    this.setState({
      error: true
    });
  };

  render() {
    return (
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="px-12 py-4 border-2 border-grey-light">
          <div className="text-center my-4 mx-auto">
            <img
              className="block object-cover w-32 h-32 m-auto rounded-full border-2 border-grey-dark bg-grey-light"
              src={Logo}
              alt=""
            />
          </div>
          <CustomGoogleLogin
            tag="button"
            className="px-5 sm:px-6 md:px-10 py-3 text-white text-lg my-3 bg-purple-dark hover:bg-purple-light rounded shadow transition"
            title="Login With Google"
            onLoginFailure={this.responseError}
          >
            <FontAwesomeIcon icon={faGoogle} /> Login with Google
          </CustomGoogleLogin>
        </div>
      </div>
    );
  }
}
export default Login;
