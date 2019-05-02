import React, { Component } from "react";
import axios from "axios";
import { getStringDate, getFormattedDate } from "../helpers";
import Button from "./Button";
import TimeContainer from "./TimeContainer";
import InpageError from "./InpageError";

class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      posting: false,
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
        owner_id: 1, // this.props.user.id
        name: `lunch_${getStringDate(new Date(), "_")}`,
        deadline: this.state.deadline,
        payment_reminder: this.state.remind
      },
      item_names: [...itemList]
    };
    console.log(requestBody);

    this.setState({
      posting: true,
      error: {
        status: false
      }
    });
    axios({
      method: "post",
      url: "http://localhost:8000/menus",
      data: JSON.stringify(requestBody)
    })
      .then(res => {
        if (res.status !== 201) {
          this.setState({
            posting: false,
            error: {
              status: true,
              message: "Invalid Response from Server"
            }
          });
          return;
        }
        this.setState({
          posting: false
        });
        this.props.getMenu();
      })
      .catch(err => {
        // if (err.response) {
        //   this.setState({
        //     posting: false,
        //     error: {
        //       status: true,
        //       code: err.response.status,
        //       message: err.response.data.message
        //     }
        //   });
        //   return;
        // }
        // this.setState({
        //   posting: false,
        //   error: {
        //     status: true,
        //     message: "Network Error"
        //   }
        // });

        // Testing
        setTimeout(() => {
          this.setState({
            posting: false,
            error: {
              status: true,
              message: "Network Error"
            }
          });
        }, 2000);
      });
  };

  render() {
    return (
      <main className="flex flex-col items-center">
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
              className="w-full block shadow-none text-grey-darker border-2 border-blue-light rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white focus:bg-grey-lighter"
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
              labelClassName="w-1/2 my-2 md:w-auto md:flex-1"
              inputClassName="w-1/2 min-w-24 my-2 md:w-auto md:flex-1 border-2 border-blue-light"
            />
            <TimeContainer
              id="remind-input"
              textLabel="Remind to pay:"
              value={this.state.remind}
              onChange={this.handleRemindChange}
              labelClassName="w-1/2 my-2 md:w-auto md:flex-1"
              inputClassName="w-1/2 min-w-24 my-2 md:w-auto md:flex-1 border-2 border-blue-light"
            />
          </div>
          <div className="flex w-full items-center justify-end">
            <Button
              posting={this.state.posting}
              defaultText="Publish Menu"
              postingText="Publishing Menu"
            />
          </div>
        </form>
        {this.state.error.status && (
          <InpageError
            text="sending data"
            code={this.state.error.code}
            message={this.state.error.message}
          />
        )}
      </main>
    );
  }
}

export default AddMenu;
