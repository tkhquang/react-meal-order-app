import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import TimeInput from "material-ui-time-picker";
import { withStyles } from "@material-ui/core/styles";

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
  }
};

const TimeContainer = props => {
  const { classes } = props;
  return (
    <>
      <InputLabel
        className={`${props.labelClassName}`}
        htmlFor={props.id}
        classes={{ root: classes.labelText }}
      >
        {props.textLabel}
      </InputLabel>
      <TimeInput
        id={props.id}
        className={`${props.inputClassName} ${classes.timeIcon}`}
        mode="24h"
        value={props.value}
        onChange={props.onChange}
        disableUnderline={true}
        inputProps={{ className: classes.inputTime }}
      />
    </>
  );
};

export default withStyles(styles)(TimeContainer);
