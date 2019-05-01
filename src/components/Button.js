import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Button = props => {
  return (
    <button
      className="px-5 sm:px-6 md:px-8 py-3 text-white text-lg my-3 bg-blue-dark hover:bg-blue-light disabled:bg-grey disabled:cursor-not-allowed rounded shadow transition"
      type="submit"
      disabled={props.posting ? true : false}
    >
      {props.posting ? (
        <>
          <FontAwesomeIcon icon={faSpinner} spin /> {props.postingText}
        </>
      ) : (
        props.defaultText
      )}
    </button>
  );
};

export default Button;
