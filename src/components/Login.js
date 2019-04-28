import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
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

  responseGoogle = response => {
    const { name, googleId, email } = { ...response.profileObj };
    const requestBody = {
      name: name,
      email: email,
      google_id: googleId
    };
    axios({
      method: "post",
      url: "localhost:3001/auth/login/google",
      data: requestBody
    })
      .then(res => {
        this.props.signin({
          ...res.profileObj,
          token: res.data.token,
          id: res.data.id
        });
      })
      .catch(err => {
        console.log("Error:", err);
        // this.setState({
        //   loading: false,
        //   error: true
        // });

        // Testing
        this.props.signin({
          ...response.profileObj,
          token: "",
          id: 1
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
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="px-12 py-4 border-2 border-grey-light">
          <div className="text-center my-4 mx-auto">
            <img
              className="block object-cover w-32 h-32 m-auto rounded-full border-2 border-grey-dark bg-grey-light"
              src={Logo}
              alt=""
            />
          </div>
          <GoogleLogin
            clientId={this.props.clientId}
            redirectUri={this.props.redirectUri}
            render={renderProps => (
              <button
                className="px-5 sm:px-6 md:px-10 py-3 text-white text-lg my-3 bg-purple-dark hover:bg-purple-light rounded shadow transition"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                title="Login With Google"
              >
                <FontAwesomeIcon icon={faGoogle} /> Login with Google
              </button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseError}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    );
  }
}
export default Login;
