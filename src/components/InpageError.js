import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const InpageError = props => {
  return (
    <div className="flex-col-full text-red text-center">
      <p className="text-xl my-2">
        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
        {`An error occured, please try again!`}
      </p>
      {props.code && <p className="my-2"> Status code: {props.code} </p>}
      {props.message && <p className="my-2"> Message: {props.message} </p>}
    </div>
  );
};

export default InpageError;
