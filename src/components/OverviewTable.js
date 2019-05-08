import React, { Component, Fragment } from "react";
import request from "../utils/request";
import LoadingProgress from "./LoadingProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class OverviewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleDelete = id => {
    this.setState({
      loading: true
    });
    request
      .delete(`/items/${id}`)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.showAlert(true, "Item deleted successfully!");
        this.props.reFetchMenu();
      })
      .catch(() => {
        this.setState({
          loading: false
        });
        this.props.showAlert(true, "Failed to delete item!");
      });
  };

  render() {
    const list = this.props.data.items ? this.props.data.items : [];
    return (
      <>
        <table className="w-full text-center table-auto">
          <thead>
            <tr>
              <th className="p-2 md:px-10 text-left truncate">Menu Item</th>
              <th className="p-2 md:px-10 text-left truncate">Member</th>
              <th className="py-2 truncate">Quantity</th>
              <th className="py-2">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <Fragment key={item.id}>
                <tr className="border-2 border-blue-light">
                  <td className="text-left md:px-10 p-2 w-1/4">
                    {item.item_name}
                  </td>
                  <td className="text-left md:px-10 p-2 w-1/3">
                    {item.users &&
                      item.users.map(user => user.user_name).join(", ")}
                  </td>
                  <td className="py-2">{item.users ? item.users.length : 0}</td>
                  <td className="p-2">
                    <button
                      type="button"
                      title="Delete Item"
                      className="text-black disabled:text-grey hover:text-grey-dark transition"
                      onClick={() => this.handleDelete(item.id)}
                      disabled={this.state.loading}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2" colSpan={4} />
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        {this.state.loading && <LoadingProgress />}
      </>
    );
  }
}

export default OverviewTable;
