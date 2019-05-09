import React, { Component } from "react";
import request from "../utils/request";
import InpageLoading from "./InpageLoading";
import LoadingProgress from "./LoadingProgress";
import Overview from "./Overview";
import AddMenu from "./AddMenu";
import ErrorPage from "./ErrorPage";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refetching: false,
      data: null,
      error: {
        status: false,
        code: null,
        message: ""
      }
    };
  }

  reFetchMenu = async () => {
    this.setState({
      refetching: true
    });
    try {
      const res = await request.get("/menus");
      this.setState({
        data: { ...res.data }
      });
      return false;
    } catch (err) {
      return err;
    } finally {
      this.setState({
        refetching: false
      });
    }
  };

  getMenu = () => {
    this.setState({
      loading: true
    });
    request
      .get("/menus")
      .then(res => {
        this.setState({
          data: { ...res.data }
        });
      })
      .catch(err => {
        if (err.response) {
          this.setState({
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
          error: {
            status: true,
            message: "Network Error"
          }
        });
      })
      .finally(() => {
        this.setState({
          loading: false
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
        ) : this.state.error.status ? (
          <ErrorPage
            code={this.state.error.code}
            message={this.state.error.message}
          />
        ) : Object.keys(this.state.data).length > 0 ? (
          <Overview data={this.state.data} reFetchMenu={this.reFetchMenu} />
        ) : (
          <AddMenu userID={this.props.userID} getMenu={this.getMenu} />
        )}
        {this.state.refetching && <LoadingProgress />}
      </>
    );
  }
}

export default MenuPage;
