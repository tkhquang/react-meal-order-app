import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class UserPanel extends Component {
  signOut = () => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        if (!auth2.isSignedIn.Ab) {
          auth2.disconnect().then(this.props.logout);
          return;
        }
        auth2.signOut().then(auth2.disconnect().then(this.props.logout));
      }
    }
    this.forceUpdate();
  };

  render() {
    return (
      <div className="block absolute bg-grey-lightest w-64 shadow-lg z-50 pin-r">
        <div className="block p-3">
          <div className="m-auto">
            <img
              className="text-grey align-middle block w-24 h-24 m-auto object-cover rounded-full bg-grey-light"
              src={this.props.user.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-2 text-center my-2">
            <div className="truncate font-medium leading-normal">
              {this.props.user.name}
            </div>
            <div className="truncate text-sm leading-normal">
              {this.props.user.email}
            </div>
          </div>
        </div>
        <div className="bg-grey h-px mx-1" />
        <button
          className="inline-block py-3 w-full m-auto text-black hover:bg-grey-light"
          onClick={this.signOut}
          title="Logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    );
  }
}

export default UserPanel;
