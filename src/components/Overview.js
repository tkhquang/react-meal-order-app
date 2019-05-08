import React, { Component } from "react";
import request from "../utils/request";
import { getStringDate } from "../helpers";
import Button from "./Button";
import AddItem from "./AddItem";
import OverviewTable from "./OverviewTable";
import OverviewDeadline from "./OverviewDeadline";
import OverviewRemind from "./OverviewRemind";
import OverviewQuantity from "./OverviewQuantity";
import LoadingProgress from "./LoadingProgress";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withAlert } from "react-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      copied: false
    };
  }

  handleSummary = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    request
      .get(`/menus/${this.props.data.menu.id}/people-in-charge`)
      .then(() => {
        this.props.reFetchMenu().then(err => {
          if (err) {
            this.setState({
              loading: false
            });
            this.showAlert(false, "Failed to refetch menu!");
            return;
          }
          this.setState({
            loading: false
          });
          this.showAlert(true, "Summarized menu successfully!");
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
        this.showAlert(false, "Failed to get PIC!");
      });
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

  showAlert = (success, message) => {
    if (success) {
      this.props.alert.success(message);
      return;
    }
    this.props.alert.error(message);
  };

  render() {
    const { data, reFetchMenu } = this.props;
    return (
      <main className="flex-col-full">
        <div className="w-4/5">
          <h1 className="text-blue-darker my-4">
            {getStringDate(new Date(), "/")}
          </h1>
        </div>
        <AddItem
          menuID={data.menu.id}
          reFetchMenu={reFetchMenu}
          showAlert={this.showAlert}
        />
        <div className="flex-center w-4/5">
          <OverviewTable
            data={data}
            reFetchMenu={reFetchMenu}
            showAlert={this.showAlert}
          />
        </div>
        <div className="flex flex-col flex-wrap w-4/5 items-end">
          <OverviewDeadline
            menu={data.menu}
            reFetchMenu={reFetchMenu}
            showAlert={this.showAlert}
          />
          <OverviewRemind
            menu={data.menu}
            reFetchMenu={reFetchMenu}
            showAlert={this.showAlert}
          />
        </div>
        <div className="flex w-4/5 items-center justify-end">
          <Button
            classes="btn-small h-10 sm:px-6 md:px-8"
            disabled={this.state.loading}
            type="button"
            defaultText="Summary"
            disabledText={
              <span>
                <FontAwesomeIcon icon={faSpinner} spin /> Summarizing...
              </span>
            }
            onClick={this.handleSummary}
          />
        </div>
        {data.people_in_charge && data.items && (
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
                {data.people_in_charge.length > 1
                  ? "People in charge: "
                  : "Person in charge: "}
                {data.people_in_charge.map(user => user.user_name).join(", ")}
              </p>
            </div>
          </div>
        )}
        {this.state.loading && <LoadingProgress />}
      </main>
    );
  }
}

export default withAlert()(Overview);
