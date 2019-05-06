import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSync
} from "@fortawesome/free-solid-svg-icons";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  handleMouseEnter = () => {
    this.setState({
      isHovering: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      isHovering: false
    });
  };

  render() {
    return (
      <main className="flex-col-full text-red text-center h-screen">
        <h1 className="my-4">
          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
          {"An error occured, please try again!"}
        </h1>
        {this.props.code && (
          <p className="my-4"> Status code: {this.props.code} </p>
        )}
        {this.props.message && (
          <p className="my-4"> Message: {this.props.message} </p>
        )}
        <FontAwesomeIcon
          className="text-5xl my-4 cursor-pointer"
          icon={faSync}
          onClick={() => window.location.reload()}
          title="Reload!"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          spin={this.state.isHovering ? true : false}
        />
      </main>
    );
  }
}

export default ErrorPage;
