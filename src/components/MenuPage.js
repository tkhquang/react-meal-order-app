import React, { Component } from "react";
import axios from "axios";
import InpageLoading from "./InpageLoading";
import Overview from "./Overview";
import AddMenu from "./AddMenu";
import ErrorPage from "./ErrorPage";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      error: {
        status: false,
        code: null,
        message: ""
      }
    };
  }

  getMenu = () => {
    this.setState({
      loading: true
    });
    axios
      .get("http://localhost:8000/menus")
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            loading: false,
            error: {
              status: true,
              message: "Invalid Response from Server"
            }
          });
          return;
        }
        this.setState({
          loading: false,
          data: res.data
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            loading: false,
            error: {
              status: true,
              code: err.response.status,
              message: err.response.data.message
            }
          });
          return;
        }
        this.setState({
          loading: false,
          error: {
            status: true,
            message: "Network Error"
          }
        });
      });
  };

  componentDidMount() {
    this.getMenu();
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <InpageLoading />
        ) : false ? ( // this.state.error.status
          <ErrorPage
            text="fetching data"
            code={this.state.error.code}
            message={this.state.error.message}
          />
        ) : false ? ( // !Object.keys(this.state.data).length === 0
          <Overview />
        ) : (
          <AddMenu user={this.props.user} getMenu={this.getMenu} />
        )}
      </>
    );
  }
}

export default MenuPage;
