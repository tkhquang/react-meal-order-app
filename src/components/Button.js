import React from "react";

const Button = props => {
  return (
    <button
      className={props.classes}
      type={props.type}
      disabled={props.disabled}
      {...props.onClick && { onClick: props.onClick }}
    >
      {props.disabled ? props.disabledText : props.defaultText}
    </button>
  );
};

export default Button;
