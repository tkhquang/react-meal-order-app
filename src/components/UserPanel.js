import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleLogOutClick = () => {
    this.setState({
      loading: true
    });
    this.props.signOut();
  };

  render() {
    return (
      <div className="block absolute bg-grey-lightest w-64 shadow-lg z-50 pin-r">
        <div className="block p-3">
          <div className="m-auto">
            <img
              className="text-grey align-middle img-fit w-24 h-24 bg-grey-light"
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
          className="inline-block py-3 w-full m-auto text-black hover:bg-grey-light disabled:bg-grey disabled:cursor-not-allowed"
          onClick={this.handleLogOutClick}
          title="Logout"
        >
          {this.state.loading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </>
          )}
        </button>
      </div>
    );
  }
}

export default UserPanel;
