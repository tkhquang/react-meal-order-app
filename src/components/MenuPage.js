import React, { Component } from "react";
import axios from "axios";
import Overview from "./Overview";
import AddMenu from "./AddMenu";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      error: false
    };
  }

  setMenu = data => {
    this.setState({
      data
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/menus")
      .then(response => {
        this.setState({
          loading: false,
          data: response.data
        });
      })
      .catch(err => {
        console.log("Error:", err);
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          "Loading"
        ) : false ? ( // !Object.keys(this.state.data).length === 0
          <Overview />
        ) : (
          <AddMenu user={this.props.user} setMenu={this.setMenu} />
        )}
      </>
    );
  }
}

export default MenuPage;
