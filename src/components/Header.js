import React, { Component } from "react";
import Logo from "../images/logo.svg";
import UserPanel from "./UserPanel";

class Header extends Component {
  constructor(props) {
    super(props);
    this.panelRef = React.createRef();
    this.state = {
      displayPanel: false
    };
  }

  toggleDropdownMenu = () => {
    this.setState(prevState => {
      return {
        displayPanel: !prevState.displayPanel
      };
    });
  };

  handleClickOutside = event => {
    if (
      this.panelRef.current &&
      !this.panelRef.current.contains(event.target)
    ) {
      this.setState({
        displayPanel: false
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <header className="sticky pin-t pin-l pin-r flex px-5 justify-between items-center h-12 shadow-md z-40">
        <div className="inline-flex justify-center items-center">
          <img
            className="text-grey block w-10 h-10 m-auto object-cover rounded-full"
            src={Logo}
            alt=""
          />
          <h1 className="text-blue-dark mx-2 select-none">Datcom</h1>
        </div>
        <div className="relative inline-block h-full" ref={this.panelRef}>
          <button className="px-5 h-full" onClick={this.toggleDropdownMenu}>
            <img
              src={this.props.user.imageUrl}
              className="block object-cover w-10 h-10 m-auto rounded-full border-2 border-grey-dark bg-grey-light"
              alt=""
            />
          </button>
          {this.state.displayPanel && (
            <UserPanel
              logout={this.props.logout}
              user={this.props.user}
              clientId={this.props.clientId}
            />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
