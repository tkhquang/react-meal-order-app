import React, { useState, useEffect, useRef } from "react";
import Logo from "../images/logo.png";
import UserPanel from "./UserPanel";

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
      <div
        className="inline-flex justify-center items-center cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <img className="text-grey img-fit w-10 h-10" src={Logo} alt="" />
        <h1 className="text-blue-dark mx-2 select-none">Datcom</h1>
      </div>
      <div className="relative inline-block h-full" ref={ref}>
        <button type="button" className="px-5 h-full" onClick={toggle}>
          <img
            src={props.user.imageUrl}
            className="img-fit bg-grey-light w-10 h-10 default-border"
            alt=""
          />
        </button>
        {on && <UserPanel user={props.user} signOut={props.signOut} />}
      </div>
    </header>
  );
};

export default Header;
