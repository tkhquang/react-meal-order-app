import React, { Component } from "react";
import { CustomGoogleLogin } from "react-google-oauth";
import Logo from "../images/logo.png";
import InpageError from "./InpageError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: {
        status: false,
        message: ""
      }
    };
  }

  render() {
    return (
      <div className="flex-col-full min-h-screen">
        <div className="default-border px-12 py-4">
          <div className="text-center my-4 mx-auto">
            <img
              className="img-fit w-32 h-32 default-border bg-grey-light"
              src={Logo}
              alt=""
            />
          </div>
          <CustomGoogleLogin
            tag="button"
            className="btn"
            title="Login With Google"
            disabled={this.state.loading ? true : false}
            onRequest={() => {
              this.setState({
                loading: true,
                error: {
                  status: false,
                  message: ""
                }
              });
            }}
            onLoginFailure={err => {
              this.setState({
                loading: false,
                error: {
                  status: true,
                  message: err.error
                }
              });
            }}
          >
            {this.state.loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Logging In...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faGoogle} /> Login with Google
              </>
            )}
          </CustomGoogleLogin>
        </div>
        {this.state.error.status && (
          <InpageError message={this.state.error.message} />
        )}
      </div>
    );
  }
}

export default Login;
