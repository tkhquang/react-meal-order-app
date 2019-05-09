import React, { Component } from "react";
import request from "../utils/request";
import TimeContainer from "./TimeContainer";
import LoadingProgress from "./LoadingProgress";

class OverviewRemind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleRemindChange = time => {
    if (
      new Date(this.props.menu.payment_reminder).getTime() ===
      new Date(time).getTime()
    ) {
      return;
    }
    this.setState({
      loading: true
    });
    request
      .post(
        `/menus/${this.props.menu.id}/time`,
        JSON.stringify({ payment_reminder: time })
      )
      .then(() => {
        this.props.showAlert(true, "Modified payment time successfully!");
      })
      .catch(() => {
        this.props.showAlert(false, "Failed to modify payment time!");
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    return (
      <div className="w-full md:w-1/2">
        <div className="flex-center">
          <TimeContainer
            id="remind-input"
            textLabel="Remind to pay:"
            default={new Date(this.props.menu.payment_reminder)}
            onChange={this.handleRemindChange}
            labelClassName="w-1/2 my-2"
            inputClassName="w-1/2 min-w-24 my-2 default-border"
          />
        </div>
        {this.state.loading && <LoadingProgress />}
      </div>
    );
  }
}

export default OverviewRemind;
