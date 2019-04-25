import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";

class Header extends Component {
  render() {
    return (
      <header>
        <GoogleLogout
          clientId={this.props.clientId}
          buttonText="Logout"
          onLogoutSuccess={this.props.logout}
        />
      </header>
    );
  }
}

export default Header;
