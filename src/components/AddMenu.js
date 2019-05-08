import React, { Component } from "react";
import request from "../utils/request";
import { getStringDate, getFormattedDate } from "../helpers";
import Button from "./Button";
import TimeContainer from "./TimeContainer";
import InpageError from "./InpageError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      loading: false,
      deadline: getFormattedDate(new Date(), 10, 30, 0),
      remind: getFormattedDate(new Date(), 14, 30, 0),
      error: {
        status: false,
        code: null,
        message: ""
      }
    };
  }

  handleDeadlineChange = time => {
    this.setState({
      deadline: time
    });
  };

  handleRemindChange = time => {
    this.setState({
      remind: time
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemList = this.listRef.current.value
      .split(/[\r\n]+/)
      .map(item => item.trim())
      .filter(i => Boolean(i));
    const requestBody = {
      menu: {
        owner_id: this.props.userID,
        name: `lunch_${getStringDate(new Date(), "_")}`,
        deadline: this.state.deadline,
        payment_reminder: this.state.remind
      },
      item_names: [...itemList]
    };
    this.setState({
      loading: true,
      error: {
        status: false
      }
    });
    request
      .post("/menus", JSON.stringify(requestBody))
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.getMenu();
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

  render() {
    return (
      <main className="flex-col-full">
        <form
          className="flex flex-wrap w-4/5 md:w-3/4"
          action=""
          onSubmit={this.handleSubmit}
        >
          <h1 className="my-6 self-start text-blue-darker">
            {getStringDate(new Date(), "/")}
          </h1>
          <div className="flex w-full items-center flex-wrap">
            <label className="w-full h-6" htmlFor="menu">
              Add menu:
            </label>
            <textarea
              ref={this.listRef}
              className="default-input w-full py-3 px-4 mb-3"
              name="list"
              cols="80"
              rows="12"
              placeholder="Add item list..."
              required
            />
          </div>
          <div className="flex flex-wrap md:flex-no-wrap w-full items-center md:h-12">
            <TimeContainer
              id="deadline-input"
              textLabel="Deadline:"
              value={this.state.deadline}
              onChange={this.handleDeadlineChange}
              labelClassName="w-1/2 my-2 md:w-auto md:flex-1 text-center"
              inputClassName="w-1/2 min-w-24 my-2 md:w-auto md:flex-1 default-border"
            />
            <TimeContainer
              id="remind-input"
              textLabel="Remind to pay:"
              value={this.state.remind}
              onChange={this.handleRemindChange}
              labelClassName="w-1/2 my-2 md:w-auto md:flex-1 text-center"
              inputClassName="w-1/2 min-w-24 my-2 md:w-auto md:flex-1 default-border"
            />
          </div>
          <div className="flex w-full items-center justify-end">
            <Button
              classes="btn sm:px-6 md:px-8"
              disabled={this.state.loading}
              type="submit"
              defaultText="Publish Menu"
              disabledText={
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Publishing Menu
                </span>
              }
            />
          </div>
        </form>
        {this.state.error.status && (
          <InpageError
            code={this.state.error.code}
            message={this.state.error.message}
          />
        )}
      </main>
    );
  }
}

export default AddMenu;
