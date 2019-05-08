import React, { Component } from "react";
import request from "../utils/request";
import Button from "./Button";
import LoadingProgress from "./LoadingProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.addItemRef = React.createRef();
    this.state = {
      loading: false
    };
  }

  handleAddItem = e => {
    e.preventDefault();
    const itemName = this.addItemRef.current.value.trim();
    if (!itemName) {
      this.props.showAlert(false, "This field cannot be empty!");
      return;
    }
    this.setState({
      loading: true
    });
    request
      .post(
        `/menus/${this.props.menuID}/items`,
        JSON.stringify({ item_name: itemName })
      )
      .then(() => {
        this.addItemRef.current.value = "";
        this.setState({
          loading: false
        });
        this.props.showAlert(true, "Item added successfully!");
        this.props.reFetchMenu();
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        this.props.showAlert(false, "Failed to add item!");
      });
  };

  render() {
    return (
      <form
        className="w-4/5 my-2 flex items-center flex-wrap md:flex-no-wrap"
        action=""
        onSubmit={this.handleAddItem}
      >
        <label htmlFor="add-item" className="mr-2 w-full md:w-auto">
          Add Item:{" "}
        </label>
        <input
          id="add-item"
          className="h-10 mr-2 md:mx-2 w-1/2 md:w-1/3 px-2 appearance-none default-input"
          type="text"
          placeholder="Add one item..."
          ref={this.addItemRef}
          required
        />
        <Button
          classes="btn-small ml-2 sm:px-6 md:px-8"
          disabled={this.state.loading}
          type="submit"
          defaultText="Submit"
          disabledText={
            <span>
              <FontAwesomeIcon icon={faSpinner} spin /> Submitting...
            </span>
          }
        />
        {this.state.loading && <LoadingProgress />}
      </form>
    );
  }
}

export default AddItem;
