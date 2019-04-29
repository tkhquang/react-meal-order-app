import React, { useState, useEffect, useRef } from "react";
import Logo from "../images/logo.svg";
import UserPanel from "./UserPanel";
import { GoogleLogout } from "react-google-login";

const Header = props => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  const ref = useRef();
  const handleClick = e => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setOn(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });
  return (
    <header className="sticky pin-t pin-l pin-r flex px-5 justify-between items-center h-12 shadow-md z-40">
      {/* Hidden Logout Button, workaround for logout button not workinhg properly, plugin's issue */}
      <GoogleLogout
        clientId={props.clientId}
        render={renderProps => (
          <button
            className="hidden"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </button>
        )}
        onLogoutSuccess={props.logout}
      />
      <div className="inline-flex justify-center items-center">
        <img
          className="text-grey block w-10 h-10 m-auto object-cover rounded-full"
          src={Logo}
          alt=""
        />
        <h1 className="text-blue-dark mx-2 select-none">Datcom</h1>
      </div>
      <div className="relative inline-block h-full" ref={ref}>
        <button className="px-5 h-full" onClick={toggle}>
          <img
            src={props.user.imageUrl}
            className="block object-cover w-10 h-10 m-auto rounded-full border-2 border-grey-dark bg-grey-light"
            alt=""
          />
        </button>
        {on && <UserPanel logout={props.logout} user={props.user} />}
      </div>
    </header>
  );
};

export default Header;
