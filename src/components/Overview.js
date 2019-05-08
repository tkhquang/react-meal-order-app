import React, { Component } from "react";
import axios from "axios";
import { getStringDate } from "../helpers";
import OverviewTable from "./OverviewTable";
import OverviewQuantity from "./OverviewQuantity";
import InpageMessage from "./InpageMessage";
import TimeContainer from "./TimeContainer";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.addItemRef = React.createRef();
    this.state = {
      loading: false,
      message: {
        ele: "",
        body: "",
        type: ""
      },
      copied: false
    };
  }

  handleSummary = e => {
    e.preventDefault();
    this.setState({
      loading: true,
      message: {
        ele: "summary",
        body: "Summarizing...",
        type: "loading"
      }
    });
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API}/menus/${
        this.props.data.menu.id
      }/people-in-charge`,
      headers: {
        access_token: this.props.user.access_token
      }
    })
      .then(() => {
        this.props.reFetchMenu().then(err => {
          if (err) {
            this.setState({
              loading: false,
              message: {
                ele: "summary",
                body: "Error, please try again!",
                type: "error"
              }
            });
            return;
          }
          this.setState({
            loading: false,
            message: {
              ele: "",
              body: "",
              type: ""
            }
          });
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          message: {
            ele: "summary",
            body: "Failed to get PIC!",
            type: "error"
          }
        });
      });
  };

  handleAddItem = e => {
    e.preventDefault();
    const itemName = this.addItemRef.current.value.trim();
    if (!itemName) {
      this.setState({
        message: {
          ele: "topMsg",
          body: "This field cannot be empty!",
          type: "error"
        }
      });
      return;
    }
    this.setState({
      loading: true,
      message: {
        ele: "topMsg",
        body: "Adding Item...",
        type: "loading"
      }
    });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}/menus/${
        this.props.data.menu.id
      }/items`,
      headers: {
        access_token: this.props.user.access_token
      },
      data: JSON.stringify({ item_name: itemName })
    })
      .then(() => {
        this.setState({
          loading: false,
          message: {
            ele: "topMsg",
            body: "Added item successfully!",
            type: "success"
          }
        });
        this.props.reFetchMenu();
      })
      .catch(() => {
        this.setState({
          loading: false,
          message: {
            ele: "topMsg",
            body: "Failed to add item!",
            type: "error"
          }
        });
      });
  };

  handleDelete = id => {
    this.setState({
      loading: true,
      message: {
        ele: "topMsg",
        body: "Deleting Item...",
        type: "loading"
      }
    });

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API}/items/${id}`,
      headers: {
        access_token: this.props.user.access_token
      }
    })
      .then(() => {
        this.setState({
          loading: false,
          message: {
            ele: "topMsg",
            body: "Item deleted successfully!",
            type: "success"
          }
        });
        this.props.reFetchMenu();
      })
      .catch(() => {
        this.setState({
          loading: false,
          message: {
            ele: "topMsg",
            body: "Failed to delete item!",
            type: "error"
          }
        });
      });
  };

  modifyMenuTime = (ele, time) => {
    const timeName = ele === "deadline" ? "deadline" : "remind to pay time";
    this.setState({
      loading: true,
      message: {
        ele: ele,
        body: "Sending request...",
        type: "loading"
      }
    });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}/menus/${this.props.data.menu.id}/time`,
      headers: {
        access_token: this.props.user.access_token
      },
      data: JSON.stringify({ [ele]: time })
    })
      .then(() => {
        this.setState({
          loading: false,
          message: {
            ele: ele,
            body: `Modify ${timeName} successfully!`,
            type: "success"
          }
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          message: {
            ele: ele,
            body: `Modify ${timeName} failed!`,
            type: "error"
          }
        });
      });
  };

  handleDeadlineChange = time => {
    if (
      new Date(this.props.data.menu.deadline).getTime() ===
      new Date(time).getTime()
    ) {
      return;
    }
    this.modifyMenuTime("deadline", time);
  };

  handleRemindChange = time => {
    if (
      new Date(this.props.data.menu.payment_reminder).getTime() ===
      new Date(time).getTime()
    ) {
      return;
    }
    this.modifyMenuTime("payment_reminder", time);
  };

  handleCopy = () => {
    this.setState({
      copied: true
    });
    setTimeout(() => {
      this.setState({
        copied: false
      });
    }, 1000);
  };

  render() {
    const { data } = this.props;
    return (
      <main className="flex-col-full">
        <div className="w-4/5">
          <h1 className="text-blue-darker my-4">
            {getStringDate(new Date(), "/")}
          </h1>
        </div>
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
          <button
            className="btn-small ml-2 sm:px-6 md:px-8"
            type="submit"
            disabled={this.state.loading}
          >
            Submit
          </button>
          {this.state.message.ele === "topMsg" && (
            <InpageMessage
              classes="flex-grow flex-no-shrink text-center w-full md:w-auto"
              message={this.state.message}
            />
          )}
        </form>
        <div className="flex-center w-4/5">
          <OverviewTable
            data={data}
            handleDelete={this.handleDelete}
            disabled={this.state.loading}
          />
        </div>
        <div className="flex flex-wrap w-4/5 items-center">
          <div className="w-full md:w-1/2 my-2 text-center">
            {this.state.message.ele === "deadline" && (
              <InpageMessage classes="" message={this.state.message} />
            )}
          </div>
          <TimeContainer
            id="deadline-input"
            textLabel="Deadline:"
            default={new Date(data.menu.deadline)}
            onChange={this.handleDeadlineChange}
            labelClassName="w-1/2 md:w-1/4 my-2"
            inputClassName="w-1/2 md:w-1/4 min-w-24 my-2 default-border"
          />
          <div className="w-full md:w-1/2 my-2 text-center">
            {this.state.message.ele === "payment_reminder" && (
              <InpageMessage classes="" message={this.state.message} />
            )}
          </div>
          <TimeContainer
            id="remind-input"
            textLabel="Remind to pay:"
            default={new Date(data.menu.payment_reminder)}
            onChange={this.handleRemindChange}
            labelClassName="w-1/2 md:w-1/4 my-2"
            inputClassName="w-1/2 md:w-1/4 min-w-24 my-2 default-border"
          />
        </div>
        <div className="flex w-4/5 items-center justify-end">
          {this.state.message.ele === "summary" && (
            <InpageMessage
              classes="w-auto my-2 mx-auto"
              message={this.state.message}
            />
          )}
          <button
            className="btn-small h-10 sm:px-6 md:px-8"
            type="button"
            disabled={this.state.loading}
            onClick={this.handleSummary}
          >
            Summary
          </button>
        </div>
        {data.people_in_charge && (
          <div className="w-4/5 my-2">
            <OverviewQuantity items={data.items} />
            <div className="text-right">
              <CopyToClipboard
                text={data.items
                  .filter(item => item.users)
                  .map(item => `${item.item_name}: ${item.users.length}\n`)
                  .join("")}
                onCopy={this.handleCopy}
              >
                <button
                  type="button"
                  className="btn-copy default-border px-5 h-10 my-4 md:px-8"
                >
                  {this.state.copied ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
            <div className="text-right pb-4">
              <p className="">
                People in charge:{" "}
                {data.people_in_charge.map(user => user.user_name).join(", ")}
              </p>
            </div>
          </div>
        )}
      </main>
    );
  }
}

export default Overview;
