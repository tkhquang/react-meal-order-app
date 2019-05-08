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

  reFetchMenu = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API}/menus`,
        headers: {
          access_token: this.props.user.access_token
        }
      });
      this.setState({
        data: { ...res.data }
      });
      return false;
    } catch (err) {
      return err;
    }
  };

  getMenu = () => {
    this.setState({
      loading: true
    });
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API}/menus`,
      headers: {
        access_token: this.props.user.access_token
      }
    })
      .then(res => {
        this.setState({
          loading: false,
          data: { ...res.data }
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            loading: false,
            error: {
              status: true,
              code: err.response.status,
              message: err.response.data.error
                ? err.response.data.error.message
                : err.response.data
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
    return this.state.loading ? (
      <InpageLoading />
    ) : this.state.error.status ? (
      <ErrorPage
        code={this.state.error.code}
        message={this.state.error.message}
      />
    ) : Object.keys(this.state.data).length > 0 ? (
      <Overview
        user={this.props.user}
        data={this.state.data}
        reFetchMenu={this.reFetchMenu}
      />
    ) : (
      <AddMenu user={this.props.user} getMenu={this.getMenu} />
    );
  }
}

export default MenuPage;
