import React, { Component } from "react";
import "./AddMenu.css";
import axios from "axios";
import { getStringDate, getFormattedDate } from "../helpers";
import InputLabel from "@material-ui/core/InputLabel";
import TimeInput from "material-ui-time-picker";

class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      posting: false,
      deadline: getFormattedDate(new Date(), 10, 30, 0),
      remind: getFormattedDate(new Date(), 14, 30, 0)
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
      .filter(i => Boolean(i.trim()));
    const requestBody = {
      menu: {
        owner_id: 1, // this.props.user.id
        name: `lunch_${getStringDate(new Date(), "_")}`,
        deadline: this.state.deadline,
        payment_reminder: this.state.remind
      },
      item_names: [...itemList]
    };
    this.setState({
      posting: true
    });
    axios({
      method: "post",
      url: "http://localhost:8000/menus",
      data: requestBody
    })
      .then(res => {
        if (res.status !== 201) {
          // Custom Error
          this.setState({
            posting: false
          });
          return;
        }
        axios
          .get("http://localhost:8000/menus")
          .then(res => {
            if (res.status !== 200) {
              // Custom Error
              this.setState({
                posting: false
              });
              return;
            }
            this.props.setMenu(res.data);
            this.setState({
              posting: false
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({
              posting: false
            });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          posting: false
        });
      });
  };

  render() {
    return (
      <div className="AddMenu">
        <h1>{getStringDate(new Date(), "/")}</h1>
        <form className="menu-form" action="" onSubmit={this.handleSubmit}>
          <label className="menu-label" htmlFor="menu">
            Add menu:
          </label>
          <textarea
            ref={this.listRef}
            className="menu-input"
            name="list"
            cols="80"
            rows="10"
            placeholder="Add item list..."
            required
          />
          <InputLabel className="deadline-label" htmlFor="deadline-input">
            Deadline:
          </InputLabel>
          <TimeInput
            id="deadline-input"
            className="deadline-input"
            mode="24h"
            value={this.state.deadline}
            onChange={this.handleDeadlineChange}
            disableUnderline={true}
          />

          <InputLabel className="remind-label" htmlFor="remind-input">
            Remind to pay:
          </InputLabel>
          <TimeInput
            id="remind-input"
            className="remind-input"
            mode="24h"
            value={this.state.remind}
            onChange={this.handleRemindChange}
            disableUnderline={true}
          />
          <input
            className="menu-submit"
            type="submit"
            value="Publish Menu"
            disabled={this.state.posting ? true : false}
          />
        </form>
      </div>
    );
  }
}

export default AddMenu;
