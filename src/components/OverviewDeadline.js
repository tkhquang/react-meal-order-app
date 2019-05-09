import React, { Component } from "react";
import request from "../utils/request";
import TimeContainer from "./TimeContainer";
import LoadingProgress from "./LoadingProgress";

class OverviewDeadline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleDeadlineChange = time => {
    if (
      new Date(this.props.menu.deadline).getTime() === new Date(time).getTime()
    ) {
      return;
    }
    this.setState({
      loading: true
    });
    request
      .post(
        `/menus/${this.props.menu.id}/time`,
        JSON.stringify({ deadline: time })
      )
      .then(() => {
        this.props.showAlert(true, "Modified deadline successfully!");
      })
      .catch(() => {
        this.props.showAlert(false, "Failed to modify deadline!");
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
            id="deadline-input"
            textLabel="Deadline:"
            default={new Date(this.props.menu.deadline)}
            onChange={this.handleDeadlineChange}
            labelClassName="w-1/2 my-2"
            inputClassName="w-1/2 min-w-24 my-2 default-border"
          />
        </div>
        {this.state.loading && <LoadingProgress />}
      </div>
    );
  }
}

export default OverviewDeadline;
