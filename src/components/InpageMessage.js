import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

const InpageMessage = props => {
  return (
    <div className={props.classes}>
      {props.message.type === "error" ? (
        <span className="text-red font-bold">
          <FontAwesomeIcon icon={faExclamationCircle} /> {props.message.body}
        </span>
      ) : props.message.type === "success" ? (
        <span className="text-green font-bold">
          <FontAwesomeIcon icon={faCheckCircle} /> {props.message.body}
        </span>
      ) : (
        <span className="text-black font-bold">{props.message.body}</span>
      )}
    </div>
  );
};

export default InpageMessage;
