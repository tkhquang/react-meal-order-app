import React, { Component } from "react";
import axios from "axios";
import InpageLoading from "./InpageLoading";
import Overview from "./Overview";
import AddMenu from "./AddMenu";
import ErrorPage from "./ErrorPage";

const example = {
  menu: {
    id: 1,
    deadline: "2019-04-15T03:30:00.507Z",
    payment_reminder: "2019-04-15T07:30:00.507Z",
    status: 0
  },
  items: [
    {
      id: 1,
      item_name: "Món 1",
      users: [
        {
          id: 1,
          name: "User 1"
        },
        {
          id: 2,
          name: "User 2"
        }
      ]
    },
    {
      id: 2,
      item_name: "Món 2",
      users: [
        {
          id: 2,
          name: "User 2"
        },
        {
          id: 3,
          name: "User 3"
        },
        {
          id: 4,
          name: "User 4"
        },
        {
          id: 5,
          name: "User 5"
        },
        {
          id: 6,
          name: "User 6"
        },
        {
          id: 7,
          name: "User 7"
        },
        {
          id: 8,
          name: "User 8"
        },
        {
          id: 9,
          name: "User 9"
        }
      ]
    },
    {
      id: 3,
      item_name: "Món 3",
      users: []
    },
    {
      id: 4,
      item_name: "Món 4",
      users: [
        {
          id: 2,
          name: "User 3"
        },
        {
          id: 4,
          name: "User 4"
        },
        {
          id: 7,
          name: "User 5"
        }
      ]
    },
    {
      id: 5,
      item_name: "Món 5",
      users: []
    },
    {
      id: 6,
      item_name: "Món 6",
      users: [
        {
          id: 2,
          name: "User 3"
        },
        {
          id: 4,
          name: "User 4"
        },
        {
          id: 7,
          name: "User 5"
        }
      ]
    },
    {
      id: 7,
      item_name: "Món 7",
      users: [
        {
          id: 2,
          name: "User 3"
        },
        {
          id: 4,
          name: "User 4"
        },
        {
          id: 7,
          name: "User 5"
        }
      ]
    }
  ],
  people_in_charge: []
};

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
      },
      reFetchRes: null
    };
  }

  reFetchMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/menus`);
      const { data } = await response.data;
      this.setState({
        data: { ...data },
        reFetchRes: true
      });
    } catch (err) {
      this.setState({
        //reFetchRes: false,

        // Testing
        reFetchRes: true,
        data: {
          ...example,
          people_in_charge: [
            {
              user_id: 4,
              user_name: "User 4"
            },
            {
              user_id: 7,
              user_name: "User 5"
            }
          ]
        } // End
      });
    }
  };

  getMenu = () => {
    this.setState({
      loading: true
    });
    axios
      .get("http://localhost:8000/menus")
      .then(res => {
        this.setState({
          loading: false,
          data: res.data
        });
      })
      .catch(err => {
        // if (err.response) {
        //   this.setState({
        //     loading: false,
        //     error: {
        //       status: true,
        //       code: err.response.status,
        //       message: err.response.data.message
        //     }
        //   });
        //   return;
        // }
        // this.setState({
        //   loading: false,
        //   error: {
        //     status: true,
        //     message: "Network Error"
        //   }
        // });

        //Testing
        this.setState({
          loading: false,
          data: { ...example }
        });
      });
  };

  componentDidMount() {
    this.getMenu();
  }

  render() {
    return this.state.loading ? (
      <InpageLoading />
    ) : false ? ( // this.state.error.status
      <ErrorPage
        code={this.state.error.code}
        message={this.state.error.message}
      />
    ) : Object.keys(this.state.data).length > 0 ? (
      <Overview
        user={this.props.user}
        data={this.state.data}
        reFetchMenu={this.reFetchMenu}
        reFetchMsg={this.state.reFetchMsg}
      />
    ) : (
      <AddMenu user={this.props.user} getMenu={this.getMenu} />
    );
  }
}

export default MenuPage;
