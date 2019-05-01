import React, { Component } from "react";
import axios from "axios";
import { getStringDate, getFormattedDate } from "../helpers";
import InputLabel from "@material-ui/core/InputLabel";
import TimeInput from "material-ui-time-picker";
import { withStyles } from "@material-ui/core/styles";
import Button from "./Button";

const styles = {
  timeIcon: {
    "&::before": {
      content: `"\\1F55D"`,
      position: "absolute",
      left: "1rem"
    }
  },
  labelText: {
    color: "#000",
    textAlign: "center"
  },
  inputTime: {
    textAlign: "center"
  },
  requireInput: {
    "&::before": {
      content: `"*"`,
      fontWeight: "bold",
      color: "#F00"
    }
  }
};

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
        // Testing
        setTimeout(() => {
          this.setState({
            posting: false
          });
        }, 3000);
      });
  };

  render() {
    const { classes } = this.props;
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
            <label
              className={`w-full h-6 ${classes.requireInput}`}
              htmlFor="menu"
            >
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
            <InputLabel
              className="w-1/2 my-2 md:w-auto md:flex-1"
              htmlFor="deadline-input"
              classes={{ root: classes.labelText }}
            >
              Deadline:
            </InputLabel>
            <TimeInput
              id="deadline-input"
              className={`w-1/2 min-w-24 my-2 md:w-auto md:flex-1 border-2 border-blue-light ${
                classes.timeIcon
              }`}
              mode="24h"
              value={this.state.deadline}
              onChange={this.handleDeadlineChange}
              disableUnderline={true}
              inputProps={{ className: classes.inputTime }}
            />
            <InputLabel
              className="w-1/2 my-2 md:w-auto md:flex-1"
              htmlFor="remind-input"
              classes={{ root: classes.labelText }}
            >
              Remind to pay:
            </InputLabel>
            <TimeInput
              id="remind-input"
              className={`w-1/2 min-w-24 my-2 md:w-auto md:flex-1 border-2 border-blue-light ${
                classes.timeIcon
              }`}
              mode="24h"
              value={this.state.remind}
              onChange={this.handleRemindChange}
              disableUnderline={true}
              inputProps={{ className: classes.inputTime }}
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
      </main>
    );
  }
}

export default withStyles(styles)(AddMenu);
