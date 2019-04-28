import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogout } from "react-google-login";

const UserPanel = props => {
  return (
    <div className="block absolute bg-grey-lightest w-64 shadow-lg z-50 pin-r">
      <div className="block p-3">
        <div className="m-auto">
          <img
            className="text-grey block w-24 h-24 m-auto object-cover rounded-full bg-grey-light"
            src={props.user.imageUrl}
            alt="User Avatar"
          />
        </div>
        <div className="ml-2 text-center my-2">
          <div className="truncate font-medium leading-normal">
            {props.user.name}
          </div>
          <div className="truncate text-sm leading-normal">
            {props.user.email}
          </div>
        </div>
      </div>
      <div className="bg-grey h-px mx-1" />
      <GoogleLogout
        clientId={props.clientId}
        render={renderProps => (
          <button
            className="inline-block py-3 w-full m-auto text-black hover:bg-grey-light"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            title="Logout"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        )}
        onLogoutSuccess={props.logout}
      />
    </div>
  );
};

export default UserPanel;
